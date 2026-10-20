export const FIXED_LOCATIONS = {
  airport: {
    name: "제주국제공항",
    lat: 33.5065,
    lng: 126.4930,
    link: "https://map.naver.com/p/search/제주국제공항",
    desc: "11/13(금) 22:00 도착 / 11/16(월) 20:00 김포 복귀"
  },
  hotelDay1: {
    name: "제주 노블레스관광호텔",
    lat: 33.4988,
    lng: 126.4880,
    link: "https://map.naver.com/p/search/제주노블레스관광호텔",
    desc: "1일차 숙소 (공항 택시 5~7분, 레이트 체크인 후 즉시 휴식)"
  },
  hotelMain: {
    name: "히든 클리프 호텔 & 네이처",
    lat: 33.2552,
    lng: 126.4024,
    link: "https://map.naver.com/p/search/히든클리프호텔",
    desc: "2~3박 베이스캠프 확정 (47m 온수 인피니티풀 09:00~19:15 무료, 중문 식당가 택시 5분)"
  },
  cafeSouth: {
    name: "비브레이브 혁신도시점",
    lat: 33.2520,
    lng: 126.5125,
    link: "https://map.naver.com/p/search/비브레이브%20혁신도시점",
    desc: "3일차 오전 고정 카페 (시그니처 로쉐커피 & 느긋한 늦잠)"
  },
  lunchDay4: {
    name: "교래손칼국수",
    lat: 33.4445,
    lng: 126.6730,
    link: "https://map.naver.com/p/search/교래손칼국수",
    desc: "4일차 점심 (토종닭칼국수 & 메밀야채전)"
  }
};

