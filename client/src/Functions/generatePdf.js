import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import logo from "../../src/logo.png";
// const degrees = (angle) => angle * (Math.PI / 180);
export const generateBillReport = async (billData) => {
  try {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

    // Set the font sizes
    const titleFontSize = 20;
    const subTitleFontSize = 15;
    const textFontSize = 12;

    const watermarkFontSize = 80;
    const watermarkFontSize2 = 20;

    const watermarkText = "SOUTH EAST";

    page.drawText(watermarkText, {
      x: 130,
      y: 600,
      size: watermarkFontSize,
      font: timesRomanFont,
      color: rgb(0.9, 0.9, 0.9), // Light gray color
      rotate: degrees(-45), // Rotate the text diagonally
    });

    const watermarkText2 = "Land Development (PVT.) LTD.";

    page.drawText(watermarkText2, {
      x: 180,
      y: 500,
      size: watermarkFontSize2,
      font: timesRomanFont,
      color: rgb(0.8, 0.8, 0.8), // Light gray color
      rotate: degrees(-45), // Rotate the text diagonally
    });

    const response = await fetch(logo);
    const logoBytes = await response.arrayBuffer();

    // Embed the logo image
    const pngImage = await pdfDoc.embedPng(logoBytes);
    const logoDimensions = pngImage.scale(0.06); // Adjust the scale as needed

    // Draw the logo in the right upper corner
    page.drawImage(pngImage, {
      x: page.getWidth() - 70, // Adjust the x-coordinate for proper positioning
      y: page.getHeight() - 70, // Adjust the y-coordinate for proper positioning
      width: logoDimensions.width,
      height: logoDimensions.height,
    });

    // Draw the main title
    page.drawText("SOUTHEAST LAND DEVELOPMENT (PVT.) LTD.", {
      x: 50,
      y: page.getHeight() - 50,
      size: titleFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Draw the subtitle
    page.drawText("Bill Report", {
      x: 50,
      y: page.getHeight() - 100,
      size: subTitleFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    const startY = page.getHeight() - 150;
    let yOffset = startY;

    page.drawText("Bill Number", {
      x: 40,
      y: yOffset,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("Date Issued", {
      x: 130,
      y: yOffset,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("Status", {
      x: 250,
      y: yOffset,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // page.drawText("Items", {
    //   x: 350,
    //   y: yOffset,
    //   size: textFontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });

    page.drawText("Total Amount", {
      x: 350,
      y: yOffset,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 20;

    // Draw the bill details
    billData.forEach((bill) => {
      page.drawText(bill.billNumber, {
        x: 50,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(new Date(bill.dateIssued).toLocaleDateString(), {
        x: 130,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(bill.status, {
        x: 250,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      //   // Draw items column-wise
      //   const itemsColumnX = 350;
      //   let itemsColumnY = yOffset;
      //   bill.items.forEach((item) => {
      //     page.drawText(`${item.description}: $${item.amount}`, {
      //       x: itemsColumnX,
      //       y: itemsColumnY,
      //       size: textFontSize,
      //       font: timesRomanFont,
      //       color: rgb(0, 0, 0),
      //     });
      //     itemsColumnY -= 20; // Move to the next row
      //   });

      // Calculate total amount
      const totalAmount = bill.items.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      page.drawText(`$${totalAmount}`, {
        x: 370,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      yOffset -= 40; // Increase vertical gap between bills
    });

    // Draw the signature section
    page.drawText("Signature:", {
      x: 50,
      y: 100,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("MD Alamgir Hossain", {
      x: 100,
      y: 100,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDFBytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.href = URL.createObjectURL(blob);
    link.download = "Bill_Report.pdf";

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export const generatePayrollReport = async (payrollData) => {
  try {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

    // Set the font sizes
    const titleFontSize = 20;
    const subTitleFontSize = 15;
    const textFontSize = 12;

    const timesRomanBoldFont = await pdfDoc.embedFont(
      StandardFonts.TimesRomanBold
    );
    const watermarkFontSize = 80;
    const watermarkFontSize2 = 20;

    const watermarkText = "SOUTH EAST";

    page.drawText(watermarkText, {
      x: 130,
      y: 600,
      size: watermarkFontSize,
      font: timesRomanFont,
      color: rgb(0.9, 0.9, 0.9), // Light gray color
      rotate: degrees(-45), // Rotate the text diagonally
    });

    const watermarkText2 = "Land Development (PVT.) LTD.";

    page.drawText(watermarkText2, {
      x: 180,
      y: 500,
      size: watermarkFontSize2,
      font: timesRomanFont,
      color: rgb(0.8, 0.8, 0.8), // Light gray color
      rotate: degrees(-45), // Rotate the text diagonally
    });

    const response = await fetch(logo);
    const logoBytes = await response.arrayBuffer();

    // Embed the logo image
    const pngImage = await pdfDoc.embedPng(logoBytes);
    const logoDimensions = pngImage.scale(0.06); // Adjust the scale as needed

    // Draw the logo in the right upper corner
    page.drawImage(pngImage, {
      x: page.getWidth() - 70, // Adjust the x-coordinate for proper positioning
      y: page.getHeight() - 70, // Adjust the y-coordinate for proper positioning
      width: logoDimensions.width,
      height: logoDimensions.height,
    });

    // Draw the main title
    page.drawText("SOUTHEAST LAND DEVELOPMENT (PVT.) LTD.", {
      x: 50,
      y: page.getHeight() - 50,
      size: titleFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Draw the subtitle
    page.drawText("Payroll Report", {
      x: 50,
      y: page.getHeight() - 100,
      size: subTitleFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });
    const startY = page.getHeight() - 150;
    let yOffset = startY;

    page.drawText("ID", {
      x: 50,
      y: yOffset,
      size: textFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("Employee", {
      x: 140,
      y: yOffset,
      size: textFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("PayDay", {
      x: 270,
      y: yOffset,
      size: textFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("Pay Ammount", {
      x: 380,
      y: yOffset,
      size: textFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });

    // page.drawText("Items", {
    //   x: 350,
    //   y: yOffset,
    //   size: textFontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });

    page.drawText("Status", {
      x: 500,
      y: yOffset,
      size: textFontSize,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 20;

    // Draw the bill details
    payrollData.forEach((payroll) => {
      page.drawText(payroll.employee.miscellaneous.employeeIDNumber, {
        x: 40,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(
        `${payroll.employee.personalInformation.firstName} ${payroll.employee.personalInformation.lastName}`,
        {
          x: 130,
          y: yOffset,
          size: textFontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        }
      );

      page.drawText(new Date(payroll.payday).toLocaleDateString(), {
        x: 270,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(payroll.payAmount.toString(), {
        x: 400,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(payroll.status, {
        x: 500,
        y: yOffset,
        size: textFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      //   // Draw items column-wise
      //   const itemsColumnX = 350;
      //   let itemsColumnY = yOffset;
      //   bill.items.forEach((item) => {
      //     page.drawText(`${item.description}: $${item.amount}`, {
      //       x: itemsColumnX,
      //       y: itemsColumnY,
      //       size: textFontSize,
      //       font: timesRomanFont,
      //       color: rgb(0, 0, 0),
      //     });
      //     itemsColumnY -= 20; // Move to the next row
      //   });

      yOffset -= 40; // Increase vertical gap between bills
    });

    // Draw the signature section
    page.drawText("Signature:", {
      x: 50,
      y: 100,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText("MD Alamgir Hossain", {
      x: 100,
      y: 100,
      size: textFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDFBytes
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.href = URL.createObjectURL(blob);
    link.download = "Bill_Report.pdf";

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
