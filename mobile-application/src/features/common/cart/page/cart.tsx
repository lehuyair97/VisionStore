import React, { useState, useEffect } from "react";
import { Icon, MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import AppBarCart from "../component/appbar_cart";
import ListCart from "../component/list_cart";
import TotalizeCart from "../component/totalize_cart";
import { StyleSheet, View, Text, Alert } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import useCart from "@hooks/common/use-cart";
import useOrdersDelete from "@hooks/common/use-orders-delete";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import Colors from "@theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Cart() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { data: products, isLoading, error, refetch } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalPrices, setTotalPrices] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { mutate: deleteOrders, isPending: isDeleting } = useOrdersDelete();

  const handleSelectAll = (selectAll: boolean) => {
    setSelectedItems(selectAll && products ? products.map(product => product._id) : []);
  };

  const handleUpdateTotalPrice = (id: string, price: number) => {
    setTotalPrices(prev => ({ ...prev, [id]: price }));
  };

  useEffect(() => {
    const total = selectedItems.reduce((sum, id) => sum + (totalPrices[id] || 0), 0);
    setTotalPrice(total);
  }, [selectedItems, totalPrices]);

  const handleNavigateToPayment = () => {
    const selectedProducts = products.filter(product => selectedItems.includes(product._id))
    .map(product => ({
      ...product,
      totalBill: totalPrice,
    }));

    if (!selectedProducts.length) {
      Alert.alert('Thông báo', 'Không có sản phẩm nào để thanh toán');
      return;
    }
    navigation.navigate("Payment", { selectedProducts });
  };

  const handleDeleteSelectedOrders = () => {
    if (!selectedItems.length) {
      Alert.alert('Thông báo', 'Không có sản phẩm nào để xóa');
      return;
    }

    deleteOrders(selectedItems, {
      onSuccess: () => {
        Alert.alert('Thông báo', 'Đã xóa thành công');
        setSelectedItems([]);
        refetch();
      },
      onError: (error) => {
        Alert.alert('Lỗi', `Không thể xóa đơn hàng: ${error.message}`);
      },
    });
  };

  if (isLoading) {
    return <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}><Text>Loading...</Text></MainContainer>;
  }

  if (error) {
    return <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}><Text>Error: {error.message}</Text></MainContainer>;
  }

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}>
      <AppBarCustom paddingTop={10} title="Giỏ hàng" titleStyle={{fontSize: 16, color: Colors.primary, fontWeight: "bold"}} paddingHorizontal={20} paddingVertical={20} 
      childrenRight={
        selectedItems.length > 0 &&
        <TouchableOpacity onPress={handleDeleteSelectedOrders}>
          <Icon type="fontAwesome" name="trash" size={20} color={Colors.primary} />
        </TouchableOpacity>
      }
      />
      <ListCart
        products={products}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onUpdateTotalPrice={handleUpdateTotalPrice}
      />
      
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