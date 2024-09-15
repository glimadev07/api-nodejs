import { authorize } from "../src/presentation/middleware/authorize";
import request from "supertest";
import { createServer } from "../src/config/create-server";
import { Express } from "express";

describe("Authorization Middleware", () => {
  let server: Express;

  beforeAll(() => {
    server = createServer();
    server.get("/protected", authorize, (req, res) => {
      res.json({ message: "You have accessed a protected endpoint!" });
    });
  });

  it("should allow access when the authorization token is valid", async () => {
    const response = await request(server)
      .get("/protected")
      .set("Authorization", "Bearer VALID_AUTH_TOKEN");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "You have accessed a protected endpoint!",
    });
  });

  it("should return 403 error when the authorization token is missing", async () => {
    const response = await request(server).get("/protected");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "Authorization token not provided",
    });
  });

  it("should return 403 error when the authorization token is invalid", async () => {
    const response = await request(server)
      .get("/protected")
      .set("Authorization", "Bearer INVALID_TOKEN");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Invalid token" });
  });
});
