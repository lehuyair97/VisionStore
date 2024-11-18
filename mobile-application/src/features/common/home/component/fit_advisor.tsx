import Block from "@components/block";
import { Brand } from "@hooks/common/use-get-brand";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

interface FitAdvisorProps {
  onPress: (id: string) => void;
  data: Brand[] | any;
  selectedId: string | null;
}

const FitAdvisor = ({ data, onPress, selectedId }: FitAdvisorProps) => {
  const handlePress = (id: string) => {
    onPress(id);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handlePress(item._id)}
      style={{
        paddingLeft: index === 0 ? 0 : 5,
        paddingRight: 5,
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Block
        my={"_20"}
        style={{
          paddingHorizontal: 17,
          height: 35,
          backgroundColor:
            selectedId === item._id
              ? Colors.primary
              : Colors.background_fit_finder,
          borderRadius: 13,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: selectedId === item._id ? Colors.whiteF3 : Colors.black, // Đổi màu chữ nếu được chọn
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          {item.brand}
        </Text>
      </Block>
    </TouchableOpacity>
  );

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal // Đặt FlatList thành dạng ngang
      />
    </View>
  );
};

export default FitAdvisor;
