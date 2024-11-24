import Block from "@components/block";
import { StyleSheet } from "react-native";
import useGetOrders from "@hooks/common/use-get-order";
import { useAuth } from "@hooks/auth";
import { FlatList } from "react-native-gesture-handler";
import { Helper } from "@utils/helper";
import OrderDeliveryItem from "./order-delivery-item";
export default function OrderPending() {
  const { userInfo } = useAuth();
  const { data } = useGetOrders({ userId: userInfo?._id, status: "pending" });
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
