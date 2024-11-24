import useCalculateShippingFee from "@hooks/common/express-delivery/use-caculate-shipping-fee";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ShippingFeeCalculator = () => {
  const { calculateShippingFee, isLoading, isError, error } =
    useCalculateShippingFee();
  const [shippingData, setShippingData] = useState(null);

  const handleCalculateFee = async () => {
    const payload = {
      from_district_id: 1948,
      to_district_id: 2039,
      to_ward_code:'370408',
      service_id:53330,
      weight: 500,
      length: 200,
      width: 150,
      height: 100,
    };

    try {
      const data = await calculateShippingFee(payload);
      setShippingData(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isLoading ? "Đang tính toán..." : "Tính phí vận chuyển"}
        onPress={handleCalculateFee}
        disabled={isLoading}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinner}
        />
      )}
      {isError && <Text style={styles.error}>Lỗi: {error?.message}</Text>}
      {shippingData && (
        <Text style={styles.result}>
          Phí vận chuyển: {shippingData.data.total_fee} VNĐ
        </Text>
      )}
    </View>
  );
};

export default ShippingFeeCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  spinner: {
    marginTop: 16,
  },
  error: {
    color: "red",
    marginTop: 16,
    fontSize: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
