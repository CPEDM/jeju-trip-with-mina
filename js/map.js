/**
 * Leaflet 지도 제어 모듈
 * 3박 4일 일정 마커 렌더링, 일차별 필터링, 경로 폴리라인 및 위치 포커스 기능
 */

let mapInstance = null;
let currentMarkers = [];
let currentPolyline = null;
let allPointsData = [];

export function buildAllPoints(answers) {
  allPointsData = [
    { id: 1, day: 1, name: "1. 제주공항 & 노블레스호텔", category: "hotel", lat: 33.4988, lng: 126.4880, desc: "1일차 야간 체크인" },
    { id: 2, day: 2, name: "2. 협재해변 & 카페 잔물결", category: "cafe", lat: 33.3940, lng: 126.2395, desc: "2일차 오전 에메랄드 바다" },
    { id: 3, day: 2, name: "3. " + answers[1].placeName + " (선택 점심)", category: "food", lat: answers[1].lat, lng: answers[1].lng, desc: answers[1].label },
    { id: 4, day: 2, name: "4. " + answers[0].placeName + " (선택 오후)", category: "spot", lat: answers[0].lat, lng: answers[0].lng, desc: answers[0].label },
    { id: 5, day: 2, name: "5. 히든클리프 호텔 (연박)", category: "hotel", lat: 33.2550, lng: 126.4025, desc: "2~3일차 온수 인피니티풀" },
    { id: 6, day: 3, name: "6. 비브레이브 서귀포", category: "cafe", lat: 33.2520, lng: 126.5125, desc: "3일차 오전 시그니처 로쉐커피" },
    { id: 7, day: 3, name: "7. " + answers[2].placeName + " (선택 식당)", category: "food", lat: answers[2].lat, lng: answers[2].lng, desc: answers[2].label },
    { id: 8, day: 3, name: "8. " + answers[3].placeName + " (선택 오후)", category: "spot", lat: answers[3].lat, lng: answers[3].lng, desc: answers[3].label },
    { id: 9, day: 4, name: "9. " + answers[4].placeName + " (선택 오전)", category: "spot", lat: answers[4].lat, lng: answers[4].lng, desc: answers[4].label },
    { id: 10, day: 4, name: "10. 교래손칼국수", category: "food", lat: 33.4445, lng: 126.6730, desc: "4일차 점심 토종닭칼국수" },
    { id: 11, day: 4, name: "11. 함덕 델문도 & 바다", category: "cafe", lat: 33.5435, lng: 126.6690, desc: "4일차 마지막 오션뷰" },
    { id: 12, day: 4, name: "12. 제주공항 복귀", category: "route", lat: 33.5065, lng: 126.4930, desc: "20:00 김포행 복귀" }
  ];
  return allPointsData;
}

export function initMap() {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  mapInstance = L.map('map', { scrollWheelZoom: false }).setView([33.3617, 126.5292], 9);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapInstance);

  // 모바일 화면 전환 시 타일 깨짐 방지 (2단계 보정)
  requestAnimationFrame(() => {
    if (mapInstance) mapInstance.invalidateSize();
  });
  setTimeout(() => {
    if (mapInstance) mapInstance.invalidateSize();
  }, 250);

  renderMapPoints('all');
}

export function renderMapPoints(filter = 'all') {
  if (!mapInstance) return;

  // 기존 마커 & 폴리라인 제거
  currentMarkers.forEach(m => mapInstance.removeLayer(m));
  currentMarkers = [];
  if (currentPolyline) {
    mapInstance.removeLayer(currentPolyline);
    currentPolyline = null;
  }

  const filtered = filter === 'all'
    ? allPointsData
    : allPointsData.filter(p => 'day' + p.day === filter);

  const latlngs = [];

  filtered.forEach(p => {
    const iconHtml = `<div class="custom-pin pin-${p.category}">${p.id}</div>`;
    const customIcon = L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });

    const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(mapInstance);
    marker.bindPopup(`
      <div style="font-family: 'Pretendard', sans-serif; font-size: 12px; line-height: 1.4;">
        <b style="color: #EA580C;">${p.name}</b><br/>
        <span style="color: #6B7280;">${p.desc}</span>
      </div>
    `);

    marker._pointData = p;
    currentMarkers.push(marker);
    latlngs.push([p.lat, p.lng]);
  });

  // 점선 연결 (동선 시각화)
  if (latlngs.length > 1) {
    currentPolyline = L.polyline(latlngs, {
      color: '#FB923C',
      weight: 3,
      opacity: 0.8,
      dashArray: '5, 8'
    }).addTo(mapInstance);
  }

  // 필터에 맞게 지도 뷰포트 맞춤
  if (latlngs.length > 0) {
    const bounds = L.latLngBounds(latlngs);
    mapInstance.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
  }
}

export function filterMap(filter) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.className = "filter-btn px-2.5 py-1 rounded-lg font-medium bg-gray-100 text-gray-600 hover:bg-orange-100 transition";
  });
  const activeBtn = document.getElementById('btn-filter-' + filter);
  if (activeBtn) {
    activeBtn.className = "filter-btn px-2.5 py-1 rounded-lg font-bold bg-orange-500 text-white shadow-xs transition";
  }

  renderMapPoints(filter);
}

export function focusPlace(lat, lng, name) {
  if (!mapInstance) return;

  mapInstance.flyTo([lat, lng], 13, { duration: 1.0 });

  const target = currentMarkers.find(m =>
    Math.abs(m._pointData.lat - lat) < 0.001 &&
    Math.abs(m._pointData.lng - lng) < 0.001
  );

  if (target) {
    setTimeout(() => {
      target.openPopup();
    }, 1000);
  }
}
