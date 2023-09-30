const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = {
  Image: mongoose.model('image', imageSchema),
};
