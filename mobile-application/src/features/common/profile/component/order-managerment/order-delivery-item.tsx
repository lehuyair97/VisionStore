import { Block, Button, Row, Text } from "@components";
import useUpdateOrderStatus from "@hooks/common/use-update-order-status";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { Helper } from "@utils/helper";
import { FlatList, Image, StyleSheet } from "react-native";

const OrderDeliveryItem = ({ order }) => {
  const { updateStatus } = useUpdateOrderStatus(order._id);

  const handleCancleOrder = async () => {
    await updateStatus("canceled");
  };

  const handleConfirmDelivered = async () => {
    await updateStatus("delivered");
  };

  return (
    <Block flex={1} bg={"container"} p={"_15"} mb={"_3"}>
      {/* Order Info Section */}
      <Block style={styles.orderInfo}>
        <Text style={styles.orderId}>Mã đơn hàng: {order._id}</Text>
        <Row center between>
          <Text style={styles.date}>
            Ngày đặt: {new Date(order.orderDate)?.toLocaleDateString()}
          </Text>
          <Text style={styles.status}>Trạng thái: {order.status}</Text>
        </Row>
      </Block>

      {/* Item List Section */}
      <FlatList
        data={order.items}
        keyExtractor={Helper.getKeyExtractor}
        renderItem={({ item }: { item: any }) => (
          <Row center mb={"_15"} style={styles.itemRow}>
            <Image source={{ uri: item?.image }} style={styles.itemImage} />
            <Block style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
              <Text style={styles.itemPrice}>
                {item?.price?.toLocaleString()} đ
              </Text>
            </Block>
          </Row>
        )}
      />

      {/* Total Bill and Action Buttons Section */}
      <Row center between style={styles.footerRow}>
        <Text color={"black"} fontSize={15} fontWeight={"bold"}>
          Tổng hóa đơn: {order.totalBill?.toLocaleString()} đ
        </Text>
        {order?.status === "pending" && (
          <Button onPress={handleCancleOrder} label="Hủy" />
        )}
        {order?.status === "shipping" && (
          <Button onPress={handleConfirmDelivered} label="Đã nhận" />
        )}
        {order?.status === "delivered" && !order.hasCommented && (
          <Button
            onPress={() => navigate(ROUTES.ProductReview, { order: order })}
            label="Đánh giá"
          />
        )}
      </Row>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
  orderInfo: { marginBottom: 20 },
  orderId: { fontSize: 14, fontWeight: "bold", color: "black" },
  status: { fontSize: 16, color: "#FF6F00" },
  date: { fontSize: 14, color: "#666" },
  itemRow: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8, 
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between", 
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  footerRow: {
    marginTop: 20,
    padding: 10, 
  },
});

export default OrderDeliveryItem;
