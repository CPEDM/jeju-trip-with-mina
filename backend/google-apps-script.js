/**
 * ====================================================================
 * 제주 여행 밸런스 게임 - Google Apps Script 수신 웹훅 (doPost)
 * ====================================================================
 * [역할]
 * 민아가 모바일 웹앱에서 질문을 진행하거나 '선택 완료!' 버튼을 눌렀을 때,
 * 구글 스프레드시트에 자동으로 새 행을 추가하거나 직전 행의 메모를 스마트 업데이트합니다.
 *
 * [주요 스마트 기능]
 * 1. 자가 치유형 헤더: 시트가 비어있거나 구버전(10열)이어도 최신 12열 헤더(Q1~Q7)로 자동 승격
 * 2. 중복 방지 스마트 갱신 (UPSERT): 결과 화면 진입 시 1차 자동 저장 후,
 *    민아가 메모를 작성하고 완료 버튼을 누르면 직전 행의 메모만 깔끔하게 업데이트!
 * 3. 스크립트 락(LockService): 동시성 제어로 행 번호 꼬임 및 동시 쓰기 충돌 방지
 *
 * [사용 방법]
 * 1. Google 스프레드시트 (https://sheets.new) 또는 기존 시트 열기
 * 2. 상단 메뉴 [확장 프로그램] > [Apps Script] 클릭
 * 3. 이 파일의 내용을 복사하여 붙여넣기 후 저장 (Ctrl + S)
 * 4. 우측 상단 [배포] > [새 배포] 클릭
 *    - 유형: 웹 앱 (Web App)
 *    - 설명: 제주 여행 7문항 스마트 수신
 *    - 다음 사용자 권한으로 실행: 나(내 계정)
 *    - 액세스 권한: 모든 사용자 (Anyone)  <-- 중요!
 * 5. 발급된 웹 앱 URL을 js/webhook.js의 SECRET_WEBHOOK_URL에 입력
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 최대 10초 대기

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 12열 표준 최신 헤더 정의
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

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();

    // 1. 헤더 자동 생성 및 구버전 감지 시 스마트 승격
    if (lastRow === 0) {
      sheet.appendRow(headers);
      styleHeader(sheet, headers.length);
      lastRow = 1;
    } else {
      var firstRowValues = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];
      var isOldVersion = firstRowValues.length < 12 || firstRowValues[4] === "Q1 2일차 오후 코스";
      if (isOldVersion) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        styleHeader(sheet, headers.length);
      }
    }

    // 2. 전송된 JSON 데이터 파싱
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // 필드 추출 (신규 7문항 키 우선 + 구버전 호환)
    var q1 = data.q1_course || "";
    var q2 = data.q2_afternoon || "";
    var q3 = data.q3_hotel || data.q2_hotel || data.q2_food || "";
    var q4 = data.q4_dinner || "";
    var q5 = data.q5_lunch || data.q3_food || data.q3_vibe || "";
    var q6 = data.q6_healing || data.q4_afternoon || "";
    var q7 = data.q7_lastday || data.q5_lastday || "";
    var memo = data.memo || "";
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    var name = data.name || "민아";
    var typeBadge = data.typeBadge || "";

    // 3. 중복 방지 (UPSERT): 직전 행이 1차 자동 전송분이고 현재 요청에 메모가 포함되어 있다면 메모 컬럼만 업데이트
    if (lastRow > 1 && memo) {
      var lastRowData = sheet.getRange(lastRow, 1, 1, 12).getValues()[0];
      var prevMemo = lastRowData[11] || "";
      var prevType = lastRowData[3] || "";
      var prevQ1 = lastRowData[4] || "";

      // 이전 행의 선택 유형과 Q1이 일치하고 직전 메모가 비어있다면 -> 동일 세션 2차 전송으로 판별
      if (prevType === typeBadge && prevQ1 === q1 && (!prevMemo || prevMemo.toString().trim() === "")) {
        sheet.getRange(lastRow, 12).setValue(memo);
        sheet.getRange(lastRow, 2).setValue(timestamp); // 최종 확정 일시로 갱신
        return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "updated", row: lastRow - 1 }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 4. 신규 행 추가
    var submissionNo = sheet.getLastRow();
    sheet.appendRow([
      submissionNo + "회차",
      timestamp,
      name,
      typeBadge,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      memo
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "inserted", row: submissionNo }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function styleHeader(sheet, colCount) {
  var headerRange = sheet.getRange(1, 1, 1, colCount);
  headerRange.setBackground("#FFEDD5"); // 연한 감귤 오렌지
  headerRange.setFontWeight("bold");
  headerRange.setFontColor("#9A3412");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}
