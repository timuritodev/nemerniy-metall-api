const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fio: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = {
  Contact: mongoose.model('contact', contactSchema),
};
