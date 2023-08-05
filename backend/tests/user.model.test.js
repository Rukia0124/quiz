const User = require("../models/User");

const { fakeUserData } = require("./fixtures/user");

const {
  validateNotEmpty,
  validateStringEquality,
} = require("./validators/validators");

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("User Model Test Suite", () => {
  test("should validate saving a new user successfully", async () => {
    const validUser = new User({
      password: fakeUserData.password,
      email: fakeUserData.email,
      pseudo: fakeUserData.pseudo,
    });
    const savedUser = await validUser.save();

    validateNotEmpty(savedUser);

    validateStringEquality(savedUser.email, fakeUserData.email);
    validateStringEquality(savedUser.pseudo, fakeUserData.pseudo);
    validateStringEquality(savedUser.password, fakeUserData.password);
  });

  test("should validate MongoError duplicate 'pseudo'", async () => {
    expect.assertions(2);
    const validUser = new User({
      password: fakeUserData.password,
      email: "fakeUser@email.com",
      pseudo: fakeUserData.pseudo,
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, message } = error;
      expect(name).toEqual("ValidationError");
      expect(message).toEqual(
        "User validation failed: pseudo: Error, expected `pseudo` to be unique. Value: `dummyUser`"
      );
    }
  });
  test("4. should validate MongoError duplicate 'mail'", async () => {
    expect.assertions(2);
    const validUser = new User({
      password: fakeUserData.password,
      email: fakeUserData.email,
      pseudo: "fakeUserPseudo",
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, message } = error;
      expect(name).toEqual("ValidationError");
      expect(message).toEqual(
        "User validation failed: email: Error, expected `email` to be unique. Value: `dummy@user.com`"
      );
    }
  });
  test("should validate missing mail", async () => {
    expect.assertions(2);
    const validUser = new User({
      password: fakeUserData.password,
      pseudo: "fakeUserPseudo",
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, message } = error;
      expect(name).toEqual("ValidationError");
      expect(message).toEqual(
        "User validation failed: email: Path `email` is required."
      );
    }
  });
  test("should validate missing pseudo", async () => {
    expect.assertions(2);
    const validUser = new User({
      email: "fakeUser2@email.com",
      password: fakeUserData.password,
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, message } = error;
      expect(name).toEqual("ValidationError");
      expect(message).toEqual(
        "User validation failed: pseudo: Path `pseudo` is required."
      );
    }
  });
  test("should validate missing password", async () => {
    expect.assertions(2);
    const validUser = new User({
      email: "fakeUser3@email.com",
      pseudo: "fakeUserPseudo3",
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, message } = error;
      expect(name).toEqual("ValidationError");
      expect(message).toEqual(
        "User validation failed: password: Path `password` is required."
      );
    }
  });
});
