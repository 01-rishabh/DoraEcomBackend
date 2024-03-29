// ordersController
const Orders = require('../models/Orders');
const OrderItems = require('../models/OrderItems');

const OrderList = async (req, res) => {
    try{
        const ordersList = await Orders.find().populate('user', 'name').sort({'dateOrdered': -1});
        if(!ordersList){
            return res.status(500).json({success: false})
          }
          res.send(ordersList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const OrderById = async (req, res) => {
  try{
      const orders = await Orders.findById(req.params._id)
      .populate('user', 'name')
      .populate({path: 'orerItems', populate: 'product'});

      if(!orders){
          return res.status(500).json({success: false})
        }
        res.send(orders);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


const createOrder = async (req, res) => {
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

      const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalNumber = orderItem.product.price * orderItem.quantity;
        return totalNumber
    }))

    const totalNumber = totalPrices.reduce((a,b) => a +b , 0);

     
      let order = new Orders({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalNumber: totalNumber,
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

  const OrderUpdate = async (req, res) => {
    try{
      const order = await Orders.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {new: true}
      )
  
      if(!order){
        return res.status(400).send('Order was not found');
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  } 

  const OrderDelete = async (req, res) => {
    
      await Orders.findByIdAndRemove(req.params.id).then(async order => {
        if(order){
          await order.orderItems.map(async orderItem => {
            await OrderItems.findByIdAndRemove(orderItem).then
          })
          return res.status(200).json({success: true, message: 'the order'})
        } else {
          return res.status(404).json({success: false, message: "order not found"})
        }
      }).catch (error => {
        res.status(500).json({ error: error });
      }
      )
  } 

  const getCount = async (req, res) => {
    const orderCount = await Orders.countDocuments((count) => count)

    if(!orderCount){
      res.status(500).json({success : false})
    }

    res.send(orderCount);
}

const getMyOrders = async (req, res) => {
  const orders = await Orders.find({ user: req.user._id });
  res.status(200).json(orders);
};

module.exports = {
    OrderList,
    OrderById,
    createOrder,
  OrderUpdate,
  OrderDelete,
  getCount,
  getMyOrders

}