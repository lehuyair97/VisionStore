import { WebSocketContext } from "@context/web-socket-context";
import { useContext } from "react";

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw "Use must used within an WebSocketProvider ";
  }
  return context
};
export default useWebSocket
