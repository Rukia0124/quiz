const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const { dbConnect, dbDisconnect } = require("./dbHandler.utils");

beforeAll(async () => {
  dbConnect();
});
afterAll(async () => dbDisconnect());

describe("Monitoring endpoint", () => {
  it("GET /ping", async () => {
    const res = await requestWithSupertest.get("/ping");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("text/html"));
    expect(res.text).toEqual("pong");
  });
});
