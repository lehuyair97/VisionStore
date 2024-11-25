import { Button } from "@components";
import Block from "@components/block";
import useCreatePaymentOrder from "@hooks/common/vnpay/use-create-payment-order";
import { navigate } from "@navigation/config/navigation-service";
import { StyleSheet } from "react-native";
import SearchAppBar from "./search-app-bar";
import CreateShippingOrder from "@features/common/profile/component/test-delivery";
export default function BuildAutomatic() {
  const { createOrder } = useCreatePaymentOrder();


  return (
    <Block flex={1} p={"_20"}>
      <SearchAppBar
        textPlaceHolder="Nhập giá tiền bạn muốn build"
        onValueChange={() => {}}
        textValue=""
        buttonTitle="Build"
      />
      <CreateShippingOrder />

      {/* <PayPalCheckout /> */}
    </Block>
  );
}

const styles = StyleSheet.create({});
