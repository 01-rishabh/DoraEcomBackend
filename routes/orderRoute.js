// routes/products.js
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.get('/', OrdersController.OrderList);
router.get('/:id', OrdersController.OrderById);
router.post('/', OrdersController.createOrder);
router.put('/', OrdersController.OrderUpdate);
router.delete('/', OrdersController.OrderDelete)

// Add more routes as needed

module.exports = router;
