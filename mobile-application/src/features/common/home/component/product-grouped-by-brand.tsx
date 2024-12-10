import { Block, Row, Text } from "@components";
import React from "react";
import { FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductItem from "./product-item";
import { Product } from "@hooks/common/use-get-product-by-brand";

interface ProductBrandProps {
  data: any;
  brandSelected?: string;
  handleNavigateToDetailProduct: (product: Product) => void;
  handleNavigateToDetailBrand: ({
    id,
    brandName,
    brandType,
  }: {
    id: string;
    brandName: string;
    brandType: "subCategory" | "subCategory";
  }) => void;
}

const ProductBrand: React.FC<ProductBrandProps> = ({
  data,
  brandSelected = "",
  handleNavigateToDetailProduct,
  handleNavigateToDetailBrand,
}) => {
  const allBrands = brandSelected === "";
  const filteredData = allBrands
    ? data?.data
    : data?.data?.filter((brand) => brand?._id === brandSelected);
  const renderProductGroup = ({ item }) => (
    <Block my={"_20"}>
      <Row between style={{ paddingHorizontal: 4 }}>
        <Text color={"black"} fontWeight={"bold"}>
          {item.brand}
        </Text>
        <TouchableOpacity
          onPress={() =>
            handleNavigateToDetailBrand({
              id: item._id,
              brandName: item.brand,
              brandType: data?.type,
  
            })
          }
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
