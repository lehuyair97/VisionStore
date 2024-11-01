import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type PaymentItemProps = {
  icon: string;
  methodName: string;
  onPress: () => void;
};

const PaymentItem: React.FC<PaymentItemProps> = ({
  icon,
  methodName,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={styles.methodName}>{methodName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  methodName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default PaymentItem;
