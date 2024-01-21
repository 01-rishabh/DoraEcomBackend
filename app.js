// app.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/products'); // Update with your actual routes

require('./config');



// Set up middleware for parsing JSON
app.use(express.json());

// Use your product routes (update with your actual routes)
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
