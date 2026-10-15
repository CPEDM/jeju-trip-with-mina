/**
 * 제주 여행 밸런스 게임 - 메인 앱 로직 모듈
 * 화면 전환, 선택지 진행/이전, 결과 산출, 타임라인 렌더링, 이벤트 바인딩
 */

import { QUESTIONS, TYPE_INFO } from './data/course-data.js';
import { buildAllPoints, initMap, filterMap, focusPlace } from './map.js';
import { sendSilentlyToSheet } from './webhook.js';

let currentIdx = 0;
let answers = [];

export function startGame() {
  document.getElementById('intro-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.remove('hidden');
  document.getElementById('result-screen').classList.add('hidden');
  currentIdx = 0;
  answers = [];
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

  // 이전 버튼 노출 여부 제어
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
          <div class="font-bold text-gray-800 text-sm mb-1">${opt.label}</div>
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

  // 축하 효과 (canvas-confetti)
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }

  // 유형 판정 (가장 많이 선택한 알파벳)
  const counts = { A: 0, B: 0, C: 0 };
  answers.forEach(a => counts[a.type]++);

  let mainType = 'A';
  if (counts.B >= counts.A && counts.B >= counts.C) mainType = 'B';
  else if (counts.C > counts.A && counts.C > counts.B) mainType = 'C';

  const typeData = TYPE_INFO[mainType];
  document.getElementById('res-badge').innerText = typeData.badge;
  document.getElementById('res-title').innerText = typeData.title;
  document.getElementById('res-desc').innerText = typeData.desc;

  // 세부 타임라인 렌더링
  renderTimeline();

  // 지도 포인트 데이터 빌드 및 렌더링
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
      <div class="text-gray-600 space-y-1">
        <p>• <b>22:00</b> 제주공항 도착 → 택시 7분 거리</p>
        <p>• <b>숙소</b>: <a href="https://map.naver.com/p/search/제주노블레스관광호텔" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">제주 노블레스관광호텔</a> 체크인 & 휴식</p>
      </div>
    </div>

    <!-- 2일차 -->
    <div onclick="window.focusPlace(${answers[0].lat}, ${answers[0].lng}, '${answers[0].placeName}')" class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 cursor-pointer transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1">
        <span>🌊 2일 차 (11/14 토) 서부 해안 & 온수풀</span>
        <span class="text-[10px] text-orange-400">터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1">
        <p>• <b>오전</b>: 렌터카 인수 → 협재해변 & 카페 <a href="https://map.naver.com/p/search/제주%20잔물결" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[잔물결]</a></p>
        <p>• <b>점심</b>: <a href="${answers[1].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[1].label}</a></p>
        <p>• <b>오후</b>: <a href="${answers[0].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[0].label}</a></p>
        <p>• <b>숙소 & 저녁</b>: <a href="https://map.naver.com/p/search/히든클리프호텔" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">히든클리프</a> 온수풀 & 흑돼지 만찬</p>
      </div>
    </div>

    <!-- 3일차 -->
    <div onclick="window.focusPlace(${answers[3].lat}, ${answers[3].lng}, '${answers[3].placeName}')" class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 cursor-pointer transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1">
        <span>🍊 3일 차 (11/15 일) 따뜻한 남부 서귀포</span>
        <span class="text-[10px] text-orange-400">터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1">
        <p>• <b>오전</b>: 연박 늦잠 & 카페 <a href="https://map.naver.com/p/search/비브레이브%20혁신도시점" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[비브레이브]</a></p>
        <p>• <b>점심</b>: <a href="${answers[2].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[2].label}</a></p>
        <p>• <b>오후</b>: <a href="${answers[3].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[3].label}</a></p>
        <p>• <b>저녁</b>: 서귀포 고등어회·딱새우회 한상 & 와인 한잔</p>
      </div>
    </div>

    <!-- 4일차 -->
    <div onclick="window.focusPlace(${answers[4].lat}, ${answers[4].lng}, '${answers[4].placeName}')" class="p-3.5 bg-orange-50/50 hover:bg-orange-50 rounded-xl border border-orange-100 cursor-pointer transition">
      <div class="flex items-center justify-between font-bold text-orange-900 mb-1">
        <span>✈️ 4일 차 (11/16 월) 동부 숲길 & 공항 복귀</span>
        <span class="text-[10px] text-orange-400">터치 시 지도 이동</span>
      </div>
      <div class="text-gray-600 space-y-1">
        <p>• <b>오전</b>: <a href="${answers[4].link}" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">${answers[4].label}</a></p>
        <p>• <b>점심</b>: <a href="https://map.naver.com/p/search/교래손칼국수" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[교래손칼국수]</a> (토종닭칼국수)</p>
        <p>• <b>오후 카페</b>: <a href="https://map.naver.com/p/search/함덕%20델문도" target="_blank" onclick="event.stopPropagation();" class="text-orange-600 underline font-semibold">[함덕 델문도]</a> 에메랄드 바다 감상</p>
        <p>• <b>복귀</b>: 18:30 렌터카 반납 → 20:00 김포행 탑승</p>
      </div>
    </div>
  `;
}

export function finishSelection() {
  const memoEl = document.getElementById('custom-memo');
  const memo = memoEl ? memoEl.value.trim() : '';

  const payload = {
    name: "민아",
    timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    typeBadge: document.getElementById('res-badge') ? document.getElementById('res-badge').innerText : '',
    q1_course: answers[0] ? answers[0].label : '',
    q2_food: answers[1] ? answers[1].label : '',
    q3_vibe: answers[2] ? answers[2].label : '',
    q4_afternoon: answers[3] ? answers[3].label : '',
    q5_lastday: answers[4] ? answers[4].label : '',
    memo: memo
  };

  // 백그라운드 무음 전송 (결과 대기 없이 즉각 화면 연출)
  sendSilentlyToSheet(payload);

  // 축하 모달 팝업 오픈
  const modal = document.getElementById('complete-modal');
  const card = document.getElementById('modal-card');
  if (modal && card) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      card.classList.remove('scale-95', 'opacity-0');
      card.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  // 2차 축하 콘페티
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
  if (answers.length < 5) return;

  const badge = document.getElementById('res-badge') ? document.getElementById('res-badge').innerText : '';
  const memoEl = document.getElementById('custom-memo');
  const memo = memoEl ? memoEl.value.trim() : '';

  const summary = [
    `🍊 11월 제주 여행 취향 픽 결과`,
    `• 결과: ${badge}`,
    `• 2일차 오후: ${answers[0].placeName}`,
    `• 2일차 맛집: ${answers[1].placeName}`,
    `• 3일차 식당: ${answers[2].placeName}`,
    `• 3일차 데이트: ${answers[3].placeName}`,
    `• 4일차 코스: ${answers[4].placeName}`,
    memo ? `• 메모: ${memo}` : ''
  ].filter(Boolean).join('\n');

  navigator.clipboard.writeText(summary).then(() => {
    alert("결과 요약이 클립보드에 복사되었습니다! 카톡에 바로 붙여넣을 수 있어요 ✨");
  }).catch(() => {
    alert("클립보드 복사 권한을 확인해주세요.");
  });
}

// 전역 윈도우 바인딩 (인라인 HTML 이벤트 호출 호환)
window.startGame = startGame;
window.prevQuestion = prevQuestion;
window.filterMap = filterMap;
window.focusPlace = focusPlace;
window.finishSelection = finishSelection;
window.closeCompleteModal = closeCompleteModal;
window.resetGame = resetGame;
window.copySummaryToClipboard = copySummaryToClipboard;
