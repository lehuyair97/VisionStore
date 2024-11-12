import { Block, MainContainer } from "@components";
import { RBSheetRef } from "@features/common/components/bottom-sheet";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { useAuth } from "@hooks/auth";
import { Cart } from "@hooks/common/use-get-cart";
import { useRoute } from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Address from "../component/address";
import ItemProduct from "../component/item_product";
import Pay from "../component/pay";
import PaymentDetails from "../component/payment_details";
import RowTow from "../component/row_tow";
import Vouchers from "../component/vouchers";
import Delivery from "../component/deliver-method";
const Payment = () => {
  const route = useRoute();
  const refRBSheetVoucher = useRef<RBSheetRef>();
  const refRBSheetDelivery = useRef<RBSheetRef>();
  const [voucherSelected, setVoucherSelected] = useState<any>();
  const [deliveryMethodSelected, setDeliverMethodSelected] = useState<any>();
  const { selectedProducts, carts, totalPrice } = route.params as {
    selectedProducts: Cart[];
    carts: any;
    totalPrice: number;
  };

  const handleOpenVouchers = () => {
    if (refRBSheetVoucher?.current) {
      refRBSheetVoucher?.current?.open();
    }
  };
  const handleVoucherSelected = (item: any) => {
    setVoucherSelected(item);
    if (refRBSheetVoucher?.current) {
      refRBSheetVoucher?.current?.close();
    }
  };

  const handleOpenDeliverySelected = () => {
    if (refRBSheetDelivery?.current) {
      refRBSheetDelivery?.current?.open();
    }
  };
  const handleDeliverySelected = (item: any) => {
    setDeliverMethodSelected(item);
    if (refRBSheetDelivery?.current) {
      refRBSheetDelivery?.current?.close();
    }
  };
  const shippingCost = deliveryMethodSelected?.price ?? 0;
  const discount = voucherSelected
    ? (voucherSelected?.discount * totalPrice) / 100
    : 0;
  const finalTotal = totalPrice + shippingCost - discount;

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block backgroundColor={"gray_profile"} flex={1}>
        <AppBarCustom
          title="Thanh toán"
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />
        <Block m={"_10"} />
        {selectedProducts.length > 0 && <Address address={carts} />}
        <Block m={"_10"} />
        <ItemProduct selectedProducts={selectedProducts} />
        <Block m={"_10"} />
        <RowTow
          title="Voucher"
          icon="ticket"
          title_method={voucherSelected?.title}
          onPress={handleOpenVouchers}
        />
        <RowTow
          title="Vận chuyển"
          iconType="materialIcons"
          icon="local-shipping"
          title_method={deliveryMethodSelected?.method}
          expectedDelivery={deliveryMethodSelected?.estimated_delivery_time}
          color_title_method={Colors.black}
          onPress={handleOpenDeliverySelected}
        />

        <PaymentDetails
          totalProductPrice={totalPrice}
          shippingCost={shippingCost}
          discount={discount}
          finalTotal={finalTotal}
        />
        <Block m={"_10"} />
        <View style={styles.totalizeContainer}>
          <Pay finalTotal={finalTotal} />
        </View>
      </Block>
      <Vouchers
        onVoucherSelected={(item) => handleVoucherSelected(item)}
        refRBSheet={refRBSheetVoucher}
        height={500}
      />
      <Delivery
        setDeliverySelected={(item) => handleDeliverySelected(item)}
        refRBSheet={refRBSheetDelivery}
        height={300}
      />
    </MainContainer>
  );
};

export default Payment;
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
    borderTopColor: "#ccc",
  },
});
