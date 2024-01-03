const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let app = express();

//Connect to MongoDb
mongoose.connect('mongodb://localhost:27017/restapi', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//Check for connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Defining the Schema
const productSchema = new mongoose.Schema({
    productId: Number,
    productName: String,
    productPrice: Number,
    averageRating: Number,
    productImage: String,
    quantity: String,
    alcoholConcentration: Number,
    beverageDescription: String
})

//Creating model based on the schema
const Customer = mongoose.model('Products', productSchema);

app.use(morgan('dev'));
app.use(cors());

//Middleware to parse JSON in request body
app.use(bodyParser.json())

// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');

// var app = express();
// const port = 4000;

// // Connection URI for MongoDB
// const uri = 'mongodb://localhost:27017';
// const dbName = 'restapi';

// // Create a new MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to MongoDB
// client.connect(err => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//   } else {
//     console.log('Connected to MongoDB');

//     // Set up Express routes and middleware here

//     // Start the Express server
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   }
// });

// // Use middleware
// app.use(morgan('dev'));
// app.use(cors());
// app.use(bodyParser.json());

// // Define the product schema
// const productSchema = {
//   productId: Number,
//   productName: String,
//   productPrice: Number,
//   averageRating: Number,
//   productImage: String,
//   quantity: String,
//   alcoholConcentration: Number,
//   beverageDescription: String,
// };


app.get('/', (req, res) => {
    res.json({
        message: 'This is the product list.'
    });
});

//addcustomer
app.post('/api/addCustomer', async (req, res) => {
    const {productId, productName, productPrice, averageRating, productImage, quantity, alcoholConcentration, beverageDescription} = req.body;
    const newProduct = new Customer({productId, productName, productPrice, averageRating, productImage, quantity, alcoholConcentration, beverageDescription});
    await newProduct.save();
    res.json(newProduct);
})



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});
