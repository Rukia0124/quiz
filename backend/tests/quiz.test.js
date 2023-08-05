const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");

let JWT_TOKEN;
beforeAll(async () => {
  dbConnect();

  // create test user
  const res = await requestWithSupertest
    .post("/api/auth/signup")
    .set("Authorization", "application/json")
    .send({
      pseudo: "UnitTest",
      email: "unittest@domain.tld",
      password: "xX-password-Xx",
    });

  expect(res.status).toBe(201);

  const login = await requestWithSupertest
    .post("/api/auth/login")
    .set("Authorization", "application/json")
    .send({
      pseudo: "UnitTest",
      password: "xX-password-Xx",
    });
  expect(res.status).toBe(201);

  JWT_TOKEN = "Bearer " + login.body.token;
});

afterAll(async () => dbDisconnect());

describe("Quiz Endpoint", () => {
  it("GET /api/quiz auth invalid", async () => {
    const res = await requestWithSupertest.get("/api/quiz");
    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining("application/json"));
    expect(res.body).toEqual({ error: {} });
  });

  it("GET /api/quiz with no result", async () => {
    const res = await requestWithSupertest
      .get("/api/quiz")
      .set("Accept", "application/json")
      .set("Authorization", JWT_TOKEN);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("application/json"));
    expect(res.body).toEqual({
      openList: [],
      orderedList: [],
      orderedV2List: [],
      qcmList: [],
    });

    // it("GET /api/quiz auth valid with resutl", async () => {
    //   helper.createOrdered(JWT_TOKEN)
    //   helper.createQcm(JWT_TOKEN)

    //   const res = await requestWithSupertest
    //     .get("/api/quiz")
    //     .set("Authorization", JWT_TOKEN)
    //     .set("Content-Type", "application/json");

    //   expect(res.status).toEqual(200);
    // });
  });
});
