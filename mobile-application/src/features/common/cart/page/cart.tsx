import React, { useState, useEffect } from "react";
import { MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import AppBarCart from "../component/appbar_cart";
import ListCart from "../component/list_cart";
import TotalizeCart from "../component/totalize_cart";
import { StyleSheet, View, Alert } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import useCart from "@hooks/common/use-get-cart";
import { Block, Text } from "@components";

export default function Cart() {
  const { userInfo } = useAuth();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { data: carts, isLoading, error } = useCart(userInfo?._id);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll && carts) {
      setSelectedItems(carts?.carts.map((product) => product.productId));
    } else {
      setSelectedItems([]);
    }
  };
  useEffect(() => {
    const total = carts?.carts
      .filter((item) => selectedItems.includes(item?.productId))
      .reduce((temp, current) => temp + current?.quantity * current?.price, 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const handleNavigateToPayment = () => {
    const selectedProducts = carts?.carts?.filter((product) =>
      selectedItems.includes(product.productId)
    );
    if (selectedProducts == null || selectedProducts.length === 0) {
      Alert.alert("Thông báo", "Không có sản phẩm nào để thanh toán");
      return;
    }
    navigation.navigate("Payment", { selectedProducts, carts, totalPrice });
  };

  if (isLoading) {
    return (
      <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}>
        <Text>Loading...</Text>
      </MainContainer>
    );
  }

  if (!carts) {
    return (
      <Block flex={1} justifyContent={"center"} alignContent={"center"}>
        <Text color={"black"} textAlign={"center"}>
          {"Hiện bạn chưa có sản phẩm nào"}
        </Text>
      </Block>
    );
  }

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}>
      <AppBarCart />
      <ListCart
        carts={carts}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <View style={styles.totalizeContainer}>
        <TotalizeCart
          onPress={handleNavigateToPayment}
          isSelectedAll={selectedItems?.length === carts?.carts?.length}
          onSelectAll={handleSelectAll}
          totalPrice={totalPrice}
        />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
  },
  totalizeContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
