// const express =  require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// var app = express();

// //Connect to MongoDb
// mongoose.connect('mongodb://localhost:27017/restapi', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// //Check for connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// //Defining the Schema
// const customerSchema = new mongoose.Schema({
//     name: String,
//     mobile: String
// })

// //Creating model based on the schema
// const Customer = mongoose.model('Customer', customerSchema);

// //Middleware to parse JSON in request body
// app.use(bodyParser.json())

// //addcustomer
// app.post('/api/addCustomer', async (req, res) => {
//         const {name, mobile} = req.body;
//         const newCust = new Customer({name, mobile});
//         await newCust.save();
//         res.json(newCust);
// })

// //get all the Customers
// app.get('/api/getAll', async (req, res) => {
//     const cust = await Customer.find();
//     res.json(cust);
// })

// //get customers by id
// app.get('/api/customers/:id', async (req, res) => {
//     const cust = await Customer.findById(req.params.id);
//     res.json(cust);
// })

// //updating customer
// app.put('/api/customers/:id', async (req, res) => {
//     const {name, mobile} = req.body;
//     const updatedCust = await Customer.findByIdAndUpdate(
//         req.params.id,
//         { name, mobile },
//         { new: true }
//     );
//     res.json(updatedCust);
// })

// //delete
// app.delete('/api/deletecustomer/:id', async (req, res) => {
//     const {name, mobile} = req.body;
//     const deleteCust = await Customer.findByIdAndDelete(req.params.id)
//     res.json(deleteCust);
// })

// app.listen(3000, function (){
//     console.log('Example app listening on port 3000');
// })





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

//you are dash