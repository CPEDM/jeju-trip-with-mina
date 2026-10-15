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
    { id: 2, day: 2, name: "2. 협재 감성 세트", category: "cafe", lat: 33.3940, lng: 126.2395, desc: "협재 바다 + 소품샵(오달콤제주) + 잔물결 드립커피" },
    { id: 3, day: 2, name: "3. " + answers[0].placeName + " (선택 오후)", category: answers[0].category, lat: answers[0].lat, lng: answers[0].lng, desc: answers[0].label },
    { id: 4, day: [2, 3], name: "4. " + answers[1].placeName + " (선택 숙소)", category: "hotel", lat: answers[1].lat, lng: answers[1].lng, desc: answers[1].label },
    { id: 5, day: 3, name: "5. 비브레이브 서귀포", category: "cafe", lat: 33.2520, lng: 126.5125, desc: "3일차 오전 시그니처 로쉐커피" },
    { id: 6, day: 3, name: "6. " + answers[2].placeName + " (선택 식당)", category: "food", lat: answers[2].lat, lng: answers[2].lng, desc: answers[2].label },
    { id: 7, day: 3, name: "7. " + answers[3].placeName + " (선택 힐링)", category: answers[3].category, lat: answers[3].lat, lng: answers[3].lng, desc: answers[3].label },
    { id: 8, day: 4, name: "8. 교래손칼국수", category: "food", lat: 33.4445, lng: 126.6730, desc: "4일차 점심 토종닭칼국수" },
    { id: 9, day: 4, name: "9. " + answers[4].placeName + " (선택 마무리)", category: answers[4].category, lat: answers[4].lat, lng: answers[4].lng, desc: answers[4].label },
    { id: 10, day: 4, name: "10. 제주공항 복귀", category: "route", lat: 33.5065, lng: 126.4930, desc: "20:00 김포행 복귀" }
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

  mapInstance = L.map('map', { 
    scrollWheelZoom: false,
    attributionControl: false 
  }).setView([33.3617, 126.5292], 9);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
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
    : allPointsData.filter(p => {
        if (Array.isArray(p.day)) {
          return p.day.some(d => 'day' + d === filter);
        }
        return 'day' + p.day === filter;
      });

  const latlngs = [];

  filtered.forEach(p => {
    let customIcon;

    if (p.category === 'hotel') {
      const houseSvg = `
        <div class="custom-pin-hotel" title="${p.name}">
          <svg viewBox="0 0 32 34" width="32" height="34" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.32));">
            <path d="M16 3 L30 14.5 H26 V31 C26 32.1 25.1 33 24 33 H8 C6.9 33 6 32.1 6 31 V14.5 H2 Z" 
                  fill="#8B5CF6" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" />
            <text x="16" y="24" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="13" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif">${p.id}</text>
          </svg>
        </div>
      `;
      customIcon = L.divIcon({
        html: houseSvg,
        className: '',
        iconSize: [32, 34],
        iconAnchor: [16, 17],
        popupAnchor: [0, -17]
      });
    } else {
      const iconHtml = `<div class="custom-pin pin-${p.category}">${p.id}</div>`;
      customIcon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });
    }

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
