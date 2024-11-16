import React from "react";
import { MainContainer, Block } from "@components";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { useRoute } from "@react-navigation/native";
export default function MyOrders() {
  const route = useRoute();
  const { nameScreen } = route.params as any;

  return (
    <MainContainer>
      <Block>
        <AppBarCustom
          title={nameScreen}
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />
      </Block>
    </MainContainer>
  );
}
