/**
 * 제주 여행 밸런스 게임 - 코스 및 장소 데이터 명세
 * 장소명, 좌표, 네이버 지도 링크, 질문 항목을 이곳에서 단독으로 편집할 수 있습니다.
 */

export const FIXED_LOCATIONS = {
  airport: {
    name: "제주국제공항",
    lat: 33.5065,
    lng: 126.4930,
    link: "https://map.naver.com/p/search/제주국제공항",
    desc: "11/13(금) 22:00 도착 / 11/16(월) 20:00 복귀"
  },
  hotelDay1: {
    name: "제주 노블레스관광호텔",
    lat: 33.4988,
    lng: 126.4880,
    link: "https://map.naver.com/p/search/제주노블레스관광호텔",
    desc: "1일차 숙소 (공항 택시 7분)"
  },
  cafeWestSet: {
    name: "협재 감성 세트 (잔물결 & 오달콤제주)",
    lat: 33.3940,
    lng: 126.2395,
    link: "https://map.naver.com/p/search/제주%20잔물결",
    desc: "협재 바다 산책 + 감성 소품샵(오달콤제주) + 돌담 드립커피(잔물결)"
  },
  cafeSouth: {
    name: "비브레이브 혁신도시점",
    lat: 33.2520,
    lng: 126.5125,
    link: "https://map.naver.com/p/search/비브레이브%20혁신도시점",
    desc: "3일차 오전 고정 카페 (시그니처 로쉐커피)"
  },
  lunchDay4: {
    name: "교래손칼국수",
    lat: 33.4445,
    lng: 126.6730,
    link: "https://map.naver.com/p/search/교래손칼국수",
    desc: "4일차 점심 (토종닭칼국수)"
  }
};

