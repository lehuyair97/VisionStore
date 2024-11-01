import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type NotificationItemProps = {
  productImage: string; 
  notificationText: string; 
  timeReceived: string; 
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  productImage,
  notificationText,
  timeReceived,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{notificationText}</Text>
        <Text style={styles.timeReceived}>{timeReceived}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  notificationText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  timeReceived: {
    fontSize: 12,
    color: "#888",
  },
});

export default NotificationItem;
