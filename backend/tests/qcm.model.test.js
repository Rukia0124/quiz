const Quiz = require("../models/qcm");

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");
const {
  validateNotEmpty,
  validateStringEquality,
  validateArrayEquality,
} = require("./validators/validators");

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("Quiz Model Test Suite", () => {
  test("should validate saving a new quiz question successfully", async () => {
    const validQuiz = new Quiz({
      userId: "unUser",
      question: "question?",
      options: ["option1", "option2", "option3", "option4"],
      correctAnswer: "option2",
    });
    const savedQuiz = await validQuiz.save();

    validateNotEmpty(savedQuiz);

    validateStringEquality(savedQuiz.userId, "unUser");
    validateStringEquality(savedQuiz.question, "question?");
    validateArrayEquality(savedQuiz.options, [
      "option1",
      "option2",
      "option3",
      "option4",
    ]);
    validateStringEquality(savedQuiz.correctAnswer, "option2");
  });
});
