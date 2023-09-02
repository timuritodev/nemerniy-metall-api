const nodemailer = require('nodemailer');
const { Contact } = require('../models/contact'); // Import the Contact model

// Create and configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer
  auth: {
    user: 'nemernyimetall@gmail.com', // Your email address
    pass: 'Qwerty1234$', // Your email password
  },
});

module.exports.sendEmail = async (req, res) => {
  try {
    const {
      fio, telephone, email, message,
    } = req.body;

    // Save the contact details to your database
    const newContact = new Contact({
      fio,
      telephone,
      email,
      message,
    });
    await newContact.save();

    // Configure email options
    const mailOptions = {
      from: email, // Use the sender's email from the request body
      to: 'nemernyimetall@gmail.com', // Specify the recipient's email address
      subject: 'Message from the website',
      text: `Name: ${fio}\nTelephone: ${telephone}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
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
