// app.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/products'); // Update with your actual routes
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
//const cors = require('cors');
const bodyParser = require('body-parser');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


require('./config');

// Set up middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(authJwt());
app.use(errorHandler);


app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // or 'localhost:8888'
  res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
}); // sets headers before routes

// Using product routes
app.use('/products', productRoutes);

app.use('/users', userRoutes);

app.use('/orders', orderRoutes)


const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

