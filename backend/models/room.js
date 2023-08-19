const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    roomId: { type: String, required: true },
    name: { type: String, required: true },
    questions: [
      {
        id: { type: String, required: true },
      },
    ],
    creationDate: { type: Date, required: true },
    participants: [
      {
        userId: { type: String },
        score: { type: Number },
      },
    ],
    responses: [
      {
        questionId: { type: String },
        values: [
          {
            userId: { type: String },
            proposition: { type: String },
          },
        ],
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Room", roomSchema);
