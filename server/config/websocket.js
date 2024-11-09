const http = require("http");
const socketIo = require("socket.io");

// Tạo server HTTP
const server = http.createServer();

// Tạo một Socket.io server
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả các domain kết nối, bạn có thể thay đổi theo yêu cầu bảo mật của mình
  },
});

// Lưu trữ các client kết nối
let clients = new Map();

// Kết nối sự kiện
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Lưu trữ client theo socket ID hoặc theo userId nếu có
  socket.on("register", (userId) => {
    if (userId) {
      clients.set(userId, socket);
      console.log(`Client ${userId} registered`);
    }
  });

  // Lắng nghe sự kiện "disconnect"
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    // Xóa client khỏi Map khi ngắt kết nối
    clients.forEach((value, key) => {
      if (value.id === socket.id) {
        clients.delete(key);
      }
    });
  });
});

// Function to broadcast messages to all connected clients
const broadcast = (data) => {
  io.emit("message", data); // Gửi tin nhắn tới tất cả client đã kết nối
};

// Function to send a message to a specific client by userId
const sendMessageToClient = (userId, data) => {
  const client = clients.get(userId);
  if (client) {
    client.emit("message", data); // Gửi tin nhắn tới client cụ thể
  }
};

// Function to handle broadcast for different statuses like voucher, comment, message
const handleEvent = (type, data) => {
  switch (type) {
    case "voucher":
      broadcastVoucherStatus(data);
      break;
    case "comment":
      broadcastCommentStatus(data);
      break;
    case "message":
      broadcastMessageStatus(data);
      break;
    default:
      console.log("Unknown event type");
  }
};

// Helper functions for broadcasting specific event statuses

const broadcastVoucherStatus = (data) => {
  console.log("Broadcasting voucher status:", data);
  io.emit("voucherStatus", data); // Gửi tin nhắn voucher tới tất cả client
};

const broadcastCommentStatus = (data) => {
  console.log("Broadcasting comment status:", data);
  io.emit("commentStatus", data); // Gửi tin nhắn comment tới tất cả client
};

const broadcastMessageStatus = (data) => {
  console.log("Broadcasting message status:", data);
  io.emit("messageStatus", data); // Gửi tin nhắn message tới tất cả client
};

// Function to send specific message to a client by userId and event type
const sendEventToClient = (userId, type, data) => {
  const client = clients.get(userId);
  if (client) {
    switch (type) {
      case "voucher":
        client.emit("voucherStatus", data);
        break;
      case "comment":
        client.emit("commentStatus", data);
        break;
      case "message":
        client.emit("messageStatus", data);
        break;
      default:
        console.log("Unknown event type");
    }
  }
};

// Bắt đầu lắng nghe server trên cổng 8080
server.listen(8080, () => {
  console.log("Server running on port 8080");
});

module.exports = { io, broadcast, sendMessageToClient, handleEvent, sendEventToClient };
