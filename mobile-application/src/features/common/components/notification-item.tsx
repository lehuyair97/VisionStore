import { localImages } from "@assets/icons/images";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


type NotificationItemProps = {
  title: string;         
  notificationText: string; 
  timeReceived: string;   
  isRead: boolean; 
  onPress: ()=>void         
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  notificationText,
  timeReceived,
  isRead,
  onPress
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: isRead ? "#fff" : "#FFEBEB" }, 
      ]}
    >
      <Image
        source={localImages().logo}
        style={styles.productImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.notificationText}>{notificationText}</Text>
        <Text style={styles.timeReceived}>{timeReceived}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,

    borderRadius: 10,

  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "#B71C1C",
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 16,
    color: "#4F4F4F",
    marginBottom: 4,
  },
  timeReceived: {
    fontSize: 12,
    color: "#888",
  },
});

export default NotificationItem;
