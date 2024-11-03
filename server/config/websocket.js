const WebSocket = require("ws");
const Message = require("./../models/messageModel"); // Mô hình Message MongoDB

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // Lưu trữ client theo userId

wss.on("connection", (ws, req) => {
  const userId = req.url.split("?userId=")[1]; // Lấy userId từ query string
  if (!userId) {
    console.error("User ID not found");
    ws.close(); // Ngắt kết nối nếu không có userId
    return;
  }

  console.log(`New client connected: ${userId}`);
  clients.set(userId, ws); // Lưu trữ client theo userId

  // Gửi lịch sử tin nhắn khi kết nối
  sendMessageHistory(userId, ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const { type, payload } = data;

    switch (type) {
      case "chat":
        handleChatEvent(userId, payload);
        break;
      case "voucher":
        handleVoucherEvent(userId, payload);
        break;
      case "comment":
        handleCommentEvent(userId, payload);
        break;
      default:
        console.log("Unknown event type:", type);
    }
  });

  ws.on("close", () => {
    console.log(`Client disconnected: ${userId}`);
    clients.delete(userId); // Xóa client khi ngắt kết nối
  });
});

// Gửi lịch sử tin nhắn từ MongoDB
const sendMessageHistory = async (userId, ws) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ createdAt: 1 }); // Sắp xếp theo thời gian tạo

    ws.send(JSON.stringify({ type: "history", messages }));
  } catch (error) {
    console.error("Error fetching message history:", error);
  }
};

// Hàm xử lý sự kiện chat
const handleChatEvent = async (userId, payload) => {
  const { receiverId, message, isAdmin } = payload;
  if (!message) {
    console.error("Message is required");
    return;
  }

  const newMessage = new Message({ senderId: userId, receiverId, content: message, isAdmin });

  try {
    // Lưu tin nhắn vào MongoDB
    await newMessage.save();

    if (isAdmin) {
      // Nếu là admin, gửi tin nhắn đến tất cả client
      broadcast("message", { type: "NEW_MESSAGE", message: newMessage });
    } else {
      // Gửi tin nhắn tới client cụ thể (receiverId)
      sendMessageToClient(receiverId, { type: "NEW_MESSAGE", message: newMessage });
    }

    // Xóa tin nhắn cũ
    await cleanupOldMessages();
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

// Hàm xử lý sự kiện voucher
const handleVoucherEvent = (userId, payload) => {
  // Logic xử lý voucher
  const { voucher } = payload;
  broadcast("voucher", { userId, voucher });
};

// Hàm xử lý sự kiện comment
const handleCommentEvent = (userId, payload) => {
  // Logic xử lý comment
  const { comment } = payload;
  broadcast("comment", { userId, comment });
};

// Hàm broadcast cho tất cả client
const broadcast = (type, payload) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, payload }));
    }
  });
};

// Gửi tin nhắn đến một client cụ thể
function sendMessageToClient(clientId, message) {
  const client = clients.get(clientId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
}

// Xuất các hàm và đối tượng cần thiết
module.exports = { wss, broadcast, sendMessageToClient };
