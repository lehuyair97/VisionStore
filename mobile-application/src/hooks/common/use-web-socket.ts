import { useEffect, useRef, useState } from "react";
import useRootWebSocket from "./use-root-web-socket"; // Đảm bảo rằng đường dẫn đúng

// Hook cho loại tin nhắn Message
export const useMessageWebSocket = () => {
  const { messages, sendMessage } = useRootWebSocket();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const filteredMessages = messages.filter((msg) => msg.type === "message");
    setMessageList((prevMessages) => [...prevMessages, ...filteredMessages]);
  }, [messages]);

  return { messageList, sendMessage };
};

// Hook cho loại tin nhắn Voucher
export const useVoucherWebSocket = (url) => {
  const { messages, sendMessage } = useRootWebSocket();
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    const filteredMessages = messages.filter((msg) => msg.type === "voucher");
    setVoucherList((prevVouchers) => [...prevVouchers, ...filteredMessages]);
  }, [messages]);

  return { voucherList, sendMessage };
};

// Hook cho loại tin nhắn Chat
export const useChatWebSocket = (url) => {
  const { messages, sendMessage } = useRootWebSocket();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const filteredMessages = messages.filter((msg) => msg.type === "chat");
    setChatList((prevChats) => [...prevChats, ...filteredMessages]);
  }, [messages]);

  return { chatList, sendMessage };
};
