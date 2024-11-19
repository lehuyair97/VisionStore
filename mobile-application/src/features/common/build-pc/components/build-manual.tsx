import { Block, Row } from "@components";
import ProductItem from "@features/common/components/product-item";
import useGetSubCategoryByType from "@hooks/common/use-get-sub-category-by-type";
import { Helper } from "@utils/helper";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import SelectProduct, { RBSheetRef } from "./select-production";
import Text from "@components/text";
export default function BuildManual() {
  const { data: subCategoryData } = useGetSubCategoryByType("components", true);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState();
  const refBottomSheet = useRef<RBSheetRef>();
  const [subCategories, setSubCategories] = useState(null);
  const calculateTotalPrice = (products) => {
    return products
      ? products.reduce((total, item) => {
          const price = item.product?.price;
          return price ? total + price : total;
        }, 0)
      : 0;
  };
  useEffect(() => {
    if (subCategoryData) {
      setSubCategories(subCategoryData?.sub_category_list);
    }
  }, [subCategoryData]);
  const handleProductSelection = (subCategoryId, selectedProduct) => {
    if (refBottomSheet?.current) {
      refBottomSheet.current.isOpen = false;
      refBottomSheet.current?.close();
      setIsOpenSearch(false);
    }
    setSubCategories((prev) =>
      prev.map((item) =>
        item._id === subCategoryId
          ? { ...item, product: selectedProduct }
          : item
      )
    );
  };
  console.log(calculateTotalPrice(subCategories));
  const handleSelectProduct = (item) => {
    setSubCategoryId(item?._id);
    if (refBottomSheet?.current) {
      refBottomSheet.current.isOpen = true;
      refBottomSheet.current?.open();
      setIsOpenSearch(true);
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
        isOpen={isOpenSearch}
        setIsOpen={setIsOpenSearch}
        onItemSelected={(item) => handleProductSelection(subCategoryId, item)}
        subCategoryId={subCategoryId}
      />
      <Row between marginHorizontal={"_20"}>
        <Text fontSize={15} fontWeight={"bold"} color={"black"}>
          Tổng tiền
        </Text>
        <Text fontSize={15} fontWeight={"bold"} color={"primary"}>
          {`${calculateTotalPrice(subCategories)} VND`}
        </Text>
      </Row>
    </Block>
  );
}
