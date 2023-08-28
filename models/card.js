const mongoose = require('mongoose');
// const { urlRegex } = require('../utils/utils');

const cardSchema = new mongoose.Schema({
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
  size: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  is_favorite: {
    type: Boolean,
    required: true,
  },
  is_bin: {
    type: Boolean,
    required: true,
  },
}, { versionKey: false });

module.exports = {
  Card: mongoose.model('card', cardSchema),
};
