// components/CreateShippingOrder.tsx
import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import useCreateShippingOrder from "@hooks/common/express-delivery/use-create-shipping-order";
import useCancelShippingOrder from "@hooks/common/express-delivery/use-cancel-shipping-order";
import useGetCancleOrders from "@hooks/common/express-delivery/use-get-cancle-order";
const CreateShippingOrder = () => {
  const { createShippingOrder, isLoading, isError, error } =
    useCreateShippingOrder();
  const { getCancleOrders, data } = useGetCancleOrders();
  useEffect(() => {
    const fetch = async () => {
      const res = await getCancleOrders({
        from_cod_amount: 0,
        from_time: 1729530000,
        ignore_shop_id: false,
        is_cod_failed_collected: null,
        is_document_pod: null,
        is_print: null,
        is_search_exactly: false,
        limit: 100,
        offset: 0,
        payment_type_id: [1, 2, 4, 5],
        service_type_ids: [],
        shop_id: 5467966,
        shop_ids: null,
        source: "5sao",
        status: ["cancel"],
        to_cod_amount: 0,
        to_time: 1732208400,
      }).then((data) => {
        console.log(data?.data);
      });
    };
    fetch();
  }, []);
  const orderData = {
    payment_type_id: 2,
    note: "Tintest 123",
    required_note: "KHONGCHOXEMHANG",
    from_name: "TinTest124",
    from_phone: "0987654321",
    from_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
    from_ward_name: "Phường 14",
    from_district_name: "Quận 10",
    from_province_name: "HCM",
    return_phone: "0332190444",
    return_address: "39 NTT",
    return_district_id: null,
    return_ward_code: "",
    client_order_code: "",
    to_name: "TinTest124",
    to_phone: "0987654321",
    to_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
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
    items: [
      {
        name: "Áo Polo",
        code: "Polo123",
        quantity: 1,
        price: 200000,
        length: 12,
        width: 12,
        height: 12,
        weight: 1200,
        category: {
          level1: "Áo",
        },
      },
    ],
  };
  const handleCreateOrder = async () => {
    try {
      const response = await createShippingOrder(orderData);
      console.log("Đơn hàng đã được tạo thành công:", response);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Tạo Đơn Hàng</Text>

      <Button
        title="Tạo Đơn Hàng"
        onPress={handleCreateOrder}
        disabled={isLoading}
      />

      {isLoading && <ActivityIndicator size="large" />}
      {isError && <Text>Error: {error?.message}</Text>}
      <Button
        title="Hủy đơn hàng"
        onPress={handleCreateOrder}
        disabled={isLoading}
      />
    </View>
  );
};

export default CreateShippingOrder;
