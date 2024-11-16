import { Block, Icon, Row, Text } from "@components";
import BottomSheet from "@features/common/components/bottom-sheet";
import PaymentItem from "@features/common/components/payment-item";
import ProfileActionItem from "@features/common/components/profile-action-item";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { profileActions } from "@utils/containts";
import { Helper } from "@utils/helper";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

interface PaymentItemProps {
  height?: number;
  refRBSheet: React.RefObject<any>;
  onClose: () => void
}

export default function ProfileActions({
  height,
  refRBSheet,
  onClose
}: PaymentItemProps) {
  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block>
        <Row center between m={"_20"}>
          <Text color={"black"} fontSize={16} fontWeight={"bold"}>
            Chọn phương thức thanh toán
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Icon type="entypo" name="chevron-down" color={"black"} size={24} />
          </TouchableOpacity>
        </Row>
        <Block style={{ paddingBottom: 120, paddingTop: 10 }}>
          <FlatList
            data={profileActions}
            keyExtractor={Helper.getKeyExtractor}
            scrollEnabled={true}
            renderItem={({ item }: any) => (
              <ProfileActionItem
                icon={item?.icon}
                title={item?.title}
                onPress={() => navigate(item.route)}
              />
            )}
          />
        </Block>
      </Block>
    </BottomSheet>
  );
}
