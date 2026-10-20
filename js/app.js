import { QUESTIONS, TYPE_INFO } from './data/course-data.js';
import { buildAllPoints, initMap, filterMap, focusPlace } from './map.js';
import { syncUserSession } from './webhook.js';

let currentIdx = 0;
let answers = [];
let sessionId = "";

export function startGame() {
  document.getElementById('intro-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.remove('hidden');
  document.getElementById('result-screen').classList.add('hidden');
  currentIdx = 0;
  answers = [];
  sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
  renderQuestion();
}

export function prevQuestion() {
  if (currentIdx > 0) {
    currentIdx--;
    answers.pop();
    renderQuestion();
  }
}

export function renderQuestion() {
  const q = QUESTIONS[currentIdx];
  const total = QUESTIONS.length;
  const percent = Math.round(((currentIdx + 1) / total) * 100);

  document.getElementById('q-step').innerText = q.step;
  document.getElementById('q-percent').innerText = `${percent}%`;
  document.getElementById('progress-bar').style.width = `${percent}%`;
  document.getElementById('q-title').innerText = q.title;
  document.getElementById('q-subtitle').innerText = q.subtitle;


  const prevBtn = document.getElementById('btn-prev-question');
  if (prevBtn) {
    if (currentIdx > 0) {
      prevBtn.classList.remove('invisible');
    } else {
      prevBtn.classList.add('invisible');
    }
  }

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  q.options.forEach((opt) => {
    const card = document.createElement('div');
    card.className = "option-card w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:bg-orange-50/40 transition bg-white shadow-sm cursor-pointer";
    card.onclick = () => selectOption(opt);
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="text-2xl mt-0.5">${opt.emoji}</div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span class="font-bold text-gray-800 text-sm">${opt.label}</span>
          </div>
          ${opt.weather ? `
            <div class="inline-block px-2 py-0.5 mb-2 text-[11px] font-semibold bg-orange-50/80 text-orange-700 rounded-md border border-orange-200/60">
              ${opt.weather}
            </div>
          ` : ''}
          <div class="text-xs text-gray-500 leading-relaxed mb-2.5">${opt.desc}</div>
          <a href="${opt.link}" target="_blank" onclick="event.stopPropagation();" 
             class="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 text-orange-600 rounded-lg text-[11px] font-semibold border border-orange-200 transition">
            📍 네이버 지도·사진 보기 ↗
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

export function selectOption(opt) {
  answers.push(opt);
  if (currentIdx < QUESTIONS.length - 1) {
    currentIdx++;
    renderQuestion();
  } else {
    showResult();
  }
}

export function showResult() {
  document.getElementById('question-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });


  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }


  const counts = { A: 0, B: 0, C: 0 };
  answers.forEach(a => counts[a.type]++);

  let mainType = 'A';
  if (counts.B >= counts.A && counts.B >= counts.C) mainType = 'B';
  else if (counts.C > counts.A && counts.C > counts.B) mainType = 'C';

  const typeData = TYPE_INFO[mainType];
  document.getElementById('res-badge').innerText = typeData.badge;
  document.getElementById('res-title').innerText = typeData.title;
  document.getElementById('res-desc').innerText = typeData.desc;


  const immediatePayload = {
    sessionId: sessionId,
    timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    typeBadge: typeData.badge,
    q1_course: answers[0] ? answers[0].label : '',
    q2_afternoon: answers[1] ? answers[1].label : '',
    q3_hotel: answers[2] ? answers[2].label : '',
    q4_dinner: answers[3] ? answers[3].label : '',
    q5_lunch: answers[4] ? answers[4].label : '',
    q6_healing: answers[5] ? answers[5].label : '',
    q7_lastday: answers[6] ? answers[6].label : '',
    q8_lastday: answers[7] ? answers[7].label : '',

    r1_morning: answers[0] ? answers[0].label : '',
    r2_lunch: answers[1] ? answers[1].label : '',
    r3_afternoon: answers[2] ? answers[2].label : '',
    r4_dinner: answers[3] ? answers[3].label : '',
    r5_lunch3: answers[4] ? answers[4].label : '',
    r6_afternoon3: answers[5] ? answers[5].label : '',
    r7_dinner3: answers[6] ? answers[6].label : '',
    r8_finale: answers[7] ? answers[7].label : '',
    memo: ""
  };
  syncUserSession(immediatePayload);


  renderTimeline();


  buildAllPoints(answers);
  setTimeout(initMap, 150);
}

export function renderTimeline() {
  const c = document.getElementById('itinerary-container');
  if (!c) return;

  c.innerHTML = `
    <!-- 1일차 -->
    <div onclick="window.focusPlace(33.4988, 126.4880, '제주 노블레스관광호텔')" class="p-3.5 bg-gray-50 hover:bg-orange-50/50 rounded-xl border border-gray-200 cursor-pointer transition">
      <div class="flex items-center justify-between font-bold text-gray-800 mb-1">
        <span>🌙 1일 차 (11/13 금) 야간 도착</span>
        <span class="text-[10px] text-gray-400">터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1 text-xs leading-relaxed">
        <p>• <b>22:00</b> 제주공항 도착 → 택시 5~7분 이동</p>
        <p>• <b>숙소</b>: <a href="https://map.naver.com/p/search/제주노블레스관광호텔" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">제주 노블레스관광호텔</a> 레이트 체크인 & 즉시 휴식</p>
      </div>
    </div>

    <!-- 2일차 -->
    <div class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1.5">
        <span>🌊 2일 차 (11/14 토) 서부 감성 & 히든클리프 온수풀</span>
        <span class="text-[10px] text-orange-400">항목 터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1.5 text-xs leading-relaxed">
        <p onclick="window.focusPlace(${answers[0].lat}, ${answers[0].lng}, '${answers[0].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>오전 (서부 해안)</b>: <a href="${answers[0].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[0].label}</a>
        </p>
        <p onclick="window.focusPlace(${answers[1].lat}, ${answers[1].lng}, '${answers[1].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>점심 (서부 미식)</b>: <a href="${answers[1].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[1].label}</a>
        </p>
        <p onclick="window.focusPlace(${answers[2].lat}, ${answers[2].lng}, '${answers[2].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>오후 (감성·억새)</b>: <a href="${answers[2].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[2].label}</a>
        </p>
        <p onclick="window.focusPlace(33.2552, 126.4024, '히든 클리프 호텔 & 네이처')" class="cursor-pointer hover:text-orange-600 transition bg-white/70 p-2 rounded-lg border border-orange-200">
          • <b>17:00~18:30 (고정 호캉스)</b>: <a href="https://map.naver.com/p/search/히든클리프호텔" target="_blank" onclick="event.stopPropagation();" class="text-purple-600 underline font-bold">히든 클리프 호텔 & 네이처</a> 체크인 & 47m 사계절 온수 인피니티풀 수영 🏊
        </p>
        <p onclick="window.focusPlace(${answers[3].lat}, ${answers[3].lng}, '${answers[3].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>저녁 (흑돼지 만찬)</b>: <a href="${answers[3].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[3].label}</a> (카카오택시 5분·음주 부담 제로 🍻)
        </p>
      </div>
    </div>

    <!-- 3일차 -->
    <div class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1.5">
        <span>🍊 3일 차 (11/15 일) 따뜻한 남부 힐링 & 회 한잔</span>
        <span class="text-[10px] text-orange-400">항목 터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1.5 text-xs leading-relaxed">
        <p onclick="window.focusPlace(33.2520, 126.5125, '비브레이브 혁신도시점')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>오전</b>: 연박 늦잠 & 카페 <a href="https://map.naver.com/p/search/비브레이브%20혁신도시점" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[비브레이브]</a> (시그니처 로쉐커피)
        </p>
        <p onclick="window.focusPlace(${answers[4].lat}, ${answers[4].lng}, '${answers[4].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>점심 (바다 한상)</b>: <a href="${answers[4].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[4].label}</a>
        </p>
        <p onclick="window.focusPlace(${answers[5].lat}, ${answers[5].lng}, '${answers[5].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>오후 (온화한 남부)</b>: <a href="${answers[5].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[5].label}</a>
        </p>
        <p onclick="window.focusPlace(${answers[6].lat}, ${answers[6].lng}, '${answers[6].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>저녁 (회 & 한잔)</b>: <a href="${answers[6].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[6].label}</a> 🍷
        </p>
      </div>
    </div>

    <!-- 4일차 -->
    <div class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1.5">
        <span>✈️ 4일 차 (11/16 월) 동부 숲길 & 함덕 오션뷰 피날레</span>
        <span class="text-[10px] text-orange-400">항목 터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1.5 text-xs leading-relaxed">
        <p onclick="window.focusPlace(33.4445, 126.6730, '교래손칼국수')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>점심</b>: <a href="https://map.naver.com/p/search/교래손칼국수" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[교래손칼국수]</a> (토종닭칼국수)
        </p>
        <p onclick="window.focusPlace(${answers[7].lat}, ${answers[7].lng}, '${answers[7].placeName}')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>오후 피날레</b>: <a href="${answers[7].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[7].label}</a>
        </p>
        <p onclick="window.focusPlace(33.5065, 126.4930, '제주국제공항')" class="cursor-pointer hover:text-orange-600 transition">
          • <b>복귀</b>: 18:30 렌터카 반납 → 19:00 공항 수속 → 20:00 김포행 탑승
        </p>
      </div>
    </div>
  `;
}

export function finishSelection() {
  const memoEl = document.getElementById('custom-memo');
  const memo = memoEl ? memoEl.value.trim() : '';

  const payload = {
    sessionId: sessionId,
    timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    typeBadge: document.getElementById('res-badge') ? document.getElementById('res-badge').innerText : '',
    q1_course: answers[0] ? answers[0].label : '',
    q2_afternoon: answers[1] ? answers[1].label : '',
    q3_hotel: answers[2] ? answers[2].label : '',
    q4_dinner: answers[3] ? answers[3].label : '',
    q5_lunch: answers[4] ? answers[4].label : '',
    q6_healing: answers[5] ? answers[5].label : '',
    q7_lastday: answers[6] ? answers[6].label : '',
    q8_lastday: answers[7] ? answers[7].label : '',
    r1_morning: answers[0] ? answers[0].label : '',
    r2_lunch: answers[1] ? answers[1].label : '',
    r3_afternoon: answers[2] ? answers[2].label : '',
    r4_dinner: answers[3] ? answers[3].label : '',
    r5_lunch3: answers[4] ? answers[4].label : '',
    r6_afternoon3: answers[5] ? answers[5].label : '',
    r7_dinner3: answers[6] ? answers[6].label : '',
    r8_finale: answers[7] ? answers[7].label : '',
    memo: memo
  };


  syncUserSession(payload);


  const modal = document.getElementById('complete-modal');
  const card = document.getElementById('modal-card');
  if (modal && card) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      card.classList.remove('scale-95', 'opacity-0');
      card.classList.add('scale-100', 'opacity-100');
    }, 10);
  }


  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
  }
}

