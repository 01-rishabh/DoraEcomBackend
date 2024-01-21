// app.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/products'); // Update with your actual routes
const userRoutes = require('./routes/userRoute');

require('./config');

// Set up middleware for parsing JSON
app.use(express.json());

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

// app.get('/', (req, res) => {
//   res.send('Welcome to the DoraEnterprises.');
// })

const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// BACKEND FLOW:
// Models --> Controllers --> Routes --> Driver (App.js)

//Shifted on new machine.