import { Block, Icon, Row, Text } from "@components";
import BottomSheet from "@features/common/components/bottom-sheet";
import DeliveryMethodItem from "@features/common/components/delivery-method-item";
import { Helper } from "@utils/helper";
import React from "react";
import { FlatList } from "react-native";
interface DeliveryProps {
  height?: number;
  refRBSheet: React.RefObject<any>;
  setDeliverySelected: (deliveryMethod: any) => void;
  deliveryMethods: any
}
export default function Delivery({
  height,
  refRBSheet,
  setDeliverySelected,
  deliveryMethods
}: DeliveryProps) {
  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block>
        <Row center between m={"_20"}>
          <Text color={"black"} fontSize={16} fontWeight={"bold"}>
            Chọn Đơn vị vận chuyển
          </Text>
          <Icon type="entypo" name="chevron-down" color={"black"} size={24} />
        </Row>
        <Block style={{ paddingBottom: 120, paddingTop: 10 }}>
          <FlatList
            data={deliveryMethods}
            keyExtractor={Helper.getKeyExtractor}
            scrollEnabled={true}
            renderItem={({ item }: any) => (
              <DeliveryMethodItem
                expectedDelivery={item?.estimated_delivery_time}
                methodName={item?.method}
                price={item?.price}
                onPress={() => setDeliverySelected(item)}
              />
            )}
          />
        </Block>
      </Block>
    </BottomSheet>
  );
}
