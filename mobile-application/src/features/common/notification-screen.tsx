import React, { useMemo } from "react";
import { FlatList } from "react-native";
import NotificationItem from "./components/notification-item";
import Block from "@components/block";
import { MainContainer } from "@components";
import AppBarCustom from "./home/component/appbar_custom";
import { EDGES } from "@utils/helper";
import useCommon from "@hooks/common/use-common";
import { useAuth } from "@hooks/auth";
import useMarkAsReadNotification from "@hooks/common/use-mark-as-read-notification";
import Text from "@components/text";
const NotificationScreen: React.FC = () => {
  const { userInfo } = useAuth();
  const { notifications } = useCommon();
  const { markAsRead } = useMarkAsReadNotification(userInfo?._id);
  const renderItem = ({ item }: { item: any }) => {
    const formattedDate = new Date(item.createdAt).toLocaleString();
    return (
      <NotificationItem
        title={item.title}
        notificationText={item.message}
        timeReceived={formattedDate}
        isRead={item.isRead}
        onPress={() => {
          if (!item.isRead) {
            markAsRead(item?._id);
          }
        }}
      />
    );
  };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block backgroundColor={"gray_profile"} flex={1}>
        <AppBarCustom
          title="Thông báo"
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />
        <Block flex={1}>
          {!notifications || notifications.length === 0 ? (
            <Block flex={1} justifyContent={"center"} alignItems={"center"}>
              <Text color={"red_400"} fontSize={16} fontWeight={"bold"}>
                Hiện tại bạn không có thông báo nào!
              </Text>
            </Block>
          ) : (
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          )}
        </Block>
      </Block>
    </MainContainer>
  );
};

export default NotificationScreen;
