const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/auth.routes");
const productRoutes = require("../routes/products.routes");

let token;

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

describe("Pruebas de productos", () => {

  beforeAll(async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: "produser", password: "123456" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "produser", password: "123456" });

    token = res.body.token;
  });

  test("Debe crear un producto", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", token)
      .send({
        name: "Laptop",
        price: 15000
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Laptop");
  });

  test("Debe obtener productos", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
