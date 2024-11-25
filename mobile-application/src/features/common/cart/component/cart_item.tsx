import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Row, Text } from "@components";
import Block from "@components/block";
import Colors from "@theme/colors";
import { Cart } from "@hooks/common/use-get-cart";
import CustomControllerNums from "@features/common/detail_product/custom-conntroler-nums";
import useQuantity from "@hooks/common/util/useQuantity";

interface CartItemProps {
  item: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image?: string;
    description?: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CartItem = ({ item, isSelected, onSelect }: CartItemProps) => {
  const { quantity, increaseQuantity, decreaseQuantity } = useQuantity({
    initialQuantity: item?.quantity,
  });
  if (!item) {
    return <Text>Product information is not available</Text>;
  }

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => onSelect(item.productId)}
        style={styles.checkbox}
      >
        <Icon
          type="fontAwesome"
          name={isSelected ? "check-square" : "square"}
          size={24}
          color={isSelected ? Colors.primary : Colors.text}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: item?.image }}
        style={[styles.image, { marginHorizontal: 10, marginRight: 20 }]}
      />
      <View style={styles.infoContainer}>
        <Text
          fontSize={16}
          fontWeight={"bold"}
          color="black2A"
          style={styles.name}
        >
          {item?.productName}
        </Text>
        <Text
          fontSize={14}
          fontWeight={"300"}
          color="black2A"
          style={styles.description}
        >
          {item?.description}
        </Text>
        <Row between mt={"_15"} center>
          <Text
            fontSize={14}
            fontWeight={"300"}
            color="black2A"
            style={styles.price}
          >
            {item?.price?.toLocaleString()} đ
          </Text>
          <CustomControllerNums
            fontSize={14}
            padding={6}
            widthButton={20}
            heightButton={20}
            width={120}
            quantity={item?.quantity}
            decreaseQuantity={() => decreaseQuantity(item?.productId, true)}
            increaseQuantity={() => increaseQuantity(item?.productId, true)}
          />
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 14,
    color: "red",
  },
});

export default CartItem;
