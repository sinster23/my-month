const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { getCart, addToCart, removeFromCart, clearCart, updateQuantity } = require("../controllers/cartController");

// All cart routes require auth
router.use(authMiddleware);

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart); 
router.delete("/clear", clearCart);
router.put('/update', updateQuantity);

module.exports = router;