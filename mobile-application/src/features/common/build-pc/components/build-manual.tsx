import React from "react";
import { Block, Text } from "@components";
import { FlatList } from "react-native";
import { BuildPCManualData } from "@utils/containts";
import ProductItem from "@features/common/components/product-item";
export default function BuildManual() {
  return (
    <Block flex={1}>
      <FlatList
        data={BuildPCManualData}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </Block>
  );
}
