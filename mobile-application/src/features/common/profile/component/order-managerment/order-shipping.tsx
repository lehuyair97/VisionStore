import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EDGES, Helper } from "@utils/helper";
import { MainContainer } from "@components";
import Block from "@components/block";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { FlatList } from "react-native-gesture-handler";
import OrderDeliveryItem from "./order-delivery-item";
import useGetOrders from "@hooks/common/use-get-order";
import { useAuth } from "@hooks/auth";

export default function OrderShipping() {
  const { userInfo } = useAuth();
  const { data } = useGetOrders({ userId: userInfo?._id, status: "shipping" });
  return (
    <Block backgroundColor={"gray_profile"} flex={1}>
      <FlatList
        data={data?.data}
        keyExtractor={Helper.getKeyExtractor}
        renderItem={({ item }) => <OrderDeliveryItem order={item} />}
      />
    </Block>
  );
}