const mongoose = require("mongoose");

const orderedImagesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: [Number],
    required: true,
  },
});

const OrderedImages = mongoose.model("OrderedImages", orderedImagesSchema);

module.exports = OrderedImages;
