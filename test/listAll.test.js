const server = require('../server');
const request = require('supertest');

afterEach(() => {
  server.close();
});

describe("routes: student", () => {
  test("should respond as expected", async () => {
    const response = await request(server).get("/student");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual([{"__v": 0, "_id": "5a885b47e5949a18246b8dd7", "age": 20, "name": "'lucas"}]);
  });
});