import { useEffect, useRef, useState } from "react";

const useRootWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Tạo kết nối WebSocket
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      // Có thể thông báo cho người dùng rằng kết nối đã mở
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        // Kiểm tra loại tin nhắn hoặc các điều kiện khác nếu cần
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      // Thông báo cho người dùng rằng kết nối đã ngắt
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Xử lý lỗi kết nối nếu cần
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (data) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  return { messages, sendMessage };
};

export default useRootWebSocket;
