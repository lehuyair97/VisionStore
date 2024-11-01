import { Block, Row } from "@components";
import Text from "@components/text";
import { Image } from "react-native";

const ProductItem = ({ item }: { item: any }) => {
  return (
    <Block paddingVertical={"_10"}>
      <Row between center>
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
        <Block m={"_10"} />
        <Block>
          <Text color={"black"}>{item.name}</Text>
          <Block m={"_3"} />
          <Text color={"black"} fontWeight={"600"}>
            {item.capacity} - {item.speed}
          </Text>
        </Block>
        <Block m={"_10"} />
      </Row>
    </Block>
  );
};

export default ProductItem;
