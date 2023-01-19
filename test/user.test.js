import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import User from "../models/userModel.js";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

chai.should();

/**
 * @route : GET /api/user
 * @description : should authenticate the request and return the respective user profile.
 */
describe("GET /api/user ", () => {
  let token;

  before(async () => {
    // Create a test user
    const user = new User({
      name: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    });
    await user.save();

    // Get JWT token for the test user
    const res = await chai
      .request(server)
      .post("/api/login")
      .send({ email: "testuser@example.com", password: "testpassword" });
    token = res.body.token;
  });

  after(async () => {
    // Delete the test user
    await User.deleteMany({});
  });

  it("should return the user profile if the request is authenticated", async () => {
    const res = await chai
      .request(server)
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);

    res.should.have.status(200);
    res.body.should.have.property("name").eql("testuser");
    res.body.should.have.property("followers").eql(0);
    res.body.should.have.property("following").eql(0);
  });
});
