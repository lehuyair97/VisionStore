const Order = require("../../models/orderModel");
const Cart = require("../../models/cartModel");
const Notification = require("../../models/notificationModel");
const { handleEvent } = require("../../config/websocket");
const moment = require('moment')
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
      customerId: orderData.customerId,
    });
    await notification.save();

    const notis = await Notification.find({ customerId: orderData.customerId });
    if (notis.length > 0) {
      handleEvent("notification", notis);
    }

    res.status(200).json({ isSuccess: true, data: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Không thể tạo đơn hàng hoặc cập nhật giỏ hàng", error });
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
async function markAsCommented(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });

    order.hasCommented = true;
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
async function getOrdersByUserId(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.query;

    if (!id || !status) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "User ID & status is required" });
    }
    const orders = await Order.find({ customerId: id, status: status });
    res.status(200).json({ isSuccess: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ isSuccess: false, message: "Something went wrong" });
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
async function getRevenue(req, res) {
  try {
    const { type } = req.query;
    let matchStage = {};
    const today = moment();

    if (type === "day") {
      matchStage.createdAt = {
        $gte: today.startOf('day').toDate(),
        $lte: today.endOf('day').toDate(),
      };
    } else if (type === "month") {
      matchStage.createdAt = {
        $gte: today.startOf('month').toDate(),
        $lte: today.endOf('month').toDate(),
      };
    } else if (type === "year") {
      matchStage.createdAt = {
        $gte: today.startOf('year').toDate(),
        $lte: today.endOf('year').toDate(),
      };
    }

    const revenueData = await Order.aggregate([
      { $match: { ...matchStage, status: "delivered", createdAt: { $exists: true } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalBill" } } }
    ]);

    const totalRevenue = revenueData.length ? revenueData[0].totalRevenue : 0;

    res.status(200).json({ isSuccess: true, revenue: revenueData });
  } catch (error) {
    console.error("Error while calculating revenue: ", error);
    res.status(500).json({ error: "Không thể tính doanh thu. Lỗi: " + error.message });
  }
}



async function compareMonthlyRevenue(req, res) {
  try {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const currentMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: currentMonthStart,
            $lte: currentMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const previousMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonthStart,
            $lte: previousMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const result = {
      currentMonth: currentMonthRevenue[0] || { totalRevenue: 0, totalOrders: 0 },
      previousMonth: previousMonthRevenue[0] || { totalRevenue: 0, totalOrders: 0 },
    };

    res.status(200).json({ isSuccess: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Không thể tính doanh thu giữa các tháng" });
  }
}


module.exports = {
  createOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  getOrdersByUserId,
  markAsCommented,
  getRevenue,
  compareMonthlyRevenue,
};