export const QUESTIONS = [
  {
    step: "QUESTION 1 / 7",
    title: "2일 차 토요일 오전 협재 🌊",
    subtitle: "협재 바다 도착! 아침엔 뭐부터 할까?",
    options: [
      {
        type: "A",
        emoji: "☕",
        label: "협재 바다 산책 + 돌담 카페 [잔물결] 드립커피",
        desc: "에메랄드 바다 거닐고, 제주 돌담 감성 카페에서 여유롭게 모닝 핸드드립 커피!",
        placeName: "카페 잔물결",
        category: "cafe",
        day: 2,
        lat: 33.3912,
        lng: 126.2335,
        link: "https://map.naver.com/p/search/제주%20잔물결"
      },
      {
        type: "B",
        emoji: "🎁",
        label: "귀여운 감성 소품샵 [오달콤제주] 기념품 쇼핑",
        desc: "협재해변 바로 앞! 귀여운 감귤 굿즈, 감성 소품들 둘러보며 아기자기하게 득템하기",
        placeName: "오달콤제주 협재점",
        category: "spot",
        day: 2,
        lat: 33.3941,
        lng: 126.2413,
        link: "https://map.naver.com/p/search/오달콤제주%20협재점"
      },
      {
        type: "C",
        emoji: "🍱",
        label: "바다 보며 먹는 자작냉우동 & 돈가스 [협재 수우동]",
        desc: "오션뷰 통창 보면서 시원한 자작냉우동과 바삭한 돈가스로 든든하게 여행 시작!",
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
    step: "QUESTION 2 / 7",
    title: "2일 차 토요일 오후 코스 🌾",
    subtitle: "협재에서 여유 부린 뒤, 서귀포 내려가는 길엔 어디 들를까?",
    options: [
      {
        type: "A",
        emoji: "🌾",
        label: "새별오름 초입 (은빛 억새밭 가볍게 인생샷 산책)",
        desc: "정상까진 안 가고 초입 능선에서 은빛 억새랑 노을 인생샷 찍기!",
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
        label: "본태박물관 (안도 타다오 건축 & 무한거울방 전시)",
        desc: "바람 피해 실내에서 세계적인 안도 타다오 건축물과 환상적인 거울방 관람!",
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
        label: "방주교회 & 오설록 티뮤지엄 (물 위의 건축 & 녹차밭 산책)",
        desc: "물 위에 뜬 방주교회 예술 건축 감상하고, 초록빛 녹차밭 산책 & 녹차 아이스크림 디저트!",
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
    step: "QUESTION 3 / 7",
    title: "2~3일 차 호캉스 숙소 픽! 🏨",
    subtitle: "토·일 2박을 보낼 우리의 베이스캠프는?",
    options: [
      {
        type: "A",
        emoji: "🌲",
        label: "히든클리프 호텔 (숲속 온수풀 & 중문 5분 복귀)",
        desc: "중문 원시림 계곡 온수 인피니티 풀 + 저녁에 흑돼지에 소주 한잔하고 택시 5분 복귀!",
        placeName: "히든클리프 호텔&네이쳐",
        category: "hotel",
        day: [2, 3],
        lat: 33.2552,
        lng: 126.4024,
        link: "https://map.naver.com/p/search/히든클리프호텔"
      },
      {
        type: "B",
        emoji: "🏰",
        label: "제주 부영호텔 (붉은 벽돌 포토존 & 넓은 객실)",
        desc: "이국적인 붉은 벽돌 건축물 인생샷 명소! 압도적인 가성비와 넓고 쾌적한 객실",
        placeName: "제주 부영호텔 & 리조트",
        category: "hotel",
        day: [2, 3],
        lat: 33.2435,
        lng: 126.4253,
        link: "https://map.naver.com/p/search/제주부영호텔"
      },
      {
        type: "C",
        emoji: "🌴",
        label: "더 시에나 프리모 (구 토스카나 호텔) (이탈리아 휴양지 & 34도 온수풀)",
        desc: "이탈리아 휴양지 감성 야자수 뷰 대형 온수풀에서 조용하고 잔잔한 휴식!",
        placeName: "더 시에나 프리모 (구 토스카나 호텔)",
        category: "hotel",
        day: [2, 3],
        lat: 33.2678,
        lng: 126.4862,
        link: "https://m.map.naver.com/search2/search.naver?query=더시에나프리모"
      }
    ]
  },
  {
    step: "QUESTION 4 / 7",
    title: "2일 차 토요일 저녁 흑돼지 🍖",
    subtitle: "온수풀 수영 후 저녁 흑돼지는 어떤 스타일?",
    options: [
      {
        type: "A",
        emoji: "🥩",
        label: "숙성도 중문점 (직원이 직접 구워주는 숙성육 핫플)",
        desc: "육즙 팡팡 터지는 교차숙성 흑돼지 꽃등심과 뼈등심, 직원이 완벽하게 구워주는 1등 맛집!",
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
        label: "돈사돈 중문점 (연탄불 두툼한 근고기 로컬 감성)",
        desc: "두툼한 연탄불 흑돼지 근고기에 멜젓 콕 찍어 먹는 찐 로컬 노포 분위기!",
        placeName: "돈사돈 중문점",
        category: "food",
        day: 2,
        lat: 33.2560,
        lng: 126.4260,
        link: "https://map.naver.com/p/search/돈사돈%20중문점"
      },
      {
        type: "C",
        emoji: "🍷",
        label: "호텔 룸파티 (딱새우회+흑돼지 포장해서 와인 한잔)",
        desc: "추운 밖 대신 따뜻한 룸에서 편안하게 딱새우회와 흑돼지 만찬 포장해서 오붓한 와인 파티!",
        placeName: "중문 딱새우 & 룸파티",
        category: "food",
        day: 2,
        lat: 33.2552,
        lng: 126.4024,
        link: "https://map.naver.com/p/search/중문딱새우회"
      }
    ]
  },
  {
    step: "QUESTION 5 / 7",
    title: "3일 차 일요일 식당 분위기 🐟",
    subtitle: "일요일 갈치 & 회, 어떤 분위기가 좋아?",
    options: [
      {
        type: "A",
        emoji: "✨",
        label: "정갈하고 예쁜 한상 (고집돌우럭 정식 + 깔끔 횟집)",
        desc: "우럭조림+옥돔구이 정갈한 한상차림 먹고, 저녁엔 깔끔한 중문 횟집!",
        placeName: "고집돌우럭 중문점",
        category: "food",
        day: 3,
        lat: 33.2575,
        lng: 126.4162,
        link: "https://map.naver.com/p/search/고집돌우럭%20중문점"
      },
      {
        type: "B",
        emoji: "🥢",
        label: "통갈치 한상차림 (운정이네 통갈치 + 여유로운 카페)",
        desc: "낮엔 푸짐한 통갈치조림 해체쇼, 저녁엔 서귀포 감성 횟집에서 힐링!",
        placeName: "운정이네 중문점",
        category: "food",
        day: 3,
        lat: 33.2580,
        lng: 126.4220,
        link: "https://map.naver.com/p/search/운정이네%20중문점"
      },
      {
        type: "C",
        emoji: "🍶",
        label: "서귀포 로컬 찐 노포 (블루리본 네거리식당 & 올레시장)",
        desc: "블루리본 네거리식당 갈치국 + 자리돔횟집 고등어회 찐 현지인 맛집 정복!",
        placeName: "네거리식당 & 올레시장",
        category: "food",
        day: 3,
        lat: 33.2485,
        lng: 126.5630,
        link: "https://map.naver.com/p/search/서귀포%20네거리식당"
      }
    ]
  },
  {
    step: "QUESTION 6 / 7",
    title: "3일 차 일요일 남부 오후 데이트 🌸",
    subtitle: "따뜻한 서귀포 남쪽, 어디서 힐링할까?",
    options: [
      {
        type: "A",
        emoji: "🌺",
        label: "쇠소깍 & 휴애리 (물빛 산책 & 동백꽃길 귤따기)",
        desc: "비취색 물빛 보며 걷고, 휴애리에서 활짝 핀 동백꽃 인생샷 & 감귤 따기 체험!",
        placeName: "휴애리 자연생활공원",
        category: "spot",
        day: 3,
        lat: 33.3080,
        lng: 126.6340,
        link: "https://map.naver.com/p/search/휴애리자연생활공원"
      },
      {
        type: "B",
        emoji: "🌿",
        label: "베케(VEKE) & 쇠소깍 (환상적인 이끼정원 통창 카페)",
        desc: "조경가가 만든 환상적인 이끼정원 통창 카페에서 여유롭게 힐링 산책 & 커피!",
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
        label: "쇠소깍 카약 체험 & 휴애리 풀코스",
        desc: "에메랄드 계곡 물 위에서 전통 조각배 노 젓고, 동백꽃 인생샷까지 알차게 즐기기!",
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
    step: "QUESTION 7 / 7",
    title: "4일 차 월요일 함덕 마무리 & 복귀 🌊",
    subtitle: "서울 가기 전 함덕에서 마지막 커피와 빵은?",
    options: [
      {
        type: "A",
        emoji: "🌊",
        label: "함덕 델문도 (바다 바로 앞 탁 트인 오션뷰 물멍)",
        desc: "에메랄드빛 바다 바로 코앞에서 파도 소리 들으며 시원하게 물멍 때리기!",
        placeName: "함덕 델문도",
        category: "cafe",
        day: 4,
        lat: 33.5435,
        lng: 126.6690,
        link: "https://map.naver.com/p/search/함덕%20델문도"
      },
      {
        type: "B",
        emoji: "🥐",
        label: "함덕 다니쉬 (골목 감성 갓 구운 사워도우 빵지순례)",
        desc: "골목 안 아기자기한 감성에서 갓 구운 사워도우와 디저트 & 핸드드립 커피!",
        placeName: "함덕 다니쉬",
        category: "cafe",
        day: 4,
        lat: 33.5428,
        lng: 126.6662,
        link: "https://map.naver.com/p/search/함덕%20다니쉬"
      },
      {
        type: "C",
        emoji: "🌲",
        label: "안돌오름 비밀의숲 + 델문도 (피톤치드 편백나무숲 & 바다)",
        desc: "피톤치드 가득한 편백나무 숲길 들러 인생샷 남기고 함덕 바다 오션뷰 카페 즐기기!",
        placeName: "안돌오름 비밀의숲",
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
    desc: "탁 트인 억새밭과 에메랄드 바다, 따뜻한 온수풀과 정갈한 맛집까지 고루 누리는 완벽한 힐링 코스!"
  },
  B: {
    badge: "제2안: 여유 & 감성 다이닝형 당첨 ☕",
    title: "추위·피로 제로! 감성 건축 & 로맨틱 다이닝",
    desc: "안도타다오 전시, 비밀 이끼정원 카페, 갓 구운 사워도우 빵지순례와 호텔 룸 와인 파티를 즐기는 감성 여행!"
  },
  C: {
    badge: "제3안: 액티브 & 로컬 미식형 당첨 🔥",
    title: "동백꽃·카약 체험 & 서귀포 찐 노포 탐방",
    desc: "물 위의 교회와 쇠소깍 조각배, 피톤치드 숲길부터 블루리본 현지인 맛집까지 알차게 정복하는 미식 여행!"
  }
};
