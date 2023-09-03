require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailoptions = {
  from: 'nemernyimetall@gmail.com',
  to: 'nemernyimetall@gmail.com',
  subject: 'Письмо отправленное через node. js',
  text: 'Текст самого письма',
};

transporter.sendMail(mailoptions, (error, info) => {
  if (error) {
    console.error('Ошибка отправки письма:', error);
  } else {
    console.log('Письмо успешно отправлено:', info.response);
  }
});
