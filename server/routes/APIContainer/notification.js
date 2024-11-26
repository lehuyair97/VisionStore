const { handleEvent } = require("../../config/websocket");
const Notification = require("../../models/notificationModel");

exports.createNotification = async (req, res) => {
  try {
    const { userId, orderId, type, title, message } = req.body;
    const newNotification = new Notification({
      userId,
      orderId,
      type,
      title,
      message,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const notifications = await Notification.find()
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .populate("userId", "username avatar");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20, page = 1 } = req.query;
    const notifications = await Notification.find({ customerId: userId })
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .populate("customerId", "username avatar")
      .sort({ createdAt: -1 });
    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const {customerId} = req.body
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    const notifications = await Notification.find({customerId: customerId}).sort({ createdAt: -1 });
    handleEvent("notification", notifications);

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
