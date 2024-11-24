import { toast } from "@components";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import useCreateShippingOrder from "@hooks/common/express-delivery/use-create-shipping-order";
import CreateShippingOrder from "@features/common/profile/component/test-delivery";
const PaymentScreen = ({ route, navigation }) => {
  const { createShippingOrder, isLoading, isError, error } =
    useCreateShippingOrder();
  const { paymentUrl, order } = route.params;
  const [loading, setLoading] = useState(true);
  const itemProd = order.items.map((item) => {
    item.name = item.productName;
    return item;
  });
  const orderData = {
    payment_type_id: 2,
    note: "VisionStore",
    required_note: "KHONGCHOXEMHANG",
    from_name: "VisionStore",
    from_phone: "0819395502",
    from_address: "85 Đường 30, Phường Cát Lái, Quận 2, Hồ Chí Minh, Vietnam",
    from_ward_name: "Phường Cát Lái",
    from_district_name: "Quận 2",
    from_province_name: "HCM",
    return_phone: "0332190444",
    return_address: "39 NTT",
    return_district_id: null,
    return_ward_code: "",
    client_order_code: "",
    to_name: order?.customerName,
    to_phone: `0${order?.customerPhoneNumber}`,
    to_address: order?.customerAddress,
    to_ward_code: "20308",
    to_district_id: 1444,
    cod_amount: 200000,
    content: "Theo New York Times",
    weight: 200,
    length: 1,
    width: 19,
    height: 10,
    pick_station_id: 1444,
    deliver_station_id: null,
    insurance_value: 100000,
    service_id: 0,
    service_type_id: 2,
    coupon: null,
    pick_shift: [2],
    items: itemProd,
  };
  const createOrderShipping = async () => {
    try {
      const response = await createShippingOrder(orderData);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
    toast.success("Thanh toán thành công!");
    navigate(ROUTES.OrderSuccessfully);
    setLoading(false);
  };
  const handleWebViewNavigationStateChange = async (navState) => {
    const { url } = navState;
    if (url.includes("ResponseCode=00")) {
      createOrderShipping();
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppBarCustom
        title="VN-Pay"
        iconLeft
        titleCenter
        isBackground
        paddingHorizontal={20}
        paddingVertical={10}
      />
      {loading && <ActivityIndicator size="large" style={styles.loading} />}
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -20,
    marginLeft: -20,
  },
});

export default PaymentScreen;
