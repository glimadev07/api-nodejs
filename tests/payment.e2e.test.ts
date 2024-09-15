import request from "supertest";

import { createServer } from "../src/config/create-server";
import { initPaymentRoutes } from "../src/presentation/routes/paymentRoutes";
import { Express } from "express";

describe("E2E Tests for PIX Payment API", () => {
  let server: Express;

  beforeAll(() => {
    server = createServer();
    initPaymentRoutes(server);
  });

  it("should create a valid transaction", async () => {
    const response = await request(server)
      .post("/payment")
      .set("Authorization", "Bearer VALID_AUTH_TOKEN")
      .send({
        amount: 500,
        pixKey: "99999999990",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.amount).toBe(500);
    expect(response.body.pixKey).toBe("99999999990");
  });

  it("should block a transaction due to time and amount restrictions", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-09-13T21:00:00Z"));

    const response = await request(server)
      .post("/payment")
      .set("Authorization", "Bearer VALID_AUTH_TOKEN")
      .send({
        amount: 2000,
        pixKey: "99999999990",
      });

    expect(response.status).toBe(400);
    expect(response.text).toContain(
      "Transaction blocked due to policy restrictions",
    );
  });

  it("should fetch an existing transaction", async () => {
    const createResponse = await request(server)
      .post("/payment")
      .set("Authorization", "Bearer VALID_AUTH_TOKEN")
      .send({
        amount: 500,
        pixKey: "99999999990",
      });

    const transactionId = createResponse.body.id;

    const response = await request(server)
      .get(`/payment/${transactionId}`)
      .set("Authorization", "Bearer VALID_AUTH_TOKEN");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(transactionId);
  });
});
