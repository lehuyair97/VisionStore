import Block from "@components/block";
import { useAuth } from "@hooks/auth";
import useGetOrders from "@hooks/common/use-get-order";
import { Helper } from "@utils/helper";
import { FlatList } from "react-native-gesture-handler";
import OrderDeliveryItem from "./order-delivery-item";
export default function OrderCancle() {


  const { userInfo } = useAuth();
  const { data } = useGetOrders({ userId: userInfo?._id, status: "canceled" });
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