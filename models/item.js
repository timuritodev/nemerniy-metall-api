const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
});

const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: [itemSchema],
}, { versionKey: false });

module.exports = {
  Item: mongoose.model('item', dataSchema),
};
