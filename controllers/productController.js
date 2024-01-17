// controllers/productController.js
const Product = require('../models/Beverage');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    // Extracting product information from the request body
    const { productName,
      productPrice,
      averageRating,
      productImage,
      quantity,
      alcoholConcentration,
      beverageDescription } = req.body;

    // Creating a new Product instance
    const newProduct = new Product({
      productName,
    productPrice,
    averageRating,
    productImage,
    quantity,
    alcoholConcentration,
    beverageDescription
    });

    // Saving the new product to the database
    const savedProduct = await newProduct.save();

    // Sending the newly created product as a response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add more controller functions as needed

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  // Add more controller functions as needed
};
