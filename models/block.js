const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = {
  Block: mongoose.model('block', blockSchema),
};
