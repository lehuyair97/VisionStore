import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Row, Text, Block } from "@components";
import Colors from "@theme/colors";
import { Helper } from "@utils/helper";
import ProductItem from "./product-item";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ProductBrandProps {
  data: any;
  brandSelected?: string;
  handleNavigateToDetailProduct: (id: string) => void;
  handleNavigateToDetailBrand: (id: string, brandName: string) => void;
}

const ProductBrand: React.FC<ProductBrandProps> = ({
  data,
  brandSelected = "",
  handleNavigateToDetailProduct,
  handleNavigateToDetailBrand,
}) => {
  const allBrands = brandSelected === "";
  const filteredData = allBrands
    ? data
    : data?.filter((brand) => brand?._id === brandSelected);

  const renderProductGroup = ({ item }) => (
    <Block my={"_20"}>
      <Row between style={{ paddingHorizontal: 4 }}>
        <Text color={"black"} fontWeight={"bold"}>
          {item.brand}
        </Text>
        <TouchableOpacity
          onPress={() => handleNavigateToDetailBrand(item._id, item.brand)}
        >
          <Text color={"primary"}>xem thêm</Text>
        </TouchableOpacity>
      </Row>
      <FlatList
        horizontal={allBrands}
        numColumns={allBrands ? 1 : 2}
        data={item.products}
        renderItem={({ item }) => (
          <ProductItem product={item} onPress={handleNavigateToDetailProduct} />
        )}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />} 

      />
    </Block>
  );

  return (
    <FlatList
      data={filteredData}
      renderItem={renderProductGroup}
      keyExtractor={(item) => item._id}
      
      
      

    />
  );
};

export default ProductBrand;
