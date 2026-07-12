const SHEET_NAME = "신청인";
const HEADERS = [
  "접수일시",
  "이름",
  "휴대폰",
  "직업군",
  "개인정보 동의",
  "유입경로",
  "UTM 매체",
  "UTM 캠페인",
  "접수 페이지"
];

function setupSheet() {
  const sheet = getTargetSheet();
  return sheet.getName();
}

function doGet() {
  return jsonResponse({ success: true, message: "TY영업 DB 연동 정상" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("전송된 신청 데이터가 없습니다.");
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = getTargetSheet();
    const name = clean(data.name, 30);
    const phone = clean(data.phone, 20);
    const job = clean(data.job, 50);
    const agree = data.agree === true ? "동의" : "미동의";
    const source = clean(data.source || "direct", 100);
    const medium = clean(data.medium || "none", 100);
    const campaign = clean(data.campaign || "none", 100);
    const page = clean(data.page || "", 300);

    if (name.length < 2) throw new Error("이름을 확인해주세요.");
    if (!/^010-\d{3,4}-\d{4}$/.test(phone)) throw new Error("휴대폰 번호를 확인해주세요.");
    if (!job) throw new Error("직업군을 선택해주세요.");
    if (agree !== "동의") throw new Error("개인정보 수집 동의가 필요합니다.");

    sheet.appendRow([new Date(), name, phone, job, agree, source, medium, campaign, page]);
    return jsonResponse({ success: true, message: "신청이 완료되었습니다." });
  } catch (error) {
    return jsonResponse({ success: false, message: error.message });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getTargetSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    const firstSheet = spreadsheet.getSheets()[0];
    const isBlank = firstSheet.getLastRow() === 0 && firstSheet.getLastColumn() === 0;
    sheet = isBlank ? firstSheet.setName(SHEET_NAME) : spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#eeeeee");
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function clean(value, maxLength) {
  let text = String(value || "").trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
