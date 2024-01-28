// ordersController
const Orders = require('../models/Orders');
const OrderItems = require('../models/OrderItems');

const OrderList = async (req, res) => {
    try{
        const ordersList = await Orders.find();
        if(!ordersList){
            return res.status(500).json({success: false})
          }
          res.send(ordersList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const createProduct = async (req, res) => {
    try {
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
            let newOrderItem = new OrderItems({
                quantity: orderItem.quantity,
                product: orderItem.product
            })
    
            newOrderItem = await newOrderItem.save();
    
            return newOrderItem._id;
        }))
        const orderItemsIdsResolved =  await orderItemsIds;
      // Extracting order information from the request body
      let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
  
      // Saving the new order to the database
      order = await order.save();

        if(!order){
           return res.status(400).send('The order cannot be created.');
        }
      // Sending the newly created order as a response
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    OrderList,
    createProduct
}