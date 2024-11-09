import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useRootWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    // Tạo kết nối với server qua socket.io
    socket.current = io("http://192.168.1.11:8080");

    socket.current.on("connect", () => {
      console.log("Socket connected");
      // Có thể thông báo cho người dùng rằng kết nối đã mở
    });

    socket.current.on("commentStatus", (message) => {
      try {
        // Kiểm tra loại tin nhắn hoặc các điều kiện khác nếu cần
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
      // Thông báo cho người dùng rằng kết nối đã ngắt
    });

    socket.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      // Xử lý lỗi kết nối nếu cần
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (data) => {
    if (socket.current.connected) {
      socket.current.emit("message", data);
    } else {
      console.error("Socket is not connected. Cannot send message.");
    }
  };

  return { messages, sendMessage };
};

export default useRootWebSocket;
