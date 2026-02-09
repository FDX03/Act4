const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* RUTAS */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/products", productRoutes);

/* DB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

module.exports = app;
