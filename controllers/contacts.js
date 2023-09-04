require('dotenv').config();
const nodemailer = require('nodemailer');
const { Contact } = require('../models/contact');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);

module.exports.sendEmail = async (req, res) => {
  try {
    const {
      fio, telephone, email, message,
    } = req.body;

    const newContact = new Contact({
      fio,
      telephone,
      email,
      message,
    });
    await newContact.save();

    const mailOptions = {
      from: 'nemernyimetall@gmail.com',
      to: 'nemernyimetall@gmail.com',
      subject: 'Message from the website',
      text: `Name: ${fio}\nTelephone: ${telephone}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
      } else {
        console.log('Email sent successfully:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
