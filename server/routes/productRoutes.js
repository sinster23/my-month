const express = require("express");
const router = express.Router();
const { getProducts, getProductById} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin route (optional for now)
// router.post("/", addProduct);

module.exports = router;
