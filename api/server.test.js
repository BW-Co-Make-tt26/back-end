test("sanity", () => {
  expect(true).toBe(true);
});

const request = require("supertest");
const server = require("./server");
const db = require("./../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
  await db("issues").truncate();
});
afterAll(async () => {
  await db.destroy();
});

const user1 = { first_name: "mike", last_name: "maton", email: "m@m.com", username: "user1", password: "1234" };

describe("endpoints", () => {
    describe("[POST] /api/users/register", () => {
      it("responds with code 201 upon success", async () => {
        let res = await request(server).post("/api/users/register").send(user1);
        expect(res.status).toBe(201);
      });
  
      it("responds with 1 new user", async () => {
          // would test that the endpoint returns the user's info, but .returning() is not supported in Sqlite3
          // .returning() is used in users-model, specific for postgres
        const res = await request(server).post("/api/users/register").send(user1);
        console.log(res.body)
        expect(res.body).toBe(1);
      });
    });
  
    describe("[POST] /api/users/login", () => {
      it("responds with code 200 upon success", async () => {
        await request(server).post("/api/users/register").send(user1);
        const res = await request(server).post("/api/users/login").send(user1);
        expect(res.status).toBe(200);
      });
  
      it("responds with a token", async () => {
        await request(server).post("/api/users/register").send(user1);
        const res = await request(server).post("/api/users/login").send(user1);
        expect(res.body.token).toBeTruthy();
      });
    });
  
    describe("[GET] /api/issues", () => {
      it("responds with token required if not logged in", async () => {
        const res = await (await request(server).get("/api/issues"));
        expect(res.body.message).toBe("token required");
      });
      it("responds with code 200 upon success", async () => {
        //register and log user in
        await request(server).post("/api/users/register").send(user1);
        const res = await request(server).post("/api/users/login").send(user1);
        //grab token
        const token = res.body.token;
        //GET request with token
        const authRes = await request(server).get("/api/issues").set({Authorization: token})
        expect(authRes.status).toBe(200);
      });
    });
  });
  