export function closeCompleteModal() {
  const modal = document.getElementById('complete-modal');
  const card = document.getElementById('modal-card');
  if (card && modal) {
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }
}

export function resetGame() {
  closeCompleteModal();
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.add('hidden');
  document.getElementById('intro-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function copySummaryToClipboard() {
  if (answers.length < 8) return;

  const badge = document.getElementById('res-badge') ? document.getElementById('res-badge').innerText : '';
  const memoEl = document.getElementById('custom-memo');
  const memo = memoEl ? memoEl.value.trim() : '';

  const summary = [
    `🍊 11월 제주 여행 취향 픽 결과 (3박 4일)`,
    `• 여행 성향: ${badge}`,
    `• 베이스캠프 (2~3박): 히든 클리프 호텔 & 네이처 (47m 온수풀 호캉스)`,
    `• Round 1 [2일차 오전 (서부 해안)]: ${answers[0].placeName}`,
    `• Round 2 [2일차 점심 (서부 미식)]: ${answers[1].placeName}`,
    `• Round 3 [2일차 오후 (감성·억새)]: ${answers[2].placeName}`,
    `• Round 4 [2일차 저녁 (중문 흑돼지)]: ${answers[3].placeName}`,
    `• Round 5 [3일차 점심 (바다 한상)]: ${answers[4].placeName}`,
    `• Round 6 [3일차 오후 (온화한 남부)]: ${answers[5].placeName}`,
    `• Round 7 [3일차 저녁 (회 & 한잔)]: ${answers[6].placeName}`,
    `• Round 8 [4일차 피날레 (동부 숲길)]: ${answers[7].placeName}`,
    memo ? `• 남긴 메모: ${memo}` : ''
  ].filter(Boolean).join('\n');

  navigator.clipboard.writeText(summary).then(() => {
    alert("결과 요약이 클립보드에 복사되었습니다! 카톡에 바로 붙여넣을 수 있어요 ✨");
  }).catch(() => {
    alert("클립보드 복사 권한을 확인해주세요.");
  });
}

window.startGame = startGame;
window.prevQuestion = prevQuestion;
window.filterMap = filterMap;
window.focusPlace = focusPlace;
window.finishSelection = finishSelection;
window.closeCompleteModal = closeCompleteModal;
window.resetGame = resetGame;
window.copySummaryToClipboard = copySummaryToClipboard;
