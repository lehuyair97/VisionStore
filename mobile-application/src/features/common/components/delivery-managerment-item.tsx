import { Block, Text } from "@components";
import React from "react";

import { TouchableOpacity } from "react-native";

type DeliveryManagermentItemProps = {
  location: string;
  detail: string;
  isSelected?: boolean;
  onPress: (item) => void;
};

const DeliveryManagermentItem: React.FC<DeliveryManagermentItemProps> = ({
  location,
  detail,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress({ location, detail, isSelected })}>
      <Block
        padding={"_10"}
        my={"_10"}
        borderRadius={"_14"}
        gap={"xs"}
        style={[
          isSelected
            ? { borderWidth: 0.6, borderColor: "red" }
            : { borderWidth: 0.6, borderColor: "gray" },
        ]}
      >
        <Text color={"black"} fontSize={14}>
          {detail}
        </Text>
        <Text color={"black"} fontSize={14} fontWeight={"bold"}>
          {location}
        </Text>
        {isSelected && (
          <Block
            borderRadius={"xxs"}
            borderWidth={0.5}
            px={"xs"}
            py={"xxs"}
            borderColor={"primary"}
            alignSelf={"flex-start"}
          >
            <Text color={"primary"}>Mặc định</Text>
          </Block>
        )}
      </Block>
    </TouchableOpacity>
  );
};

export default DeliveryManagermentItem;
