import { Block, Icon, Row, Text } from "@components";
import BottomSheet from "@features/common/components/bottom-sheet";
import PaymentItem from "@features/common/components/payment-item";
import { Helper } from "@utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

interface PaymentItemProps {
  height?: number;
  refRBSheet: React.RefObject<any>;
  paymentMethods: any;
  setPaymentMethod: (paymentMethod: any) => void;
}

export default function PaymentMethod({
  height,
  refRBSheet,
  setPaymentMethod,
  paymentMethods,
}: PaymentItemProps) {
  const [selectedMethod, setSelectedMethod] = useState<any>(paymentMethods[0]);

  const handleSelectMethod = (method: any) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block>
        <Row center between m={"_20"}>
          <Text color={"black"} fontSize={16} fontWeight={"bold"}>
            Chọn phương thức thanh toán
          </Text>
          <Icon type="entypo" name="chevron-down" color={"black"} size={24} />
        </Row>
        <Block style={{ paddingBottom: 120, paddingTop: 10 }}>
          <FlatList
            data={paymentMethods}
            keyExtractor={Helper.getKeyExtractor}
            scrollEnabled={true}
            renderItem={({ item, index }: any) => (
              <PaymentItem
                image={item?.image}
                icon={item?.icon}
                methodName={item?.method}
                onPress={() => handleSelectMethod(item)}
                isSelected={selectedMethod?.method === item.method}
              />
            )}
          />
        </Block>
      </Block>
    </BottomSheet>
  );
}
