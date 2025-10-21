const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');

router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getUserOrders);
router.get("/:orderId", authMiddleware, getOrderById);

module.exports = router;
