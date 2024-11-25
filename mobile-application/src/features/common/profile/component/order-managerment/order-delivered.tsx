import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EDGES, Helper } from "@utils/helper";
import { MainContainer } from "@components";
import Block from "@components/block";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { useAuth } from "@hooks/auth";
import useGetOrders from "@hooks/common/use-get-order";
import { FlatList } from "react-native-gesture-handler";
import OrderDeliveryItem from "./order-delivery-item";

export default function OrderDelivered() {
  const { userInfo } = useAuth();
  const { data } = useGetOrders({ userId: userInfo?._id, status: "delivered" });
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