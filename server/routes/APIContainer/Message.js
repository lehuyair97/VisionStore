const Message = require("../../models/messageModel");
const { broadcast, sendMessageToClient } = require("../../config/websocket");

// Gửi tin nhắn
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content, isAdmin } = req.body;
  try {
    const newMessage = new Message({ senderId, receiverId, content, isAdmin });
    await newMessage.save();

    // Nếu là admin, gửi tin nhắn đến tất cả client
    if (isAdmin) {
      broadcast("message", { type: "NEW_MESSAGE", message: newMessage });
    } else {
      // Gửi tin nhắn tới client cụ thể (receiverId)
      sendMessageToClient(receiverId, { type: "NEW_MESSAGE", message: newMessage });
    }

    // Xóa tin nhắn cũ hơn 7 ngày
    await cleanupOldMessages();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tin nhắn theo người dùng
exports.getMessagesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ createdAt: 1 }); // Sắp xếp theo thời gian tạo

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa tin nhắn theo ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật nội dung tin nhắn
exports.updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { content },
      { new: true } // Trả về tin nhắn đã được cập nhật
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $group: {
          _id: {
            clientId: "$receiverId", // hoặc "$senderId" nếu bạn muốn nhóm theo người gửi
          },
          messages: {
            $push: {
              _id: "$_id",
              senderId: "$senderId",
              receiverId: "$receiverId",
              content: "$content",
              createdAt: "$createdAt",
              isAdmin: "$isAdmin",
            },
          },
        },
      },
      {
        $sort: { "messages.createdAt": 1 } // Sắp xếp theo thời gian tạo của tin nhắn
      }
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa tin nhắn cũ hơn 7 ngày
const cleanupOldMessages = async () => {
  const MESSAGE_LIFETIME = 7 * 24 * 60 * 60 * 1000; // 7 ngày
  const cutoffDate = new Date(Date.now() - MESSAGE_LIFETIME);
  await Message.deleteMany({ createdAt: { $lt: cutoffDate } });
};
