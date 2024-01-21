// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware, productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/update/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteAProduct);
// Add more routes as needed

module.exports = router;
