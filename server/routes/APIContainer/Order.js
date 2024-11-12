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
        const existingCartItem = existingOrder.carts.find((item) => {
          return item.productId === cartItem.productId;
        });

        if (existingCartItem) {
          existingCartItem.quantity += cartItem.quantity;
        } else {
          existingOrder.carts = [...existingOrder.carts, { ...cartItem }];
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { customerId, cart } = req.body;
  try {
    const order = await orderModel.findOne({ customerId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this customer" });
    }

    cart.forEach((cartItem) => {
      const orderCartItem = order.carts.find(
        (item) => item._id.toString() === cartItem._id
      );

      if (orderCartItem) {
        orderCartItem.paymentStatus =
          cartItem.status || orderCartItem.paymentStatus;
        if (cartItem.quantity) {
          orderCartItem.quantity = cartItem.quantity;
        }
      }
    });

    order.totalBill = order.carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    order.markModified('carts')
    await order.save();

    res
      .status(200)
      .json({ message: "Order updated successfully", data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderCartQuanlity = async (req, res) => {
  const { customerId, productId, action, quantity } = req.body;

  try {
    const order = await orderModel.findOne({ customerId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this customer" });
    }

    const orderCartItem = order.carts.find(
      (item) => item.productId.toString() === productId
    );

    if (orderCartItem) {
      if (action === "increase") {
        orderCartItem.quantity += quantity;
      } else if (action === "decrease") {
        orderCartItem.quantity -= quantity;

        if (orderCartItem.quantity <= 0) {
          order.carts = order.carts.filter(
            (item) => item.productId.toString() !== productId
          );
        }
      }
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    order.totalBill = order.carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    order.markModified('carts')
    await order.save();

    res
      .status(200)
      .json({ message: "Order cart updated successfully", data: order });
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
