import { Block, MainContainer } from "@components";
import { RBSheetRef } from "@features/common/components/bottom-sheet";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { useAuth } from "@hooks/auth";
import { Cart } from "@hooks/common/use-get-cart";
import useProgressPayment from "@hooks/common/use-progress-payment";
import { ROUTES } from "@navigation/config/routes";
import { useRoute } from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { useRef, useState } from "react";
import UserInfo from "../component/address";
import Delivery from "../component/deliver-method";
import ItemProduct from "../component/item_product";
import Pay from "../component/pay";
import PaymentMethod from "../component/payment-method";
import PaymentDetails from "../component/payment_details";
import RowTow from "../component/row_tow";
import Vouchers from "../component/vouchers";
import { navigate } from "@navigation/config/navigation-service";
import { Alert } from "react-native";
import { deliveryMethods, paymentMethods } from "@utils/containts";
import useCreatePaymentOrderr from "@hooks/common/vnpay/use-create-payment-order";
import { ScrollView } from "react-native-gesture-handler";
const Payment = () => {
  const { createOrder } = useCreatePaymentOrderr();
  const route = useRoute();
  const { userInfo } = useAuth();
  const { usePay } = useProgressPayment();
  const refRBSheetVoucher = useRef<RBSheetRef>();
  const refRBSheetDelivery = useRef<RBSheetRef>();
  const refRBSheetPayment = useRef<RBSheetRef>();
  const [voucherSelected, setVoucherSelected] = useState<any>();
  const [deliveryMethodSelected, setDeliverMethodSelected] = useState<any>(
    deliveryMethods[0]
  );
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<any>(
    paymentMethods[0]
  );
  const { selectedProducts, totalPrice } = route.params as {
    selectedProducts: Cart[];
    carts: any;
    totalPrice: number;
  };
  const shippingCost = deliveryMethodSelected?.price ?? 0;
  const discount = voucherSelected
    ? (voucherSelected?.discount * totalPrice) / 100
    : 0;
  const finalTotal = totalPrice + shippingCost - discount;

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
  const handleOpenPaymentMethodSelected = () => {
    if (refRBSheetPayment?.current) {
      refRBSheetPayment?.current?.open();
    }
  };
  const handlePaymentMethodSelected = (item: any) => {
    setPaymentMethodSelected(item);
    if (refRBSheetPayment?.current) {
      refRBSheetPayment?.current?.close();
    }
  };
  const handlePayment = async () => {
    if (!userInfo?.addressSelected?.detail) {
      Alert.alert("Vui lòng cập nhật địa chỉ giao hàng");
      return;
    }
    if (!deliveryMethodSelected) {
      Alert.alert("Vui lòng chọn phương thức thanh toán ");
      return;
    }
    const order = {
      customerId: userInfo?._id,
      customerName: userInfo?.display_name,
      customerEmail: userInfo?.email,
      customerAddress: `${userInfo?.addressSelected?.detail} - ${userInfo?.addressSelected?.location}`,
      customerPhoneNumber: userInfo?.phoneNumber,
      option: {},
      paymentMethod: paymentMethodSelected?.method,
      deliveryMethod: deliveryMethodSelected,
      items: [...selectedProducts],
      orderDate: new Date().toISOString(),
      totalBill: finalTotal,
      status:
        paymentMethodSelected?.method === "VN-Pay" ? "shipping" : "pending",
    };
    const res = await usePay(order);
    if (res?.isSuccess) {
      if (paymentMethodSelected?.id === "001") {
        const paymentUrl = await createOrder({
          orderId: res?.data?._id,
          amount: finalTotal,
          language: "vn",
        });
        if (paymentUrl) {
          navigate("PaymentScreen", { paymentUrl, order: order });
          return;
        }
      }
      navigate(ROUTES.OrderSuccessfully);
    }
  };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <ScrollView style={{flex:1}}>
        <Block backgroundColor={"gray_profile"} flex={1}>
          <AppBarCustom
            title="Thanh toán"
            iconLeft
            titleCenter
            isBackground
            paddingHorizontal={20}
            paddingVertical={10}
          />
          {userInfo && <UserInfo userInfo={userInfo} />}
          <Block height={8} />
          <ItemProduct selectedProducts={selectedProducts} />
          <Block height={8} />
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

          <RowTow
            title="Phương thức thanh toán"
            iconType="materialIcons"
            icon="payment"
            title_method={paymentMethodSelected?.method}
            color_title_method={Colors.black}
            onPress={handleOpenPaymentMethodSelected}
          />

          <PaymentDetails
            totalProductPrice={totalPrice}
            shippingCost={shippingCost}
            discount={discount}
          />
          <Block m={"_10"} />
          <Block position={"absolute"} bottom={0} left={0} right={0}>
            <Pay finalTotal={finalTotal} onPress={handlePayment} />
          </Block>
        </Block>
        <Vouchers
          onVoucherSelected={handleVoucherSelected}
          refRBSheet={refRBSheetVoucher}
          height={500}
        />
        <Delivery
          setDeliverySelected={handleDeliverySelected}
          refRBSheet={refRBSheetDelivery}
          height={300}
        />
        <PaymentMethod
          paymentMethods={paymentMethods}
          setPaymentMethod={handlePaymentMethodSelected}
          refRBSheet={refRBSheetPayment}
          height={320}
        />
      </ScrollView>
    </MainContainer>
  );
};

export default Payment;
