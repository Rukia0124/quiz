const mongoose = require("mongoose");

const openSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Open = mongoose.model("OpenQuestion", openSchema);

module.exports = Open;
