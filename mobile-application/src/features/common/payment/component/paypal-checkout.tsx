import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import WebView from "react-native-webview";
import { encode as base64Encode } from "base-64"; // Import thư viện base-64
import { CLIENT_ID, CLIENT_SECRET } from "@utils/paypal-api";
import Block from "@components/block";

const PayPalCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState<string | null>(null);

  const createOrder = async () => {
    setLoading(true);

    try {
      const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
      const base64Credentials = base64Encode(credentials);

      const tokenResponse = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        "grant_type=client_credentials", 
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Tạo đơn hàng trên PayPal
      const orderResponse = await axios.post(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "10.00",
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
   
      const approveUrl = orderResponse.data.links.find(
        (link: any) => link.rel === "approve"
      ).href;
      console.log("Approve URL:", approveUrl);
      setPaypalUrl(approveUrl);
    } catch (err: any) {
      console.error("Error creating order:", err?.response?.data);
      Alert.alert("Lỗi", "Không thể tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!paypalUrl && (
        <Button title="Thanh toán với PayPal" onPress={createOrder} />
      )}
      <Block width={'100%'} height={500} backgroundColor={'red_400'}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: paypalUrl || 'https://google.com'}}
          onNavigationStateChange={(state) => {
            if (state.url.includes("returnUrl")) {
              Alert.alert("Thông báo", "Thanh toán thành công!");
              setPaypalUrl(null);
            }
            if (state.url.includes("cancelUrl")) {
              Alert.alert("Thông báo", "Thanh toán bị hủy!");
              setPaypalUrl(null);
            }
          }}
        />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default PayPalCheckout;
