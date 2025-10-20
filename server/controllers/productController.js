const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET a single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD product (for admin — optional)
// exports.addProduct = async (req, res) => {
//   try {
//     const { name, description, price, image, category, stock } = req.body;
//     const newProduct = new Product({ name, description, price, image, category, stock });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to add product" });
//   }
// };
