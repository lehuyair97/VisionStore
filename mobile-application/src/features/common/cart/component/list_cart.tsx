import React, { useState } from "react";
import { FlatList } from "react-native";
import CartItem from "./cart_item";
import { Cart } from "@hooks/common/use-get-cart";
import Text from "@components/text";
import useQuantity from "@hooks/common/util/useQuantity";

interface ListCartProps {
  carts: any;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const ListCart = ({
  carts,
  selectedItems,
  setSelectedItems,
}: ListCartProps) => {
  const toggleSelect = (id: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected?.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <FlatList
      data={carts?.carts}
      keyExtractor={(item) => item._id || Math.random().toString()}
      contentContainerStyle={{ marginHorizontal: 20 }}
      style={{ marginBottom: 100 }}
      renderItem={({ item }) => {
        if (!item) {
          return <Text color={"red_400"}>No carts available</Text>;
        }
        return (
          <CartItem
            item={item}
            isSelected={selectedItems?.includes(item.productId)}
            onSelect={toggleSelect}
          />
        );
      }}
    />
  );
};

export default ListCart;
