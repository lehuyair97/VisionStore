import React from "react";
import { MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import AppBarCart from "../component/appbar_cart";
import ListCart from "../component/list_cart";
import TotalizeCart from "../component/totalize_cart";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Cart() {
  const navigation = useNavigation();
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={styles.container}>
      <AppBarCart />
      <ListCart />
      <View style={styles.totalizeContainer}>
        <TotalizeCart onPress={() => navigation.navigate("Payment" as never)} />
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