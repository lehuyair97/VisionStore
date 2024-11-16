import { IconType } from "@assets/icons";
import { Icon } from "@components";
import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type PaymentItemProps = {
  icon: any;
  methodName: string;
  onPress: () => void;
  isSelected: boolean;
};

const PaymentItem: React.FC<PaymentItemProps> = ({
  icon,
  methodName,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && { borderColor: "red", borderWidth: 1 },
      ]}
      onPress={onPress}
    >
      <Icon type={icon?.type} name={icon?.name} color={"black"} size={24} />
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
    gap: 10,
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
