/**
 * ====================================================================
 * 제주 여행 밸런스 게임 - Google Apps Script 수신 웹훅 (doPost)
 * ====================================================================
 * [역할]
 * 민아가 모바일 웹앱에서 질문을 진행하거나 '선택 완료!' 버튼을 눌렀을 때,
 * 구글 스프레드시트에 자동으로 새 행을 추가하여 차곡차곡 누적 기록합니다.
 *
 * [사용 방법]
 * 1. Google 스프레드시트 새로 생성 (https://sheets.new)
 * 2. 상단 메뉴 [확장 프로그램] > [Apps Script] 클릭
 * 3. 이 파일의 내용을 복사하여 붙여넣기
 * 4. 우측 상단 [배포] > [새 배포] 클릭
 *    - 유형: 웹 앱 (Web App)
 *    - 설명: 제주 여행 7문항 수신
 *    - 다음 사용자 권한으로 실행: 나(내 계정)
 *    - 액세스 권한: 모든 사용자 (Anyone)  <-- 중요!
 * 5. 발급된 웹 앱 URL을 js/webhook.js의 WEBHOOK_URL에 입력
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 첫 행이 비어있으면 7문항 풀패키지 헤더 자동 생성
    if (sheet.getLastRow() === 0) {
      var headers = [
        "번호",
        "기록일시",
        "이름",
        "선택 유형",
        "Q1 2일차 오전 (협재)",
        "Q2 2일차 오후 (서부)",
        "Q3 2~3일차 숙소 (호캉스)",
        "Q4 2일차 저녁 (흑돼지)",
        "Q5 3일차 점심 (서귀포)",
        "Q6 3일차 오후 (힐링)",
        "Q7 4일차 마무리 (동부)",
        "민아의 코멘트/메모"
      ];
      sheet.appendRow(headers);

      // 헤더 스타일링 (오렌지 감귤 테마)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#FFEDD5"); // 연한 오렌지
      headerRange.setFontWeight("bold");
      headerRange.setFontColor("#9A3412");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 전송된 JSON 데이터 파싱
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // 새 행 번호 계산 (헤더 제외한 실제 제출 회차)
    var submissionNo = sheet.getLastRow();

    // 7문항 신규 키 우선 + 구버전 호환 fallback 매핑
    var q1 = data.q1_course || "";
    var q2 = data.q2_afternoon || "";
    var q3 = data.q3_hotel || data.q2_hotel || data.q2_food || "";
    var q4 = data.q4_dinner || "";
    var q5 = data.q5_lunch || data.q3_food || data.q3_vibe || "";
    var q6 = data.q6_healing || data.q4_afternoon || "";
    var q7 = data.q7_lastday || data.q5_lastday || "";

    // 데이터 행 추가
    sheet.appendRow([
      submissionNo + "회차",
      data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"),
      data.name || "민아",
      data.typeBadge || "",
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      data.memo || ""
    ]);

    // 성공 응답 반환
    return ContentService.createTextOutput(JSON.stringify({ status: "success", row: submissionNo }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
