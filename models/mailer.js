const mongoose = require('mongoose');

const mailerSchema = new mongoose.Schema({
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
  Mailer: mongoose.model('mailer', mailerSchema),
};
