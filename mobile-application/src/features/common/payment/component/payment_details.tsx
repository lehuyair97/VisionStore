import { Block, Icon, Row, Text } from "@components";
import Colors from "@theme/colors";
import TextRow from "./text_row";
import { Cart } from "@hooks/common/use-get-cart";

interface PaymentDetailsProps {
  totalProductPrice: number;
  shippingCost: number;
  discount: number;
}

const PaymentDetails = ({
  totalProductPrice,
  shippingCost,
  discount,
}: PaymentDetailsProps) => {
  const totalPrice = [
    {
      title: "Tổng tiền hàng",
      price: `${totalProductPrice.toLocaleString()} VNĐ`,
    },
    {
      title: "Tổng tiền vận chuyển",
      price: `${shippingCost.toLocaleString()} VNĐ`,
    },
    {
      title: "Tổng tiền giảm giá",
      price: `${discount.toLocaleString()} VNĐ`,
    },
  ];

  return (
    <Block
      backgroundColor={"container"}
      paddingHorizontal={"_20"}
      paddingVertical={"_25"}
    >
      <Row center>
        <Icon
          name="ticket"
          size={20}
          color={Colors.primary}
          type="fontAwesome"
        />
        <Block m={"_10"} />
        <Text fontSize={14} color={"black"} fontWeight={"bold"}>
          Chi tiết thanh toán
        </Text>
      </Row>
      <Block m={"_10"} />
      {totalPrice.map((item, index) => (
        <TextRow key={index} title={item.title} price={item.price} />
      ))}
    </Block>
  );
};

export default PaymentDetails;
