const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { default: jsPDF } = require("jspdf");
const fs = require('fs');


const handlesendCertificate =  (userName, courseName) => {
  var doc = new jsPDF({ orientation: "l", format: "a4", compress: true });
  let width = doc.internal.pageSize.getWidth();
  let height = doc.internal.pageSize.getHeight();
  const certificateTemp = base64_encode('../../assets/certificate.png')
  doc.addImage(certificateTemp, "PNG", 0, 0, width, height);
  doc.setFontSize(25);
  doc.text(userName, width / 2, height / 2, {
    align: "center",
  });
  doc.setFontSize(25);
  doc.text(courseName, width / 2, height / 2 + 25, { align: "center" });
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  return pdfBuffer;
};

const base64_encode = (file) => {
     // read binary data
     var bitmap = fs.readFileSync(require.resolve(file), { encoding: 'base64' });
     // convert binary data to base64 encoded string
     return bitmap;
}

exports.sendCertificate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.session.userId);

  if (!user) {
    res.status(400);
    throw new Error("user doesn't exist");
  }

  const userName = req.body.userName;
  const courseName = req.body.courseName;

  const pdf = handlesendCertificate(userName, courseName);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL, // ethereal user
      pass: process.env.PASSWORD, // ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const msg = {
    from: "process.env.EMAIL", // sender address
    to: `${user.email}`, // list of receivers
    subject: `${courseName} certificate of completion`, // Subject line
    text: `Dear ${user.firstName} \nFind your Certificate in Attachments \nRegards,\nOnline learning system team`, // plain text body
    attachments: [
      {
        filename: "Certificate.pdf",
        content: pdf,
      },
    ],
  };
  // send mail with defined transport object
  await transporter.sendMail(msg);
  res.status(200).json();
});
