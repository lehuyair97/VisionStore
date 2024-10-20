const orderModel = require("../../models/orderModel");
const authenticateToken = require('../../middleware/authMiddleware');

exports.getAllOrders = authenticateToken(async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getOrderById = authenticateToken(async (req, res) => {
  try {
    const { id } = req.params; 
    const order = await orderModel.findById({_id: id});
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getOrdersByUserId = authenticateToken(async (req, res) => {
  try {
    const { customerId } = req.params; 
    const orders = await orderModel.find({ customerId: customerId });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.createOrder = authenticateToken(async (req, res) => {
  try {
    const newOrder = await orderModel.create(req.body); 
    res.status(201).json({ data: newOrder }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateOrderById = authenticateToken(async (req, res) => {
  try {
    const { _id } = req.params; 
    const updatedOrder = await orderModel.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteOrderById = authenticateToken(async (req, res) => {
  try {
    const { _id } = req.params; 
    const deletedOrder = await orderModel.findByIdAndDelete(_id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});