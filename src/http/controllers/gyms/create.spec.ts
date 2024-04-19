import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils/create-and-authenticate-user";

describe(" Create Gym (e2e) ", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to Create a Gym ", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const Response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JAvaScript Gym",
        description: "Some description",
        phone: "119999999",
        latitude: -8.1299101,
        longitude: -35.0153316,
      });

    expect(Response.statusCode).toEqual(201);
  });
});
