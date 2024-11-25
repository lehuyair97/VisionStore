import { Block, Icon, Row, Text } from "@components";
import BottomSheet from "@features/common/components/bottom-sheet";
import PaymentItem from "@features/common/components/payment-item";
import { deliveryMethodActions, deliveryMethods } from "@utils/containts";
import { Helper } from "@utils/helper";
import React from "react";
import { FlatList } from "react-native";
interface DeliveryManagerActionProps {
  height?: number;
  refRBSheet: React.RefObject<any>;
  onActionPress: (item: any) => void;
}
export default function DeliveryManagerActions({
  height,
  refRBSheet,
  onActionPress,
}: DeliveryManagerActionProps) {
  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block>
        <Row center between m={"_20"}>
          <Text color={"black"} fontSize={16} fontWeight={"bold"}>
            Lựa chọn
          </Text>
          <Icon type="entypo" name="chevron-down" color={"black"} size={24} />
        </Row>
        <Block style={{ paddingBottom: 120, paddingTop: 10 }}>
        <FlatList
            data={deliveryMethodActions}
            keyExtractor={Helper.getKeyExtractor}
            renderItem={({ item, index }) => (
              <PaymentItem
                icon={item?.icon}
                methodName={item.method}
                onPress={() => {
                  onActionPress(item);
                }}
              />
            )}
          />
        </Block>
      </Block>
    </BottomSheet>
  );
}
