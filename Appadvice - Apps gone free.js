function fetchDataAndSendReminder() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet3");
    
    // Set the formula =IMPORTXML("https://appadvice.com/apps-gone-free", J3) in cell A1 (for example)
    sheet.getRange("A1").setFormula('=INDEX(IMPORTXML("https://appadvice.com/apps-gone-free", J3),0,2)');
    sheet.getRange("E1").setFormula('=IMPORTXML("https://appadvice.com/apps-gone-free", J2)');
    sheet.getRange("G1").setFormula('=IMPORTXML("https://appadvice.com/apps-gone-free", J1)');
    sheet.getRange("I1").setFormula('=IMPORTXML("https://appadvice.com/apps-gone-free", J4)');
  
    // Wait a few moments to allow Google Sheets to process the formula
    SpreadsheetApp.flush(); // Forces the sheet to update before continuing
  
    // Get the range A1:C8 for ratings
    const rangeRating = sheet.getRange("A3:A");
  
    // Get the values in the range as a 2D array for ratings
    const valuesRating = rangeRating.getValues();
  
    // Get the range E1:E10 for titles
    const rangeTitle = sheet.getRange("E1:E");
  
    // Get the values in the range as a 2D array for titles
    const valuesTitle = rangeTitle.getValues();
  
    const rangeLink = sheet.getRange("G1:G");
    const valuesLink = rangeLink.getValues();
  
    const rangeDesc = sheet.getRange("I1:I");
    const valuesDesc = rangeDesc.getValues();
  
    // You can log the values to check them
    // Logger.log(valuesRating);
    // Logger.log(valuesTitle);
    // Logger.log(valuesLink);
    // Logger.log(valuesDesc);
  
    // Constructing the reminder message
    let reminderMessage = "Today's App Data:\n\n";
  
    // Loop through the apps (assuming there are 6 apps)
    for (let i = 0; i < 10; i++) {
  
    // Check if any value is empty, and break the loop if so
    if (!valuesTitle[i * 2][0] || !valuesLink[i * 2][0] || !valuesRating[i][0] || !valuesDesc[i][0]) {
      Logger.log(`Empty value detected. Breaking the loop at app ${i + 1}.`);
      break;
    }
    reminderMessage += `App ${i + 1}\n`;
  
    // Title: Odd indices in title array
    reminderMessage += `Title: ${valuesTitle[i * 2][0]}\n`;
  
    // Link: Odd indices in link array
    reminderMessage += `Link: ${valuesLink[i * 2][0]}\n`;
  
    // Price: Start from the 3rd row in the price array
    reminderMessage += `Price: ${valuesRating[i][0]}\n`;
  
    // Description: Normal description for each app
    reminderMessage += `Description: ${valuesDesc[i][0]}\n\n`;
  }
  
  
    // Logger.log(reminderMessage)
    // Send the reminder email
    const email = Session.getActiveUser().getEmail();
    MailApp.sendEmail(email, "Daily Data Reminder", reminderMessage);
  
  
  
  }
  