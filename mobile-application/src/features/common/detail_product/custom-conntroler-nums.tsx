import { Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

interface CustomControllerNumsProps {
  width?: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  quantity: number;
  padding?: number;
  widthButton?: number;
  heightButton?: number;
  fontSize?: number;
}

const CustomControllerNums = ({
  width = 150,
  decreaseQuantity,
  increaseQuantity,
  quantity,
  padding = 10,
  widthButton = 30,
  heightButton = 30,
  fontSize = 16,
}: CustomControllerNumsProps) => {
  return (
    <Block
      width={width}
      backgroundColor="red_400"
      borderRadius={"_28"}
      style={{ padding: padding }}
    >
      <Row center between>
        <TouchableOpacity
          onPress={decreaseQuantity}
          style={[
            styles.quantityButton,
            { width: widthButton, height: heightButton },
          ]}
        >
          <Text fontSize={fontSize} fontWeight={"bold"} color="black2A">
            -
          </Text>
        </TouchableOpacity>
        <Text fontSize={fontSize} fontWeight={"bold"} color="black2A">
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={increaseQuantity}
          style={[
            styles.quantityButton,
            { width: widthButton, height: heightButton },
          ]}
        >
          <Text fontSize={fontSize} fontWeight={"bold"} color="black2A">
            +
          </Text>
        </TouchableOpacity>
      </Row>
    </Block>
  );
};

const styles = StyleSheet.create({
  quantityButton: {
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default CustomControllerNums;
