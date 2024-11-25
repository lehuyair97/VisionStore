import { Button, Row, Text } from "@components"; // Giữ nguyên import này
import Block from "@components/block"; // Giữ nguyên import này
import Colors from "@theme/colors"; // Giữ nguyên import này
import { TouchableOpacity } from "react-native-gesture-handler";

const Pay = ({
  finalTotal,
  onPress,
}: {
  finalTotal: number;
  onPress: () => void;
}) => {
  return (
    <Block alignItems={"flex-end"}>
      <Row center>
        <Block
          paddingRight={"_10"}
          height={80}
          backgroundColor={"background_fit_finder"}
          flex={1}
          alignItems={"flex-end"}
        >
          <Block m={"_10"} />
          <Text fontSize={14} color={"black"} fontWeight={"bold"}>
            Thanh toán
          </Text>
          <Block m={"_3"} />
          <Text fontSize={14} color={"primary"} fontWeight={"normal"}>
            {finalTotal.toLocaleString()} VNĐ
          </Text>
        </Block>
        <Button
          buttonStyle={{
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 0,
          }}
          label="Thanh toán"
          onPress={onPress}
        />
      </Row>
    </Block>
  );
};

export default Pay; // Giữ nguyên export này
