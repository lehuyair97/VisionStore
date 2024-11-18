import { Block } from "@components";
import ProductItem from "@features/common/components/product-item";
import useGetSubCategoryByType from "@hooks/common/use-get-sub-category-by-type";
import { Helper } from "@utils/helper";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import SelectProduct from "./select-production";
export default function BuildManual() {
  const { data: subCategoryData } = useGetSubCategoryByType("components", true);
  const [subCategoryId, setSubCategoryId] = useState();
  const refBottomSheet = useRef<any>();
  const [subCategories, setSubCategories] = useState(null);
  useEffect(() => {
    if (subCategoryData) {
      setSubCategories(subCategoryData?.sub_category_list);
    }
  }, [subCategoryData]);
  const handleProductSelection = (subCategoryId, selectedProduct) => {
    setSubCategories((prev) =>
      prev.map((item) =>
        item._id === subCategoryId
          ? { ...item, product: selectedProduct }
          : item
      )
    );
  };
  const handleSelectProduct = (item) => {
    setSubCategoryId(item?._id);
    if (refBottomSheet?.current) {
      refBottomSheet.current?.open();
    }
  };
  return (
    <Block flex={1}>
      <FlatList
        data={subCategories}
        renderItem={({ item }) => (
          <ProductItem item={item} onItemPress={handleSelectProduct} />
        )}
        keyExtractor={Helper.getKeyExtractor}
      />
      <SelectProduct
        refRBSheet={refBottomSheet}
        onItemSelected={(item) => handleProductSelection(subCategoryId, item)}
        subCategoryId={subCategoryId}
      />
    </Block>
  );
}
