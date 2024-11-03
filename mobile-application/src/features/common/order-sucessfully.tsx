import React from "react";
import {
  Image,
  TouchableOpacity,
  ImageStyle,
} from "react-native";
import { ROUTES } from "@navigation/config/routes";
import { makeStyles } from "@theme";
import { Block, Text } from "@components";
import { navigate } from "@navigation/config/navigation-service";
const OrderSuccessfully = () => {
  const handleBackToHome = () => {
    navigate(ROUTES.Home);
  };
  const styles = useStyle();
  return (
    <Block style={styles.container}>
      <Image
        source={{
          uri: "https://img.icons8.com/color/96/000000/checked--v2.png",
        }}
        style={styles.successImage as ImageStyle}
      />
      <Text style={styles.message}>Đặt hàng thành công!</Text>
      <Text style={styles.subMessage}>
        Cảm ơn bạn đã mua sắm. Đơn hàng của bạn sẽ được xử lý sớm nhất.
      </Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <Text style={styles.backButtonText}>Quay về Trang Chủ</Text>
      </TouchableOpacity>
    </Block>
  );
};

const useStyle = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  successImage: {
    width: 96,
    height: 96,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
}));

export default OrderSuccessfully;
