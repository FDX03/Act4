const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/auth.routes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Pruebas de autenticación", () => {

  test("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Usuario registrado");
  });

  test("Debe iniciar sesión y devolver un token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "testuser",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});
