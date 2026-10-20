/**
 * ====================================================================
 * 제주 여행 밸런스 게임 - Google Apps Script 수신 웹훅 (doPost)
 * ====================================================================
 * [역할]
 * 민아가 모바일 웹앱에서 질문을 진행하거나 '선택 완료!' 버튼을 눌렀을 때,
 * 구글 스프레드시트에 자동으로 새 행을 추가하거나 직전 행의 메모를 스마트 업데이트합니다.
 *
 * [주요 스마트 기능]
 * 1. 자가 치유형 헤더: 시트가 비어있거나 구버전(10열, 12열)이어도 최신 13열 헤더(R1~R8)로 자동 승격
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
 *    - 설명: 제주 여행 8라운드 풀패키지 스마트 수신
 *    - 다음 사용자 권한으로 실행: 나(내 계정)
 *    - 액세스 권한: 모든 사용자 (Anyone)  <-- 중요!
 * 5. 발급된 웹 앱 URL을 js/webhook.js의 API_ENDPOINT에 입력
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 최대 10초 대기

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 13열 표준 최신 헤더 정의 (8개 라운드 + 메모)
    var headers = [
      "번호",
      "기록일시",
      "이름",
      "선택 유형",
      "R1 2일차 오전 (서부 해안)",
      "R2 2일차 점심 (서부 미식)",
      "R3 2일차 오후 (감성·억새)",
      "R4 2일차 저녁 (중문 흑돼지)",
      "R5 3일차 점심 (바다 한상)",
      "R6 3일차 오후 (온화한 남부)",
      "R7 3일차 저녁 (회 & 한잔)",
      "R8 4일차 피날레 (동부 숲길)",
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
      var isOldVersion = firstRowValues.length < 13 || firstRowValues[4].toString().indexOf("R1") === -1;
      if (isOldVersion) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        styleHeader(sheet, headers.length);
      }
    }

    // 2. 전송된 JSON 데이터 파싱
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // 필드 추출 (신규 8라운드 키 우선 + 구버전 호환)
    var r1 = data.r1_morning || data.q1_course || "";
    var r2 = data.r2_lunch || data.q2_afternoon || "";
    var r3 = data.r3_afternoon || data.q3_hotel || "";
    var r4 = data.r4_dinner || data.q4_dinner || "";
    var r5 = data.r5_lunch3 || data.q5_lunch || "";
    var r6 = data.r6_afternoon3 || data.q6_healing || "";
    var r7 = data.r7_dinner3 || data.q7_lastday || "";
    var r8 = data.r8_finale || data.q8_lastday || "";
    var memo = data.memo || "";
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    var name = data.name || "민아";
    var typeBadge = data.typeBadge || "";

    // 3. 중복 방지 (UPSERT): 직전 행이 1차 자동 전송분이고 현재 요청에 메모가 포함되어 있다면 메모 컬럼만 업데이트
    if (lastRow > 1 && memo) {
      var lastRowData = sheet.getRange(lastRow, 1, 1, 13).getValues()[0];
      var prevMemo = lastRowData[12] || "";
      var prevType = lastRowData[3] || "";
      var prevR1 = lastRowData[4] || "";

      // 이전 행의 선택 유형과 R1이 일치하고 직전 메모가 비어있다면 -> 동일 세션 2차 전송으로 판별
      if (prevType === typeBadge && prevR1 === r1 && (!prevMemo || prevMemo.toString().trim() === "")) {
        sheet.getRange(lastRow, 13).setValue(memo);
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
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
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

/**
 * 첫 번째 행(헤더)을 세련된 주황색/흰색 스타일로 자동 포맷팅
 */
function styleHeader(sheet, numCols) {
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setBackground("#EA580C"); // 귤빛 오렌지 테마
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1); // 1행 틀고정
}