export const QUESTIONS = [
  {
    step: "ROUND 1 / 8",
    title: "2일 차 토요일 오전: 서부 해안 첫 출발 🌊",
    subtitle: "09:00 렌터카 인수 후 서부 해안도로를 따라 내려가는 첫 코스는?",
    options: [
      {
        type: "A",
        emoji: "☕",
        label: "협재 감성 세트 (에메랄드 바다 + 오달콤제주 + 잔물결 핸드드립)",
        desc: "맑고 투명한 11월 바다 산책 후 감성 소품 쇼핑과 돌집 스페셜티 커피를 한 번에 즐기는 여유!",
        weather: "💨 북서풍 7~9m/s (체감 8℃)",
        point: "바다 산책 + 아기자기 소품샵 + 11:00 오픈 감성 드립커피",
        placeName: "카페 잔물결 & 협재해변",
        category: "cafe",
        day: 2,
        lat: 33.3912,
        lng: 126.2335,
        link: "https://map.naver.com/p/search/제주%20잔물결"
      },
      {
        type: "B",
        emoji: "🌊",
        label: "애월 한담해안산책로 & 통창 오션뷰 대형 베이커리 카페",
        desc: "에메랄드빛 해안 절벽 산책로를 가볍게 걷고 통창으로 바다가 시원하게 내려다보이는 카페 타임!",
        weather: "🌊 북서풍 8~10m/s (파도 장관)",
        point: "기암괴석 해안 절벽 산책 + 시원한 통창 오션뷰",
        placeName: "애월 한담해안산책로",
        category: "spot",
        day: 2,
        lat: 33.4585,
        lng: 126.3090,
        link: "https://map.naver.com/p/search/한담해안산책로"
      },
      {
        type: "C",
        emoji: "🎨",
        label: "아르떼뮤지엄 제주 (바람·추위 100% 차폐 몰입형 미디어아트)",
        desc: "쌀쌀한 바닷바람을 피해 빛과 음악이 가득한 환상적인 실내 공간에서 커플 인생샷 남기기!",
        weather: "🏛️ 실내 100% (따뜻하고 아늑함)",
        point: "추위 완벽 차폐 + 빛과 소리의 몰입형 전시 & 인생샷",
        placeName: "아르떼뮤지엄 제주",
        category: "spot",
        day: 2,
        lat: 33.3972,
        lng: 126.3475,
        link: "https://map.naver.com/p/search/아르떼뮤지엄%20제주"
      }
    ]
  },
  {
    step: "ROUND 2 / 8",
    title: "2일 차 토요일 점심: 서부 미식 🍲",
    subtitle: "오전 일정을 마치고 즐기는 든든한 첫 번째 점심 식사는?",
    options: [
      {
        type: "A",
        emoji: "🍲",
        label: "옹포별장가든 (100년 소나무 정원 뷰 미나리 닭샤브)",
        desc: "자극적이지 않고 정갈한 국물, 통창 너머 100년 소나무 정원을 보며 대접받는 쾌적한 분위기!",
        weather: "🌲 100년 소나무 정원 통창 뷰",
        point: "미나리 닭샤브샤브 + 정갈한 상차림과 고즈넉한 정원 뷰",
        placeName: "옹포별장가든",
        category: "food",
        day: 2,
        lat: 33.3980,
        lng: 126.2480,
        link: "https://map.naver.com/p/search/옹포별장가든"
      },
      {
        type: "B",
        emoji: "🥣",
        label: "한림칼국수 본점 (진한 보말칼국수 & 매생이보말전)",
        desc: "쌀쌀한 바닷바람 맞은 뒤 뜨끈하게 속을 풀어주는 바다 고둥 육수와 바삭한 매생이전!",
        weather: "🥣 몸을 녹여주는 든든한 국물",
        point: "서부 현지인 1티어 보말칼국수 + 고소한 매생이전",
        placeName: "한림칼국수 본점",
        category: "food",
        day: 2,
        lat: 33.4150,
        lng: 126.2625,
        link: "https://map.naver.com/p/search/한림칼국수%20본점"
      },
      {
        type: "C",
        emoji: "🍱",
        label: "협재 수우동 (비양도 오션뷰 자작냉우동 & 수제 돈가스)",
        desc: "창가 바로 앞 비양도 바다를 보며 즐기는 쫄깃한 수제 면발과 겉바속촉 돈가스!",
        weather: "🌊 비양도 바다 액자 뷰",
        point: "오션뷰 자작냉우동 + 핑거 돈가스 (당일 현장 대기)",
        placeName: "협재 수우동",
        category: "food",
        day: 2,
        lat: 33.3955,
        lng: 126.2415,
        link: "https://map.naver.com/p/search/협재%20수우동"
      }
    ]
  },
  {
    step: "ROUND 3 / 8",
    title: "2일 차 토요일 오후: 감성 스팟 & 억새 🌾",
    subtitle: "히든클리프 체크인 전, 늦은 오후 황금빛 햇살을 즐길 스팟은?",
    options: [
      {
        type: "A",
        emoji: "🌾",
        label: "새별오름 초입 능선 (은빛 억새 군락 & 황금빛 노을)",
        desc: "정상 등반 없이 완만한 초입 능선에서 일렁이는 11월 억새밭을 배경으로 감성 커플 사진!",
        weather: "🌾 북서풍 6~8m/s (체감 7℃)",
        point: "등반 없는 20분 가벼운 억새 스냅 + 황금빛 노을",
        placeName: "새별오름 억새밭",
        category: "spot",
        day: 2,
        lat: 33.3667,
        lng: 126.3578,
        link: "https://map.naver.com/p/search/제주%20새별오름"
      },
      {
        type: "B",
        emoji: "🖼️",
        label: "본태박물관 (안도 타다오 건축미 & 쿠사마 야요이 거울방)",
        desc: "세계적 건축가의 노출 콘크리트 미학과 환상적인 무한거울방을 감상하는 세련된 실내 데이트!",
        weather: "🏛️ 실내 전시 위주 (바람 차폐)",
        point: "안도 타다오 건축 + 무한거울방 환상 인생샷",
        placeName: "본태박물관",
        category: "spot",
        day: 2,
        lat: 33.3039,
        lng: 126.3925,
        link: "https://map.naver.com/p/search/제주%20본태박물관"
      },
      {
        type: "C",
        emoji: "🍵",
        label: "방주교회 & 오설록 티뮤지엄 (물 위의 건축물 & 녹차밭 산책)",
        desc: "인공 수조에 떠 있는 신비로운 교회 스냅 사진 후, 녹차밭 산책과 따뜻한 녹차 디저트!",
        weather: "🍃 북서풍 4~5m/s (기온 13℃)",
        point: "물 위의 방주 스냅 + 초록 녹차밭 & 녹차 아이스크림",
        placeName: "방주교회 & 오설록",
        category: "spot",
        day: 2,
        lat: 33.3051,
        lng: 126.3872,
        link: "https://map.naver.com/p/search/제주%20방주교회"
      }
    ]
  },
  {
    step: "ROUND 4 / 8",
    title: "2일 차 토요일 저녁: 중문 흑돼지 & 한라산 소주 🥩",
    subtitle: "히든클리프 온수풀 수영 후 카카오택시 5분 거리 흑돼지 만찬은?",
    options: [
      {
        type: "A",
        emoji: "🥩",
        label: "숙성도 중문점 (그릴링 서비스 숙성 흑돼지 & 갈치속젓볶음밥)",
        desc: "직원이 완벽하게 구워주어 대화에 집중하며 편하게 한잔! 16:00 캐치테이블 원격 줄서기 필수",
        weather: "🚕 히든클리프 택시 5분 (기본요금)",
        point: "숙성육 1티어 + 전문 그릴링 서비스 + 젓갈볶음밥",
        placeName: "숙성도 중문점",
        category: "food",
        day: 2,
        lat: 33.2520,
        lng: 126.4175,
        link: "https://map.naver.com/p/search/숙성도%20중문점"
      },
      {
        type: "B",
        emoji: "🔥",
        label: "돈사돈 중문점 (연탄불 정통 근고기 & 진한 김치찌개)",
        desc: "두툼한 오리지널 근고기를 연탄불에 구워 멜젓에 푹 찍어 먹는 정통 제주 스타일!",
        weather: "🚕 히든클리프 택시 5분",
        point: "연탄불 두툼한 육즙 근고기 + 칼칼한 김치찌개",
        placeName: "돈사돈 중문점",
        category: "food",
        day: 2,
        lat: 33.2560,
        lng: 126.4260,
        link: "https://map.naver.com/p/search/돈사돈%20중문점"
      },
      {
        type: "C",
        emoji: "✨",
        label: "큰돈가 제주중문점 (특제 소스와 다양한 부위 오션뷰 흑돼지)",
        desc: "직원이 고기 부위별로 페어링 소스를 설명해주며 유쾌하게 구워주는 트렌디한 흑돼지 맛집!",
        weather: "🚕 히든클리프 택시 7분",
        point: "특제 페어링 소스 + 유쾌한 그릴링 설명 + 트렌디한 분위기",
        placeName: "큰돈가 제주중문점",
        category: "food",
        day: 2,
        lat: 33.2515,
        lng: 126.4190,
        link: "https://map.naver.com/p/search/큰돈가%20제주중문점"
      }
    ]
  },
  {
    step: "ROUND 5 / 8",
    title: "3일 차 일요일 점심: 제주 바다 한상 🐟",
    subtitle: "서귀포에서 시그니처 커피(비브레이브) 한잔 후 즐기는 남부 점심은?",
    options: [
      {
        type: "A",
        emoji: "✨",
        label: "고집돌우럭 중문점 (정갈한 우럭조림 & 낭푼밥 제주 한상)",
        desc: "매콤달콤한 우럭조림, 옥돔구이, 전복이 정갈하게 차려 나오는 깔끔하고 쾌적한 한상차림!",
        weather: "✨ 정갈하고 쾌적한 실내",
        point: "특제 양념 우럭조림 + 옥돔구이 + 쌈 싸먹는 낭푼밥",
        placeName: "고집돌우럭 중문점",
        category: "food",
        day: 3,
        lat: 33.2575,
        lng: 126.4162,
        link: "https://map.naver.com/p/search/고집돌우럭%20중문점"
      },
      {
        type: "B",
        emoji: "🍶",
        label: "네거리식당 (블루리본 서귀포 정통 노포 갈치조림 & 은갈치국)",
        desc: "서귀포 현지인 1티어, 텁텁하지 않고 칼칼한 갈치조림과 맑고 시원한 배추 은갈치국!",
        weather: "🐟 블루리본 현지인 1티어 노포",
        point: "블루리본 맛집 + 칼칼한 갈치조림 & 시원한 은갈치국",
        placeName: "네거리식당",
        category: "food",
        day: 3,
        lat: 33.2485,
        lng: 126.5630,
        link: "https://map.naver.com/p/search/서귀포%20네거리식당"
      },
      {
        type: "C",
        emoji: "📸",
        label: "운정이네 중문점 (푸짐한 비주얼 통갈치조림)",
        desc: "식탁 길이를 꽉 채우는 통갈치에 전복·문어가 듬뿍 들어간 사진 찍기 좋은 화려한 상차림!",
        weather: "📸 압도적인 통갈치 비주얼",
        point: "식탁 가득 통갈치 해체쇼 + 전복·문어 해물 만찬",
        placeName: "운정이네 중문점",
        category: "food",
        day: 3,
        lat: 33.2580,
        lng: 126.4220,
        link: "https://map.naver.com/p/search/운정이네%20중문점"
      }
    ]
  },
  {
    step: "ROUND 6 / 8",
    title: "3일 차 일요일 오후: 온화한 남부 데이트 🌺",
    subtitle: "한라산이 북풍을 막아주어 바람이 잦아들고 따뜻한 시간대의 힐링 코스는?",
    options: [
      {
        type: "A",
        emoji: "🌺",
        label: "쇠소깍 물빛 산책 + 휴애리 자연생활공원 (동백꽃길 & 귤따기)",
        desc: "비취색 계곡 데크길 산책 후 11월 중순 만개하는 애기동백 꽃길에서 감귤 따기 체험!",
        weather: "🌺 북서풍 2~3m/s (온화), 기온 16℃ (체감 15℃)",
        point: "비취색 쇠소깍 데크길 산책 + 11월 붉은 동백꽃길 & 귤따기",
        placeName: "휴애리 자연생활공원 & 쇠소깍",
        category: "spot",
        day: 3,
        lat: 33.3080,
        lng: 126.6340,
        link: "https://map.naver.com/p/search/휴애리자연생활공원"
      },
      {
        type: "B",
        emoji: "🌿",
        label: "베케(VEKE) 이끼정원 카페 + 쇠소깍 산책",
        desc: "유명 조경가가 설계한 신비로운 늦가을 이끼 정원과 거울 연못 통창 뷰에서 여유로운 커피 타임!",
        weather: "🌿 북서풍 2~3m/s, 햇살 따뜻함",
        point: "조경 예술 이끼 정원 + 거울 연못 통창 뷰 + 감성 산책",
        placeName: "베케 (VEKE)",
        category: "cafe",
        day: 3,
        lat: 33.2655,
        lng: 126.6083,
        link: "https://map.naver.com/p/search/베케"
      },
      {
        type: "C",
        emoji: "🛶",
        label: "쇠소깍 전통 조각배(카약) 탑승 + 휴애리 풀코스",
        desc: "에메랄드 물 위에서 직접 노 젓는 로맨틱 카약(사전예약 권장)과 동백꽃 인생 사진!",
        weather: "🛶 협곡 안쪽 잔잔함, 기온 15℃",
        point: "에메랄드빛 계곡 카약 노젓기 + 동백꽃 만발 포토존",
        placeName: "쇠소깍 전통나룻배 & 휴애리",
        category: "spot",
        day: 3,
        lat: 33.2530,
        lng: 126.6235,
        link: "https://map.naver.com/p/search/쇠소깍%20나룻배"
      }
    ]
  },
  {
    step: "ROUND 7 / 8",
    title: "3일 차 일요일 저녁: 회 & 한잔 🍷",
    subtitle: "남부 일정 종료 후 일요일 밤을 장식할 로맨틱한 저녁은?",
    options: [
      {
        type: "A",
        emoji: "🍷",
        label: "호텔 룸파티 포장 (딱새우회 + 고등어회 + 와인/하이볼)",
        desc: "편한 옷으로 갈아입고 호텔 룸에서 신선한 회 세트와 와인을 즐기는 둘만의 아늑한 파티!",
        weather: "🍷 히든클리프 객실 프라이빗 룸파티",
        point: "중문회어시장 차량 5분 픽업 + 히든클리프 룸에서 느긋한 와인 한잔",
        placeName: "중문회어시장 & 히든클리프 룸파티",
        category: "food",
        day: 3,
        lat: 33.2552,
        lng: 126.4024,
        link: "https://map.naver.com/p/search/중문회어시장"
      },
      {
        type: "B",
        emoji: "🐟",
        label: "자리돔횟집 (서귀포 로컬 1티어 활고등어회 & 맑은 지리탕)",
        desc: "특제 양념밥과 김에 싸 먹는 기름진 활고등어회와 뽀얗고 깊은 지리탕의 현지 찐 노포 맛!",
        weather: "🍶 찐 현지인 활고등어회 1티어",
        point: "양념밥+김+고등어회 쌈 + 깊은 지리탕 (일요일 정상영업)",
        placeName: "자리돔횟집",
        category: "food",
        day: 3,
        lat: 33.2580,
        lng: 126.5670,
        link: "https://map.naver.com/p/search/자리돔횟집"
      },
      {
        type: "C",
        emoji: "🎪",
        label: "서귀포 올레시장 야시장 투어 & 길거리 만찬",
        desc: "흑돼지 김치말이, 마농치킨 등 시장 명물 음식들을 활기찬 분위기에서 골라 먹는 재미!",
        weather: "🎪 활기찬 야시장 야간 투어",
        point: "올레시장 야시장 17:00~22:00 + 길거리 음식 정복",
        placeName: "서귀포 매일올레시장",
        category: "food",
        day: 3,
        lat: 33.2500,
        lng: 126.5640,
        link: "https://map.naver.com/p/search/서귀포매일올레시장"
      }
    ]
  },
  {
    step: "ROUND 8 / 8",
    title: "4일 차 월요일 피날레: 동부 숲길 & 함덕 오션뷰 🌊",
    subtitle: "히든클리프 체크아웃 후 교래리를 거쳐 함덕 바다로 향하는 복귀 코스는?",
    options: [
      {
        type: "A",
        emoji: "🚂",
        label: "에코랜드 기차 숲길 투어 + 함덕 델문도 (바다 앞 통창 물멍)",
        desc: "증기기관차 타고 곶자왈 숲길을 걸은 뒤, 교래리 닭칼국수 먹고 함덕 바다 바로 앞에서 여유롭게 물멍!",
        weather: "🚂 곶자왈 숲속 힐링 & 바다 물멍",
        point: "증기기관차 숲길 투어 + 교래 닭칼국수 + 바다 코앞 물멍",
        placeName: "에코랜드 & 함덕 델문도",
        category: "spot",
        day: 4,
        lat: 33.4560,
        lng: 126.6680,
        link: "https://map.naver.com/p/search/에코랜드"
      },
      {
        type: "B",
        emoji: "🥐",
        label: "산굼부리 평지 억새 + 함덕 다니쉬 (골목 감성 사워도우 빵지순례)",
        desc: "도보 피로 없이 평지에서 은빛 억새만 40분 가볍게 보고, 함덕 감성 베이커리에서 빵과 드립 커피 즐기기!",
        weather: "🥐 평지 억새 산책 & 갓 구운 빵",
        point: "완만한 평지 억새 산책 + 감성 사워도우 & 핸드드립 (월요일 정상영업)",
        placeName: "산굼부리 & 함덕 다니쉬",
        category: "spot",
        day: 4,
        lat: 33.4330,
        lng: 126.6880,
        link: "https://map.naver.com/p/search/산굼부리"
      },
      {
        type: "C",
        emoji: "🌲",
        label: "안돌오름 비밀의 숲 + 닭머르해안 억새 정자 + 델문도",
        desc: "피톤치드 편백나무 숲길 스냅 사진과 바다 절벽 위 억새 정자까지 알차게 다 찍고 공항으로 이동!",
        weather: "🌲 피톤치드 편백숲 & 해안 절벽 억새",
        point: "편백나무 비밀의 숲 스냅 + 바다 절벽 억새 정자 + 공항 30분 복귀",
        placeName: "비밀의숲 & 닭머르해안 & 델문도",
        category: "spot",
        day: 4,
        lat: 33.4565,
        lng: 126.7770,
        link: "https://map.naver.com/p/search/비밀의숲"
      }
    ]
  }
];

export const TYPE_INFO = {
  A: {
    badge: "제1안: 밸런스 정석형 당첨 ✨",
    title: "자연 감성 & 온수풀 호캉스의 정석 비율",
    desc: "협재 에메랄드 바다, 억새밭, 히든클리프 온수풀, 흑돼지 그릴링과 호텔 룸파티까지 고루 누리는 완벽한 힐링 코스!"
  },
  B: {
    badge: "제2안: 여유 & 감성 다이닝형 당첨 ☕",
    title: "추위·피로 제로! 감성 건축 & 로맨틱 다이닝",
    desc: "안도 타다오 전시, 비밀 이끼정원 카페, 활고등어회 노포와 갓 구운 사워도우 빵지순례를 즐기는 감성 여행!"
  },
  C: {
    badge: "제3안: 액티브 & 로컬 미식형 당첨 🔥",
    title: "미디어아트·카약 체험 & 서귀포 야시장 탐방",
    desc: "아르떼뮤지엄, 쇠소깍 조각배, 피톤치드 숲길부터 활기찬 올레시장 야시장까지 제주를 온몸으로 정복하는 여행!"
  }
};
