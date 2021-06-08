'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function sendMail(data){
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"WDMA Team" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: '[MSpRo]검색 결과 발송',
      text: generatedAuthNumber,
      html: `<b>${generatedAuthNumber}</b>`,
    });

    console.log('Message sent: %s', info.messageId);

    let result = status(200).json({
      status: 'Success',
      code: 200,
      message: 'Sent Auth Email',
    });
    return result;
  }
  catch (error){
    return {status: 'Error', message: 'Mail send failed'};
  }
};


module.exports = {
 sendMail: sendMail,
};