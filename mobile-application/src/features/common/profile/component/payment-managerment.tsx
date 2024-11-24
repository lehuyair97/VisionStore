import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, MainContainer } from "@components";
import Block from "@components/block";
import { FlatList } from "react-native-gesture-handler";
import { paymentManagerment, paymentMethods } from "@utils/containts";
import { Helper } from "@utils/helper";
import PaymentItem from "@features/common/components/payment-item";
import AppBarCustom from "@features/common/home/component/appbar_custom";

export default function PaymentManagerment() {
  return (
    <MainContainer>
      <Block flex={1}>
        <AppBarCustom
          title="Quản lý thanh toán"
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />
        <Block mx={"_20"} mt={"_20"} flex={1}>
          <FlatList
            data={paymentManagerment}
            keyExtractor={Helper.getKeyExtractor}
            renderItem={({ item, index }) => (
              <PaymentItem
                image={item?.image}
                icon={item?.icon}
                methodName={item.method}
                isSelected={index === 0}
                isDisable={index !== 0}
                onPress={() => {}}
              />
            )}
          />
          <Button
            buttonStyle={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
            }}
            label="Đặt làm mặc định"
          />
        </Block>
      </Block>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
