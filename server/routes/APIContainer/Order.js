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
  const { customerId } = req.params;
  try {
    const orders = await orderModel.find({ customerId: customerId });
    res.status(200).json({ data: orders[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { customerId, carts, voucherID } = req.body;

  try {
    let existingOrder = await orderModel.findOne({
      customerId,
    });

    if (existingOrder) {
      carts.forEach((cartItem) => {
        const existingCartItem = existingOrder.carts.find(
          (item) => item.productId === cartItem.productId
        );

        if (existingCartItem) {
          existingCartItem.quantity += cartItem.quantity;
        } else {
          existingOrder.carts.push(cartItem);
        }
      });

      existingOrder.totalBill = existingOrder.carts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      existingOrder.markModified("carts");
      await existingOrder.save();

      res.status(200).json({ data: existingOrder });
    } else {
      const newOrder = await orderModel.create({
        ...req.body,
        carts,
        voucherID,
        totalBill: carts.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      });

      res.status(201).json({ data: newOrder });

      if (voucherID) {
        await voucherModel.findByIdAndDelete(voucherID);
      }
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
