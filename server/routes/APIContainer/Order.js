const orderModel = require("../../models/orderModel");
const voucherModel = require("../../models/voucherModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await orderModel.find({ customerId: customerId });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { voucherID } = req.body;
  try {
    const newOrder = await orderModel.create(req.body);
    res.status(201).json({ data: newOrder });
    if (voucherID) {
      await voucherModel.findByIdAndDelete(voucherID);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedOrder = await orderModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedOrder = await orderModel.findByIdAndDelete(_id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteOrdersByIds = async (req, res) => {
  try {
    const { ids } = req.body; 
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No order IDs provided" });
    }

    const result = await orderModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No orders found to delete" });
    }

    res.status(200).json({ message: `${result.deletedCount} orders deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
