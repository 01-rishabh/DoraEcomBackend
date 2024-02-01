// routes/products.js
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.get('/', OrdersController.OrderList);
router.post('/', OrdersController.createOrder);

// Add more routes as needed

module.exports = router;
