const request = require("supertest");
const app = require("../app.js");
const Workshop = require("../models/Workshop");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const Session = require("../models/Session.js");
const WorkshopBooking = require("../models/WorkshopBooking.js");
let random = Math.floor(Math.random() * 123132);
beforeAll(() => {
  mongoose.connect(process.env.DB_CONNECTION_testing, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
});
beforeEach(() => {
  random = Math.floor(Math.random() * 123132);
});

// afterAll(()=>{
//     mongoose.connection.collections[process.env.DB_CONNECTION_testing].drop();
// })

describe("workshop end points", () => {
  test("GET workshops", async () => {
    const response = await request(app).get("/api/workshop/");
    expect(response.statusCode).toBe(200);
  });
  test("GET workshop by id", async () => {
    const response = await request(app).get(
      "/api/workshop/6071757570e7b227245aa1d7"
    );
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("not GET workshop by id", async () => {
    const response = await request(app).get("/api/workshop/6071757570e7b227245aa7");
    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("POST workshop ", async () => {
    const response = await request(app).post("/api/workshop/").send({
      title: "workshop title",
      status: "Published",
      category: "Leadership",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.WorkshopId).not.toBe();
  });
  test("POST workshop error", async () => {
    const NewWorkshop = {
      title: "title",
      sessions: {},
    };
    const response = await request(app).post("/api/workshop").send(NewWorkshop);
    expect(response.statusCode).toBe(400);
  });
  test("PATCH workshop", async () => {
    const workshop = await Workshop.findOne();
    const id = workshop._id;
    const update = {
      title: "new work",
      status: "deleted",
      category: "leadership",
      describtion: "blablabla",
    };
    const response = await request(app).patch(`/api/workshop/${id}`, update);
    expect(response.statusCode).toBe(204);
  });
  test("PATCH workshop error", async () => {
    const id = "132";
    const update = {
      title: "new work",
      status: "deleted",
      category: "leadership",
      describtion: "blablabla",
    };
    const response = await request(app).patch(`/api/workshop/${id}`, update);
    expect(response.statusCode).toBe(400);
  });
  test("PATCH workshop sessions list", async () => {
    const workshop = await Workshop.findOne();
    const id = workshop._id;
    const update = { _id: "13213214569" };
    const response = await request(app).patch(
      `/api/workshop/${id}/sessions`,
      update
    );
    expect(response.statusCode).toBe(204);
  });
  test("PATCH workshop sessions list error", async () => {
    const id = "132";
    const update = { _id: "13213214569" };
    const response = await request(app).patch(
      `/api/workshop/${id}/sessions`,
      update
    );
    expect(response.statusCode).toBe(400);
  });
  test("PATCH workshop sessions id error", async () => {
    const id = "132";
    const update = { _id: "13213214569" };
    const sessionId = "123";
    const response = await request(app).patch(
      `/api/workshop/${id}/sessions/${sessionId}`,
      update
    );
    expect(response.statusCode).toBe(404);
  });
  test("Get workshop info", async () => {
    const workshop = await Workshop.findOne();
    const id = workshop._id;
    const response = await request(app).get(`/api/workshop/${id}/info`);
    expect(response.statusCode).toBe(200);
  });
  test("Get workshop info error", async () => {
    const id = "6082b2effe702c25a0d12345";
    const response = await request(app).get(`/api/workshop/${id}/info`);
    expect(response.statusCode).toBe(404);
  });
});

// user end points //
describe("user end points", () => {
  test("GET users", async () => {
    const response = await request(app).get("/api/user/");
    expect(response.statusCode).toBe(200);
  });
  test("GET user by id", async () => {
    const user = await User.findOne();
    const id = user._id;
    const response = await request(app).get(`/api/user/${id}`, { params: "test" });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("GET user workshops by id", async () => {
    const user = await User.findOne();
    const id = user._id;
    const response = await request(app).get(`/api/user/${id}/workshops`);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("DELETE user workshops by id", async () => {
    const Newuser = new User({
      lastname: "test",
      firstname: "test",
      email: `test${random}@gmail.com`,
      role: "test",
      password: "hashedpassword",
    });
    await Newuser.save();
    const user = await User.findOne();
    const id = user._id;
    console.log(id);
    const response = await request(app).delete(`/api/user/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("PATCH user by id", async () => {
    const update = {
      lastname: "test132",
      firstname: "test23",
      email: `test${random}@gmail.com`,

      role: "test",
      password: "hashedpassword",
    };
    const Newuser = new User({
      lastname: "test1",
      firstname: "test1",
      email: `test${random}@gmail.com`,

      role: "test1",
      password: "hashedpassword",
    });
    await Newuser.save();
    const user = await User.findOne();
    const id = user._id;
    const response = await request(app).patch(`/api/user/${id}`, update);
    expect(response.statusCode).toBe(204);
  });
  //--------------------testing errors from user end points-----------------------

  test("GET user by id error", async () => {
    const id = "6082b2effe702c25a0d12345";
    const test = "roel";
    const response = await request(app).get(`/api/user/${id}`, {
      params: { test },
    });
    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  test("GET user workshops by id error", async () => {
    const id = "6082b2effe702c25a0d12345";
    const response = await request(app).get(`/api/user/${id}/workshops`);
    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("Session end points testing", () => {
  test("POST sessions ", async () => {
    const response = await request(app)
      .post("/api/session/")
      .send({
        title: "session title",
        description: "Session description",
        attendance_date: {
          starts: "",
          ends: "",
          ComingSoon: true,
        },
        status: "published",
      });
    expect(response.statusCode).toBe(201);
  });
  test("POST sessions error", async () => {
    const response = await request(app)
      .post("/api/session/")
      .send({
        title: "session title",
        attendance_date: {
          starts: "",
          ends: "",
          ComingSoon: true,
        },
        status: "published",
      });
    expect(response.statusCode).toBe(400);
  });
  test("DELETE session", async () => {
    const session = await Session.findOne();
    const id = session._id;
    const response = await request(app).delete(`/api/session/${id}`);
    expect(response.statusCode).toBe(204);
  });
  test("PATCH session", async () => {
    const newSession = new Session({
      title: "session title",
      description: "Session description",
      attendance_date: {
        starts: "",
        ends: "",
        ComingSoon: true,
      },
      status: "published",
    });
    await newSession.save();
    const update = {
      title: "session updated",
      attendance_date: {
        starts: "",
        ends: "",
        ComingSoon: true,
      },
      status: "published",
    };
    const session = await Session.findOne();
    const id = session._id;
    const response = await request(app).patch(`/api/session/${id}`, update);
    expect(response.statusCode).toBe(204);
  });
});

describe("Booking requests", () => {
  test("GET all Booking requests ", async () => {
    const searchuser = await User.findOne();
    const workshop = await Workshop.findOne();
    const newBooking = new WorkshopBooking({
      workshop: workshop._id,
      user: searchuser._id,
    });
    await newBooking.save();
    const response = await request(app).get("/api/booking/request/");
    expect(response.statusCode).toBe(200);
  });
  test("GET Booking requests by id ", async () => {
    const booking = await WorkshopBooking.findOne();
    const id = booking._id;
    const response = await request(app).get(`/api/booking/request/${id}`);
    expect(response.statusCode).toBe(200);
  });
  test("POST Booking requests ", async () => {
    const user = await User.findOne();
    const workshop = await Workshop.findOne();
    const newBooking = {
      workshop: workshop._id,
      user: user._id,
    };
    const response = await request(app)
      .post("/api/booking/request/")
      .send(newBooking);
    expect(response.statusCode).toBe(200);
  });
  test("PATCH Booking requests status declined", async () => {
    const booking = await WorkshopBooking.findOne();
    await booking.populate("user").populate("workshop");
    const response = await request(app)
      .patch(`/api/booking/request`)
      .send({ data: booking, status: "declined" });
    expect(response.statusCode).toBe(203);
  });
  test("GET Booking requests by id error", async () => {
    const id = "6082b2effe702c25a0d12345";
    const response = await request(app).get(`/api/booking/request/${id}`);
    expect(response.statusCode).toBe(404);
  });
  test("POST Booking requests error", async () => {
    const response = await request(app).post("/api/booking/request/").send({
      workshop: null,
      user: null,
    });
    expect(response.statusCode).toBe(200);
  });
  test("PATCH Booking requests error", async () => {
    const id = "6082b2effe702c25a0d12345";
    const response = await request(app)
      .patch(`/api/booking/request/`)
      .send({ data: id });
    expect(response.statusCode).toBe(400);
  });
});