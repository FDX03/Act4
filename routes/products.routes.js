const express = require("express");
const auth = require("../middleware/auth");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const router = express.Router();

/* Crear producto */
router.post("/", auth, createProduct);

/* Obtener todos los productos del usuario autenticado */
router.get("/", auth, getProducts);

/* Actualizar producto por ID */
router.put("/:id", auth, updateProduct);

/* Eliminar producto por ID */
router.delete("/:id", auth, deleteProduct);

module.exports = router;
