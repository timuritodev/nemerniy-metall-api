const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

module.exports = {
  Session: mongoose.model('session', sessionSchema),
};
