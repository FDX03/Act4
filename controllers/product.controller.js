const Product = require("../models/Product");
const Project = require("../models/project");

/* Crear producto dentro de un proyecto */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, project } = req.body;

    // Verificar que el proyecto exista y pertenezca al usuario
    const projectExists = await Project.findOne({
      _id: project,
      owner: req.user.id
    });

    if (!projectExists) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      project,
      owner: req.user.id
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

/* Obtener productos (opcionalmente por proyecto) */
exports.getProducts = async (req, res) => {
  try {
    const filter = { owner: req.user.id };

    if (req.query.project) {
      filter.project = req.query.project;
    }

    const products = await Product.find(filter).populate("project", "name");
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

/* Actualizar producto */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

/* Eliminar producto */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
