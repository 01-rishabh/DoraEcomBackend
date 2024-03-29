// controllers/productController.js
const Product = require('../models/Beverage');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if(!products){
      res.status(500).json({success: false})
    }

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
      volume,
      stock,
      alcoholConcentration,
      beverageDescription, 
      beverageCategory, 
      beverageBrand } = req.body;

    // Creating a new Product instance
    const newProduct = new Product({
      productName,
    productPrice,
    averageRating,
    productImage,
    volume,
    stock,
    alcoholConcentration,
    beverageDescription,
    beverageCategory, 
    beverageBrand
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

// controllers/productController.js
// ... (existing code)

const updateProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    // Find the product by ID in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract the updated information from the request body
    const { productName,
      productPrice,
      averageRating,
      productImage,
      volume,
      stock,
      alcoholConcentration,
      beverageDescription,
      beverageCategory, 
      beverageBrand } = req.body;

    // Update the product properties
    let updatedProduct = await Product.findByIdAndUpdate(productId, {
      productName,
      productPrice,
      averageRating,
      productImage,
      volume,
      stock,
      alcoholConcentration,
      beverageDescription,
      beverageCategory, 
      beverageBrand
    },{
      new: true
    })
    // product.name = productName || product.name;
    // product.price = productPrice || product.price;
    // product.averageRating = averageRating || product.averageRating;
    // product.productImage = productImage || product.productImage;
    // product.volume = volume || product.volume;
    // product.stock = stock || product.stock;
    // product.alcoholConcentration = alcoholConcentration || product.alcoholConcentration;
    // product.description = beverageDescription || product.description;
    // product.beverageCategory = beverageCategory || product.beverageCategory;
    // product.beverageBrand = beverageBrand || product.beverageBrand;

    // Save the updated product to the database
    updatedProduct = await updatedProduct.save();

    // Send the updated product as a response
    res.status(201);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.deleteOne({productId}).then(product => {
    if(product){
      return res.status(200).json({success: true, message: 'the product has been deleted.'})
    } else {
      return res.status(404).json({success: false, message: 'the product has been not found.'})
    }
  }).catch(err => {
    return res.status(400).json({success: false, error: err})
  })
} 

const getCount = async (req, res) => {
      const productCount = await Product.countDocuments((count) => count)

      if(!productCount){
        res.status(500).json({success : false})
      }

      res.send(productCount);
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteAProduct,
  getCount
};
