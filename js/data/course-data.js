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
  hotelDay23: {
    name: "히든클리프 호텔&네이쳐",
    lat: 33.2550,
    lng: 126.4025,
    link: "https://map.naver.com/p/search/히든클리프호텔",
    desc: "2~3일차 숙소 (사계절 온수 인피니티 풀)"
  },
  cafeWest: {
    name: "잔물결 (한림 협재)",
    lat: 33.3912,
    lng: 126.2335,
    link: "https://map.naver.com/p/search/제주%20잔물결",
    desc: "2일차 오전 고정 카페 (돌담 감성 드립커피)"
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
  },
  cafeEast: {
    name: "함덕 델문도",
    lat: 33.5435,
    lng: 126.6690,
    link: "https://map.naver.com/p/search/함덕%20델문도",
    desc: "4일차 오후 고정 카페 (에메랄드 바다 오션뷰)"
  }
};

export const QUESTIONS = [
  {
    step: "QUESTION 1 / 5",
    title: "2일 차 토요일 오후 코스 🌾",
    subtitle: "협재 바다 보고 커피 마신 뒤, 오후엔 어디 갈까?",
    options: [
      {
        type: "A",
        emoji: "🌾",
        label: "새별오름 초입 억새밭 산책 (적당히 걷기)",
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
        label: "바람 피해 감성 미술관 (본태박물관)",
        desc: "추운 건 딱 질색! 안도 타다오 건축물과 무한거울방 실내 전시 관람",
        placeName: "본태박물관",
        category: "spot",
        day: 2,
        lat: 33.3039,
        lng: 126.3925,
        link: "https://map.naver.com/p/search/제주%20본태박물관"
      },
      {
        type: "C",
        emoji: "⛰️",
        label: "운동화 신은 김에 새별오름 정상 정복!",
        desc: "20분 으쌰으쌰 올라가서 서쪽 바다랑 한라산 파노라마 뷰 내려다보기",
        placeName: "새별오름 정상",
        category: "spot",
        day: 2,
        lat: 33.3667,
        lng: 126.3578,
        link: "https://map.naver.com/p/search/제주%20새별오름"
      }
    ]
  },
  {
    step: "QUESTION 2 / 5",
    title: "2일 차 토요일 점심 & 저녁 맛집 🍖",
    subtitle: "저녁은 히든클리프 온수풀 수영 후 흑돼지 코스!",
    options: [
      {
        type: "A",
        emoji: "🌿",
        label: "옹포별장가든(닭샤브) + 숙성도 중문점",
        desc: "소나무 정원 뷰에서 깔끔한 미나리 닭샤브 먹고, 저녁엔 직원이 구워주는 숙성도!",
        placeName: "옹포별장가든 & 숙성도",
        category: "food",
        day: 2,
        lat: 33.4012,
        lng: 126.2580,
        link: "https://map.naver.com/p/search/제주%20옹포별장가든"
      },
      {
        type: "B",
        emoji: "🍱",
        label: "협재 수우동(오션뷰 돈가스) + 숙성도 중문점",
        desc: "바다 보며 자작냉우동·돈가스 먹고, 저녁엔 핫플 숙성도 가기!",
        placeName: "협재 수우동 & 숙성도",
        category: "food",
        day: 2,
        lat: 33.3955,
        lng: 126.2415,
        link: "https://map.naver.com/p/search/협재%20수우동"
      },
      {
        type: "C",
        emoji: "🍲",
        label: "한림칼국수(보말칼국수·보말전) + 돈사돈 중문점",
        desc: "진한 보말 국물로 든든하게 채우고, 저녁엔 연탄불 흑돼지 근고기 먹기!",
        placeName: "한림칼국수 & 돈사돈",
        category: "food",
        day: 2,
        lat: 33.4130,
        lng: 126.2640,
        link: "https://map.naver.com/p/search/한림칼국수%20제주본점"
      }
    ]
  },
  {
    step: "QUESTION 3 / 5",
    title: "3일 차 일요일 서귀포 식당 분위기 🐟",
    subtitle: "서귀포에서 먹을 점심 & 저녁 식당 스타일은?",
    options: [
      {
        type: "A",
        emoji: "✨",
        label: "깔끔·모던 제주 한상차림 (고집돌우럭 중문점)",
        desc: "우럭조림+옥돔구이+낭푼밥 정갈하고 쾌적하게 먹는 코스!",
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
        label: "통갈치 한상차림 (운정이네) & 감성 횟집",
        desc: "제주 오면 갈치 해체쇼 한번 봐줘야지! 저녁엔 딱새우 포장해서 호텔에서 한잔",
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
        label: "서귀포 올레시장 & 현지인 찐 노포 (네거리식당·자리돔횟집)",
        desc: "갈치국·고등어회 찐 로컬 맛집 정복하고 올레시장 야시장 간식 투어!",
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
    step: "QUESTION 4 / 5",
    title: "3일 차 일요일 남부 오후 데이트 🌸",
    subtitle: "남원·위미 동백꽃 필 무렵, 오후에 하고 싶은 것은?",
    options: [
      {
        type: "A",
        emoji: "🌺",
        label: "쇠소깍 물빛 산책 + 휴애리 동백꽃 & 귤따기",
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
        emoji: "☕",
        label: "쇠소깍 + 테라로사 감귤밭 정원 + 카멜리아힐",
        desc: "벽돌 감성 카페 정원에서 커피 마시며 여유롭게 힐링 산책하기",
        placeName: "테라로사 서귀포점",
        category: "cafe",
        day: 3,
        lat: 33.2525,
        lng: 126.6230,
        link: "https://map.naver.com/p/search/테라로사%20서귀포점"
      },
      {
        type: "C",
        emoji: "🛶",
        label: "쇠소깍 전통 조각배(카약) 탑승 + 휴애리 풀코스",
        desc: "에메랄드 계곡 물 위에서 조각배 노 젓고, 흑돼지쇼까지 알차게 즐기기!",
        placeName: "쇠소깍 전통나룻배",
        category: "spot",
        day: 3,
        lat: 33.2530,
        lng: 126.6235,
        link: "https://map.naver.com/p/search/쇠소깍%20나룻배"
      }
    ]
  },
  {
    step: "QUESTION 5 / 5",
    title: "4일 차 월요일 체력 안배 & 복귀 🚂",
    subtitle: "동부 숲길 걷고 교래칼국수 먹은 뒤, 마지막 코스는?",
    options: [
      {
        type: "A",
        emoji: "🚂",
        label: "에코랜드 기차 숲길 투어 + 함덕 델문도 여유",
        desc: "빨간 숲속 기차 타고 역마다 내려서 곶자왈 호수 산책! 마지막은 함덕 바다 멍때리기",
        placeName: "에코랜드 테마파크",
        category: "spot",
        day: 4,
        lat: 33.4485,
        lng: 126.6710,
        link: "https://map.naver.com/p/search/에코랜드테마파크"
      },
      {
        type: "B",
        emoji: "🌾",
        label: "산굼부리 평지 억새길 40분 + 함덕 델문도 여유",
        desc: "오르막길 없이 평지 억새밭만 가볍게 걷고, 함덕 오션뷰 카페에서 편하게 쉬다 가기",
        placeName: "산굼부리",
        category: "spot",
        day: 4,
        lat: 33.4315,
        lng: 126.6895,
        link: "https://map.naver.com/p/search/제주%20산굼부리"
      },
      {
        type: "C",
        emoji: "🌊",
        label: "에코랜드 + 닭머르해안 억새 정자 + 함덕 델문도",
        desc: "기차 투어도 하고, 공항 가는 길 바닷가 나무 데크길(닭머르)에서 마지막 바다 감상!",
        placeName: "닭머르해안",
        category: "spot",
        day: 4,
        lat: 33.5360,
        lng: 126.6125,
        link: "https://map.naver.com/p/search/닭머르해안"
      }
    ]
  }
];

export const TYPE_INFO = {
  A: {
    badge: "제1안: 밸런스 정석형 당첨 ✨",
    title: "자연 감성 & 깔끔 맛집의 황금 비율",
    desc: "적당히 걷고 인생샷도 남기면서, 식당은 깔끔하고 정갈한 곳으로 고른 가장 만족도 높은 코스!"
  },
  B: {
    badge: "제2안: 여유 & 무드 집중형 당첨 ☕",
    title: "추위·피로 제로! 감성 공간 & 힐링 코스",
    desc: "무리해서 걷지 않고 따뜻한 실내 전시, 온실, 오션뷰 통창 카페 위주로 여유롭게 즐기는 힐링 여행!"
  },
  C: {
    badge: "제3안: 액티브 & 로컬 미식형 당첨 🔥",
    title: "운동화 본전 뽑는 자연 완주 & 찐 노포 탐방",
    desc: "오름 정상부터 곶자왈 숲길, 서귀포 현지인 노포 맛집까지 빠짐없이 챙기는 알찬 여행!"
  }
};
