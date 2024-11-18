import { Text } from "@components";
import Block from "@components/block";
import BottomSheet from "@features/common/components/bottom-sheet";
import AppBarSearch from "@features/common/search/component/appbar_serch";
import ProductSearchItem from "@features/common/search/component/product-search-item";
import useSearchProductsOfComponent from "@hooks/common/use-search-products-of-components";
import { SCREEN_HEIGHT } from "@utils/helper";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const SelectProduct = ({ refRBSheet, subCategoryId, onItemSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    isLoading,
    search,
  } = useSearchProductsOfComponent(subCategoryId);

  const handleFetchData = async () => {
    await search(searchTerm);
  };
  useEffect(() => {
    if (refRBSheet?.current?.open()) {
      handleFetchData();
    }
  }, [refRBSheet?.current]);

  return (
    <BottomSheet height={SCREEN_HEIGHT - 40} refRBSheet={refRBSheet}>
      <AppBarSearch
        leftIconName="chevron-down"
        onLeftIconPress={() => refRBSheet?.current?.close()}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleFetchData}
      />
      <Block height={16} />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text fontSize={16} fontWeight="600" color="black2A">
            Đang tải sản phẩm...
          </Text>
        </View>
      ) : products?.length ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductSearchItem item={item} onPress={onItemSelected} />
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text fontSize={16} fontWeight="600" color="black2A">
            Không tìm thấy sản phẩm
          </Text>
        </View>
      )}
    </BottomSheet>
  );
};

export default SelectProduct;
