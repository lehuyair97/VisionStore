import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "@components";
import Block from "@components/block";
import BottomSheet from "@features/common/components/bottom-sheet";
import AppBarSearch from "@features/common/search/component/appbar_serch";
import ProductSearchItem from "@features/common/search/component/product-search-item";
import useSearchProductsOfComponent from "@hooks/common/use-search-products-of-components";
import { SCREEN_HEIGHT } from "@utils/helper";

export type RBSheetRef = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const SelectProduct = ({
  subCategoryId,
  onItemSelected,
  setIsOpen,
  isOpen,
  refRBSheet,
}: {
  subCategoryId: string;
  onItemSelected: (item: any) => void;
  setIsOpen: (item: boolean) => void;
  isOpen: boolean;
  refRBSheet: React.RefObject<RBSheetRef>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const { isLoading, search } = useSearchProductsOfComponent(subCategoryId);

  const handleOpen = () => {
    refRBSheet.current?.open();
    setIsOpen(true);
  };

  const handleClose = () => {
    refRBSheet.current?.close();
    setIsOpen(false);
  };

  const handleFetchData = async () => {
    const data = await search(searchTerm);
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setProducts([]);
      handleFetchData();
    }
  }, [isOpen]);

  return (
    <BottomSheet refRBSheet={refRBSheet} height={SCREEN_HEIGHT - 40}>
      <AppBarSearch
        leftIconName="chevron-down"
        onLeftIconPress={handleClose}
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
            <ProductSearchItem
              item={item}
              onPress={() => onItemSelected(item)}
            />
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
