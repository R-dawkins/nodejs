import { expect } from "chai";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/is-auth.js";
import sinon from "sinon";

describe("Auth middleware", function () {
  it("should thorw an error if no authorization header is present", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function () {
        return "Bearer syzasdgfargaprg";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw an error if the authorization header is only one string", function () {
    const req = {
      get: function () {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
