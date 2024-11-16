import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@hooks/auth";
import useGetNotificationsByUserId from "@hooks/common/use-get-notification-by-user-id";
import useWebSocket from "@hooks/common/use-web-socket-custom";

export const CommonContext = createContext<any>(undefined);

export const CommonProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const { data: notifcationsData } = useGetNotificationsByUserId(userInfo?._id);
  const [notifications, setNotifications] = useState([]);
  const { notifications: notiSocket } = useWebSocket();

  const [categoryIDSelected, setCategoryIDSelected] = useState("");

  const messageUnread = useMemo(() => {
    return notifications
      ? notifications.reduce((temp, current) => {
          if (!current?.isRead) {
            temp += 1;
          }
          return temp;
        }, 0)
      : 0;
  }, [notifications]);

  useEffect(() => {
    if (notifcationsData) {
      setNotifications(notifcationsData);
    }
  }, [notifcationsData]);

  useEffect(() => {
    if (notiSocket?.length !== 0) {
      setNotifications(notiSocket);
    }
  }, [notiSocket, notifications]);

  const value = useMemo(
    () => ({
      categoryIDSelected,
      setCategoryIDSelected,
      messageUnread,
      notifications,
    }),
    [categoryIDSelected, messageUnread, notifications]
  );

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};
