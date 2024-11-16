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

let clients = new Map();

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("register", (userId) => {
    if (userId) {
      clients.set(userId, socket);
      console.log(`Client ${userId} registered`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    clients.forEach((value, key) => {
      if (value.id === socket.id) {
        clients.delete(key);
      }
    });
  });
});

const broadcast = (data) => {
  io.emit("message", data);
};

const sendMessageToClient = (userId, data) => {
  const client = clients.get(userId);
  if (client) {
    client.emit("message", data);
  }
};

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
    case "notification":
      broadcastNotificationStatus(data);
      break;
    default:
      console.log("Unknown event type");
  }
};

const broadcastVoucherStatus = (data) => {
  io.emit("voucherStatus", data);
};

const broadcastCommentStatus = (data) => {
  io.emit("commentStatus", data);
};

const broadcastMessageStatus = (data) => {
  io.emit("messageStatus", data);
};

const broadcastNotificationStatus = (data) => {
  io.emit("notificationStatus", data);
};


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

server.listen(8080, () => {
  console.log("Server running on port 8080");
});

module.exports = {
  io,
  broadcast,
  sendMessageToClient,
  handleEvent,
  sendEventToClient,
};
