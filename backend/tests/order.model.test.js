const OrderedImages = require("../models/order");

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("./validators/validators");

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("OrderedImages Model Test Suite", () => {
  test("should validate saving a new ordered image question successfully", async () => {
    const validOrderedImages = new OrderedImages({
      userId: "unUser",
      question: "question?",
      images: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
      correctAnswer: [2, 3, 1, 4],
    });
    const savedOrderedImages = await validOrderedImages.save();

    validateNotEmpty(savedOrderedImages);

    validateStringEquality(savedOrderedImages.userId, "unUser");
    validateStringEquality(savedOrderedImages.question, "question?");
    expect(savedOrderedImages.images).toEqual([
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      "image4.jpg",
    ]);
    expect(savedOrderedImages.correctAnswer).toEqual([2, 3, 1, 4]);
  });
});
