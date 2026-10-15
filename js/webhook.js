/**
 * Google Apps Script 스프레드시트 무음 연동 웹훅 모듈
 * 
 * 민아가 '선택 완료!'를 눌렀을 때 백그라운드에서 구글 시트로 선택 결과를 조용히 전송합니다.
 * 에러나 지연이 발생하더라도 사용자 화면(UI)에는 일체 노출되지 않습니다.
 */

// [비밀 설정] Google Apps Script 배포 URL 입력 (비워두면 무음 무시됨)
export const SECRET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw9pGE8zPfM3h2_Q-kwhQkluqiby2tK9Vis_ZBlBUCghPSCaKtPjYNrkxP1LntDGJlL/exec";

export function sendSilentlyToSheet(payload) {
  if (!SECRET_WEBHOOK_URL || typeof SECRET_WEBHOOK_URL !== 'string' || !SECRET_WEBHOOK_URL.trim()) {
    return Promise.resolve(false);
  }

  // Apps Script 연동 시 CORS preflight 차단을 위해 text/plain 규격 사용
  try {
    return fetch(SECRET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // 무음 전송 실패 시 UI 무시
    });
  } catch (err) {
    return Promise.resolve(false);
  }
}
