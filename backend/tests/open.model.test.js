const Open = require("../models/open");

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("./validators/validators");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("Open Model Test Suite", () => {
  test("should validate saving a new open question successfully", async () => {
    const validOpen = new Open({
      userId: "unUser",
      question: "question?",
      correctAnswer: "réponse",
    });
    const savedOpen = await validOpen.save();

    validateNotEmpty(savedOpen);

    validateStringEquality(savedOpen.userId, "unUser");
    validateStringEquality(savedOpen.question, "question?");
    validateStringEquality(savedOpen.correctAnswer, "réponse");
  });
});
