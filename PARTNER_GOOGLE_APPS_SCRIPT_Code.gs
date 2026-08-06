function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = data.type === "partner_booking" ? "Bookings" : "Applications";
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      if (sheetName === "Applications") {
        sheet.appendRow(["Created At","Partner Code","Name","Country","City","Contact","Social","Experience","Audience","Source"]);
      } else {
        sheet.appendRow(["Created At","Partner Code","Guest Name","Guest Contact","Tour Date","Adults","Children","Hotel","Addon","Dietary / Health","Quoted Price","Payment Status","Note","Source"]);
      }
      sheet.setFrozenRows(1);
    }

    if (sheetName === "Applications") {
      sheet.appendRow([data.createdAt,data.partnerCode,data.name,data.country,data.city,data.contact,data.social,data.experience,data.audience,data.source]);
    } else {
      sheet.appendRow([data.createdAt,data.partnerCode,data.guestName,data.guestContact,data.tourDate,data.adults,data.children,data.hotel,data.addon,data.dietary,data.quotedPrice,data.paymentStatus,data.note,data.source]);
    }

    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
