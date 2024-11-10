import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextProps {
  message: any;
  setMessage: React.Dispatch<React.SetStateAction<any>>;
  sendMessage: (data: any) => void;
  comment: any;
  setComment: React.Dispatch<React.SetStateAction<any>>;
  voucher: any;
  setVoucher: React.Dispatch<React.SetStateAction<any>>;
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined);

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<any>([]);
  const [comment, setComment] = useState<any>([]);
  const [voucher, setVoucher] = useState<any>([])
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("http://192.168.210.213:8080");

    socket.current.on("connect", () => {
      console.log("Web socket connected");
    });

    socket.current.on("messageStatus", (message) => {
      setMessage(message);
      console.log('here Message', message)

    });
    socket.current.on("commentStatus", (message)=>{
      setComment(message)
    })
    socket.current.on("voucherStatus", (message)=>{
      setVoucher(message)
      console.log('here voucher', message)
    })
    socket.current.on("disconnect", () => {
      console.log("Web socket disconnected");
    });

    socket.current.on("connect_error", (error) => {
      console.log("Socket connection error", error);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendMessage = (data: any) => {
    if (socket.current?.connected) {
      socket.current.emit("message", data);
    }
  };

  const value = useMemo(
    () => ({
      message,
      setMessage,
      sendMessage,
      comment,
      setComment,
      voucher,
      setVoucher
    }),
    [message, sendMessage]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
