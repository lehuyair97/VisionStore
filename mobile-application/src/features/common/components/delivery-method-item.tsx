import { Row, Text } from "@components";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

type DeliveryMethodItemProps = {
  price: number;
  methodName: string;
  onPress: () => void;
  orginalPrice?: number;
  expectedDelivery: string;
};

const DeliveryMethodItem: React.FC<DeliveryMethodItemProps> = ({
  price,
  orginalPrice,
  methodName,
  onPress,
  expectedDelivery,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fef2f2",
        paddingVertical: 15,
        marginBottom: 10,
      }}
    >
      <Row center between marginHorizontal={"_20"}>
        <Text color={"black"} fontWeight={"bold"} fontSize={16}>
          {methodName}
        </Text>
        <Row>
          {orginalPrice && (
            <Text textDecorationLine={"line-through"} color={"gray136"}>
              {orginalPrice}
            </Text>
          )}
          <Text color={"gray136"}>
            Phí giao hàng:{" "}
            <Text color={"black"} fontWeight={"bold"}>
              {price}
            </Text>
          </Text>
        </Row>
      </Row>
      <Text mx={"_20"} color={"red_500"}>
        Thời gian dự kiến: {expectedDelivery}
      </Text>
    </TouchableOpacity>
  );
};

export default DeliveryMethodItem;
