const { dbConnect, dbDisconnect } = require("./dbHandler.utils");
const OrderedImages = require("../models/ordered");
const {
  validateNotEmpty,
  validateStringEquality,
  validateOrdered,
} = require("./validators/validators");

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("OrderedImages Model Test Suite", () => {
  test("should validate saving a new ordered image question successfully", async () => {
    const validOrderedImages = new OrderedImages({
      userId: "unUser",
      question: "question?",
      images: [
        { number: 1, url: "image1.jpg" },
        { number: 2, url: "image2.jpg" },
        { number: 3, url: "image3.jpg" },
        { number: 4, url: "image4.jpg" },
      ],
    });

    const savedOrderedImages = await validOrderedImages.save();

    expect(savedOrderedImages).toBeDefined();
    validateNotEmpty(savedOrderedImages);
    validateStringEquality(savedOrderedImages.userId, "unUser");
    validateStringEquality(savedOrderedImages.question, "question?");

    validateOrdered(savedOrderedImages.images, [
      { number: 1, url: "image1.jpg" },
      { number: 2, url: "image2.jpg" },
      { number: 3, url: "image3.jpg" },
      { number: 4, url: "image4.jpg" },
    ]);
  });
});
