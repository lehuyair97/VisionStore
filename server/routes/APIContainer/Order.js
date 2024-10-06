const orderModel = require("../../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOrderByID = async (req, res) => {
  try {
    const {id} = req.params; 
    const order = await orderModel.findById({_id:id});
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { customerId } = req.params; // Lấy userID từ request params
    const orders = await orderModel.find({ customerId: customerId });
    res.status(200).json({data:orders});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await orderModel.create(req.body); // Tạo đơn hàng từ dữ liệu trong request body
    res.status(201).json({data : newOrder}); // Trả về đơn hàng đã được tạo thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { _id } = req.params; // Lấy orderId từ request params
    const updatedOrder = await orderModel.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json(updatedOrder); // Trả về đơn hàng đã được cập nhật
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { _id } = req.params; // Lấy orderId từ request params
    const deletedOrder = await orderModel.findByIdAndDelete(_id);
    if (!deletedOrder) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json(deletedOrder); // Trả về đơn hàng đã được xóa
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
