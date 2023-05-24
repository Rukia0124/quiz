const mongoose = require("mongoose");

const orderedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  images: [
    {
      number: {
        type: Number,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

const Ordered = mongoose.model("Ordered", orderedSchema);

module.exports = Ordered;
