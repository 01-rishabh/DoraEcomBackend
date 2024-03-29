// routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId/add', cartController.addToCart);
router.post('/cart/:userId/remove', cartController.removeFromCart); // I think it should be put request so need to test it.

module.exports = router;
