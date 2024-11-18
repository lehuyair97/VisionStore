const Order = require("../../models/orderModel");
const Cart = require("../../models/cartModel");
const Notification = require("../../models/notificationModel");
const { handleEvent } = require("../../config/websocket");

async function createOrder(req, res) {
  const orderData = req.body;
  const { customerId, items } = orderData;
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();

    const cart = await Cart.findOne({ customerId });
    if (cart) {
      const productIdsPaid = items.map((item) => item.productId);
      cart.carts = cart.carts.filter(
        (item) => !productIdsPaid.includes(item.productId)
      );
      cart.totalBill = cart.carts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      await cart.save();
    } else {
      return res.status(400).json({ error: "Giỏ hàng không tồn tại" });
    }

    const notificationMessage = `Đơn hàng của bạn (Mã đơn hàng: ${newOrder._id}) đã được tạo thành công. Chúng tôi sẽ xử lý ngay!`;
    const notification = new Notification({
      customerId: newOrder.customerId,
      type: "message",
      title: "Đặt hàng thành công!",
      message: notificationMessage,
      orderId: newOrder._id,
      customerId: orderData.customerId
    });
    await notification.save();

    const notis = await Notification.find({ customerId: orderData.customerId });
    if (notis.length > 0) {
      handleEvent("notification", notis);
    }

    res.status(200).json({ isSuccess: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Không thể tạo đơn hàng hoặc cập nhật giỏ hàng" });
  }
}


async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Đơn hàng đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa đơn hàng" });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });

    order.status = status;
    await order.save();
    res.status(200).json({ isSuccess: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật trạng thái đơn hàng" });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách đơn hàng" });
  }
}

async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy thông tin đơn hàng" });
  }
}

async function getOrdersByStatus(req, res) {
  const { status } = req.params;
  try {
    const orders = await Order.find({ "carts.paymentStatus": status });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy đơn hàng theo trạng thái" });
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
};
