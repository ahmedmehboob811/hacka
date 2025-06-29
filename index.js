const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const generateIdCardAdvanced = require('./id');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
 });

app.post('/send-id', async (req, res) => {
const { name, fatherName, cnic, course, studentId, email } = req.body;

try {
const pdfPath = await generateIdCardAdvanced({
name,
fatherName,
cnic,
course,
studentId,
});

php
Copy
Edit
// Create transporter
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});

// Send Email
const info = await transporter.sendMail({
  from: `"Saylani ID Portal" <${process.env.EMAIL_USER}>`,
  to: "studentsmit782@gmail.com",
  subject: 'Your Saylani ID Card',
  text: `Dear ${name},\n\nAttached is your Saylani Digital ID card.\n\nRegards,\nSaylani Welfare`,
  attachments: [
    {
      filename: `Saylani-ID-${name}.pdf`,
      path: pdfPath,
    },
  ],
});

console.log('Email sent:', info.messageId);
res.send('✅ ID card sent via email!');
} catch (err) {
console.error(err);
res.status(500).send('❌ Failed to send ID card.');
}
});

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
 });
