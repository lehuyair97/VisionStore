const Order = require("../../models/orderModel");
const Cart = require("../../models/cartModel");
const Notification = require("../../models/notificationModel");
const { handleEvent } = require("../../config/websocket");
const moment = require("moment");
async function createOrder(req, res) {
  const orderData = req.body;
  const { customerId, items } = orderData;

  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    let cart = await Cart.findOne({ customerId });

    if (!cart) {
      cart = new Cart({
        customerId,
        carts: [],
        totalBill: 0,
      });
    }

    const productIdsPaid = items.map((item) => item.productId);
    cart.carts = cart.carts.filter(
      (item) => !productIdsPaid.includes(item.productId)
    );

    cart.totalBill = cart.carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    const notificationMessage = `Đơn hàng của bạn (Mã đơn hàng: ${newOrder._id}) đã được tạo thành công. Chúng tôi sẽ xử lý ngay!`;
    const notification = new Notification({
      customerId: newOrder.customerId,
      type: "message",
      title: "Đặt hàng thành công!",
      message: notificationMessage,
      orderId: newOrder._id,
    });
    await notification.save();

    const notis = await Notification.find({ customerId });
    if (notis.length > 0) {
      handleEvent("notification", notis);
    }

    res.status(200).json({ isSuccess: true, data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Không thể tạo đơn hàng hoặc cập nhật giỏ hàng",
      details: error.message,
    });
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
    const todayStart = moment().startOf("day");
    const todayEnd = moment().endOf("day");

    if (type === "day") {
      matchStage.createdAt = {
        $gte: todayStart.toDate(),
        $lt: todayEnd.toDate(),
      };
    } else if (type === "month") {
      matchStage.createdAt = {
        $gte: todayStart.startOf("month").toDate(),
        $lte: todayStart.endOf("month").toDate(),
      };
    } else if (type === "year") {
      matchStage.createdAt = {
        $gte: todayStart.startOf("year").toDate(),
        $lte: todayStart.endOf("year").toDate(),
      };
    }

    const revenueData = await Order.aggregate([
      {
        $match: { ...matchStage, status: "delivered" },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: null, 
          totalRevenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] },
          },
          totalQuantity: { $sum: "$items.quantity" }, 
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const totalRevenue = revenueData.length ? revenueData[0].totalRevenue : 0;
    const totalQuantity = revenueData.length ? revenueData[0].totalQuantity : 0;
    const totalOrders = revenueData.length ? revenueData[0].totalOrders : 0;

    res.status(200).json({
      isSuccess: true,
      revenue: totalRevenue,
      quantityProducts: totalQuantity,
      totalOrders: totalOrders, 
    });
  } catch (error) {
    console.error("Error while calculating revenue: ", error);
    res.status(500).json({
      error: "Không thể tính doanh thu. Lỗi: " + error.message,
    });
  }
}


async function compareMonthlyRevenue(req, res) {
  try {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const previousMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const currentMonthRevenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: currentMonthStart,
            $lte: currentMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalBill" },
          totalOrders: { $sum: 1 },
          totalQuantity: { $sum: "$items.quantity" }, 
        },
      },
    ]);

    const previousMonthRevenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: previousMonthStart,
            $lte: previousMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalBill" },
          totalOrders: { $sum: 1 },
          totalQuantity: { $sum: "$items.quantity" }, 
        },
      },
    ]);

    const currentMonthData = currentMonthRevenue[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      totalQuantity: 0,
    };
    const previousMonthData = previousMonthRevenue[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      totalQuantity: 0,
    };

    const revenueGrowth = previousMonthData.totalRevenue
      ? ((currentMonthData.totalRevenue - previousMonthData.totalRevenue) / previousMonthData.totalRevenue) * 100
      : 0;

    const orderGrowth = previousMonthData.totalOrders
      ? ((currentMonthData.totalOrders - previousMonthData.totalOrders) / previousMonthData.totalOrders) * 100
      : 0;

    const quantityGrowth = previousMonthData.totalQuantity
      ? ((currentMonthData.totalQuantity - previousMonthData.totalQuantity) / previousMonthData.totalQuantity) * 100
      : 0;

    const result = {
      currentMonth: currentMonthData,
      previousMonth: previousMonthData,
      revenueGrowth: revenueGrowth.toFixed(2),
      orderGrowth: orderGrowth.toFixed(2),
      quantityGrowth: quantityGrowth.toFixed(2), 
    };

    res.status(200).json({ isSuccess: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Không thể tính doanh thu giữa các tháng" });
  }
}


async function getMonthlyRevenue(req, res) {
  try {
    const months = [];
    const currentDate = moment();

    for (let i = 0; i < 12; i++) {
      months.push(currentDate.clone().subtract(i, "months"));
    }

    const monthLabels = months.map(month => month.format("YYYY-MM"));
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $gte: months[11].startOf("month").toDate() }
        },
      },
      {
        $project: {
          yearMonth: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalBill: 1,
        },
      },
      {
        $group: {
          _id: "$yearMonth",
          totalRevenue: { $sum: "$totalBill" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ]);

    const result = monthLabels.map(month => {
      const monthData = monthlyRevenue.find(revenue => revenue._id === month);
      return {
        month,
        totalRevenue: monthData ? monthData.totalRevenue : 0,
        totalOrders: monthData ? monthData.totalOrders : 0,
      };
    });

    res.status(200).json({ isSuccess: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Không thể tính doanh thu hàng tháng" });
  }
}


async function getTop10MostPurchasedProducts(req, res) {
  try {
    console.log('here')

    const topProducts = await Order.aggregate([
      {
        $match: {
          status: "delivered", 
        },
      },
      { $unwind: "$items" }, 
      {
        $group: {
          _id: "$items.productId", 
          totalQuantity: { $sum: "$items.quantity" }, 
        },
      },
      {
        $sort: { totalQuantity: -1 }, 
      },
      {
        $limit: 10, 
      },
      {
        $lookup: {
          from: "products", 
          localField: "_id",
          foreignField: "_id", 
          as: "productDetails", 
        },
      },
      {
        $unwind: "$productDetails", 
      },
      {
        $project: {
          productId: "$_id", 
          productName: "$productDetails.name", 
          totalQuantity: 1, 
          totalRevenue: { $multiply: ["$totalQuantity", "$productDetails.price"] }, 
        },
      },
    ]);

    res.status(200).json({
      isSuccess: true,
      data: topProducts,
    });
  } catch (error) {
    console.error("Error while fetching top 10 products:", error);
    res.status(500).json({ error: "Không thể lấy thông tin sản phẩm bán chạy nhất" });
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
  getMonthlyRevenue,
  getTop10MostPurchasedProducts
};
