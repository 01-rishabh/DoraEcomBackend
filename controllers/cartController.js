// controllers/cartController.js
const Cart = require('../models/CartModel');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { items: { productId, quantity } } },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
