const fs = require('fs');
const htmlToDocx = require('html-to-docx');
const path = require('path');

(async () => {
  try {
    console.log("Reading HTML files...");
    const p1 = fs.readFileSync(path.join(__dirname, 'part1.html'), 'utf8');
    const p2 = fs.readFileSync(path.join(__dirname, 'part2.html'), 'utf8');
    const p3 = fs.readFileSync(path.join(__dirname, 'part3.html'), 'utf8');
    
    const fullHtml = p1 + p2 + p3;
    
    console.log("Converting to DOCX...");
    const fileBuffer = await htmlToDocx(fullHtml, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
    });
    
    console.log("Writing to DOCX file...");
    fs.writeFileSync(path.join(__dirname, 'PROJECT_REPORT.docx'), fileBuffer);
    console.log("Successfully created PROJECT_REPORT.docx!");
  } catch (error) {
    console.error("Error creating document:", error);
  }
})();
