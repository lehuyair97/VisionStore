import { Block, Row } from "@components";
import Text from "@components/text";
import { Image, View } from "react-native";
import { Cart } from "@hooks/common/use-cart";
import { SCREEN_WIDTH } from "@utils/helper";

const RenderProduct = ({ item }: { item: any }) => {
  if (!item) {
    return <Text>Product information is not available</Text>;
  }

  return (
    <Block paddingVertical={"_10"}>
      <Row center flex={1}>
        <Image
          source={{ uri: item?.image }}
          style={{ width: 50, height: 50 }}
        />
        <Block m={"_10"} />
        <Block flex={1}>
          <Text color={"black"}>{item?.productName}</Text>
          <Row center between>
            <Text color={"black"} fontWeight={"600"}>
              Đơn giá: {item.price}
            </Text>
            <Text color={"black"} fontWeight={"600"}>
              Số lượng: {item.quantity}
            </Text>
          </Row>
          <Block m={"_3"} />
          <Text color={"black"} fontWeight={"600"}>
            {item.optionsMemory} - {item.optionsColor}
          </Text>
        </Block>
        <Block m={"_10"} />
      </Row>
    </Block>
  );
};

export default RenderProduct;
