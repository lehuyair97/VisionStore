import React, { useState, useEffect } from "react";
import { MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import AppBarCart from "../component/appbar_cart";
import ListCart from "../component/list_cart";
import TotalizeCart from "../component/totalize_cart";
import { StyleSheet, View, Text, Alert } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

import useCart from "@hooks/common/use-cart";

export default function Cart() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { data: products, isLoading, error } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll && products) {
      setSelectedItems(products.map(product => product._id));
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    if (products) {
      const total = products
        .filter(product => selectedItems.includes(product._id))
        .reduce((sum, product) => sum + (product.carts[0].price || 0), 0);
      setTotalPrice(total);
    }
  }, [selectedItems, products]);

  const handleNavigateToPayment = () => {
    const selectedProducts = products.filter(product => selectedItems.includes(product._id));

    if (selectedProducts == null || selectedProducts.length === 0) {
      Alert.alert('Thông báo', 'Không có sản phẩm nào để thanh toán');
      return;
    }
    navigation.navigate("Payment", { selectedProducts });
  };

  if (isLoading) {
    return <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}><Text>Loading...</Text></MainContainer>;
  }

  if (error) {
    return <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}><Text>Error: {error.message}</Text></MainContainer>;
  }

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}>
      <AppBarCart />
      <ListCart products={products} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <View style={styles.totalizeContainer}>
        <TotalizeCart
          onPress={handleNavigateToPayment}
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});