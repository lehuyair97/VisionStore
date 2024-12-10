import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Icon, Row } from "@components";
import { SCREEN_WIDTH } from "@utils/helper";

interface ActionBottomBarProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ActionBottomBar: React.FC<ActionBottomBarProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <Row
      center
      my={"_20"}
      position={"absolute"}
      height={60}
      bottom={-20}
      width={SCREEN_WIDTH}
      backgroundColor={"container"}
    >
      <Button
        noneStyle
        buttonStyle={{
          borderLeftWidth: 1,
          borderRightWidth: 1,
          paddingHorizontal: 40,
          borderColor: "gray",
        }}
        onPress={onAddToCart}
      >
        <Icon type="fontAwesome" name="cart-plus" size={34} color={"red"} />
      </Button>

      <Button
        noneStyle
        label="Mua ngay"
        onPress={onBuyNow}
        buttonStyle={{ flex: 1, alignItems: "center" }}
        textStyle={{
          color: "red",
          fontWeight: "bold",
          fontSize: 18,
        }}
      />
    </Row>
  );
};

export default ActionBottomBar;
