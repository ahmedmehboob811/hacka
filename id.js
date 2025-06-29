const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

module.exports = async function generateIdCardAdvanced(data) {
  const outputPath = path.join(__dirname, `saylani-id-${data.name}.pdf`);

  // Generate QR code as base64
  const qrData = `Name: ${data.name}\nCNIC: ${data.cnic}\nCourse: ${data.course}\nID: ${data.studentId}`;
  const qrImage = await QRCode.toDataURL(qrData);

  // Dummy photo if no upload (optional)
  const dummyPhoto = "https://via.placeholder.com/100x120?text=Photo";

  // HTML Template
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: sans-serif;
            margin: 20px;
          }
          .card-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .card {
            border: 2px solid #0078d4;
            width: 48%;
            padding: 10px;
            border-radius: 8px;
          }
          .card h2, .card p {
            margin: 4px 0;
          }
          .front {
            text-align: center;
          }
          .photo {
            border: 2px solid #000;
            height: 120px;
            width: 100px;
            margin: 10px auto;
            background-image: url('${dummyPhoto}');
            background-size: cover;
            background-position: center;
          }
          .back p {
            font-size: 14px;
          }
          .qr {
            text-align: center;
          }
          .instructions {
            font-size: 13px;
            margin-top: 20px;
            color: #d80000;
          }
          .branding {
            text-align: center;
            margin-top: 20px;
          }
          .branding img {
            height: 40px;
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <div class="card front">
            <h2>SMIT</h2>
            <h3>SAYLANI MASS IT TRAINING</h3>
            <div class="photo"></div>
            <h3>${data.name}</h3>
            <p>${data.course}</p>
            <p><strong>${data.studentId}</strong></p>
          </div>

          <div class="card back">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Father Name:</strong> ${data.fatherName}</p>
            <p><strong>CNIC:</strong> ${data.cnic}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <div class="qr">
              <img src="${qrImage}" width="100" height="100" />
            </div>
            <p style="font-size: 10px; text-align: center;">Verifiable ID | Powered by SMIT</p>
          </div>
        </div>

        <div class="instructions">
          <h3>Instructions:</h3>
          <p>Please colour print this Admit/ID card.</p>
          <p>Attestation of ID card is mandatory from SMIT.</p>
          <p>No student will be allowed to enter the Entry Test without attested ID card.</p>
          <p>Bring CNIC and last qualification documents (original) at the time of the test.</p>
          <p><strong>Address:</strong> Saylani Head Office, Bahadurabad, Karachi</p>
        </div>

        <div class="branding">
          <img src="https://www.saylaniwelfare.com/static/media/smitlogo.8e5f61ba.png" alt="Saylani Logo" />
          <p>Donate Us: <a href="https://www.saylaniwelfare.com">www.saylaniwelfare.com</a></p>
        </div>
      </body>
    </html>
  `;

  // Launch Puppeteer and generate PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();

  return outputPath;
};
