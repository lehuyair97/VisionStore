import { Block, Button, Row } from "@components";
import ProductItem from "@features/common/components/product-item";
import useGetSubCategoryByType from "@hooks/common/use-get-sub-category-by-type";
import { Helper } from "@utils/helper";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import SelectProduct, { RBSheetRef } from "./select-production";
import Text from "@components/text";
import { navigate } from "@navigation/config/navigation-service";
import useCommon from "@hooks/common/use-common";
export default function BuildManual() {
  const { checkValidate } = useCommon();

  const { data: subCategoryData } = useGetSubCategoryByType("components", true);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState();
  const refBottomSheet = useRef<RBSheetRef>();
  const [subCategories, setSubCategories] = useState(null);
  const totalPrice = useMemo(
    () =>
      subCategories?.reduce((total, item) => total + (item.product?.price || 0), 0),
    [subCategories]
  );
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
  const handleSelectProduct = (item) => {
    setSubCategoryId(item?._id);
    if (refBottomSheet?.current) {
      refBottomSheet.current.isOpen = true;
      refBottomSheet.current?.open();
      setIsOpenSearch(true);
    }
  };

  const getProductsWithQuantity = (items: Array<any>) => {
    return items
      ?.filter((item) => item.product)
      ?.map((item) => {
        const { product } = item;
        product.productId = product._id
        product.quantity = 1;
        return item.product;
      });
  };
  const handleBuyNow = () => {
    const selectProduct = getProductsWithQuantity(subCategories);
    if(selectProduct.length === 0){
      Alert.alert('Vui lòng chọn tối thiểu 1 sản phẩm!')
      return
    }
    setTimeout(() => {
      navigate("Payment", {
        selectedProducts: selectProduct,
        totalPrice: totalPrice,
      });
    }, 300);
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
      <Row between center marginHorizontal={"_20"} marginVertical={"_10"}>
        <Row gap={"_10"}>
          <Text fontSize={15} fontWeight={"bold"} color={"black"}>
            Tổng tiền
          </Text>
          <Text fontSize={15} fontWeight={"bold"} color={"primary"}>
            {`${totalPrice?.toLocaleString()} VND`}
          </Text>
        </Row>
        <Button
          onPress={()=>checkValidate(handleBuyNow)}
          noneStyle
          label="Mua ngay"
          buttonStyle={{
            borderRadius: 10,
            borderWidth: 0.7,
            borderColor: "red",
            paddingVertical: 6,
            paddingHorizontal: 12,
          }}
          textStyle={{ color: "red", fontWeight: "bold" }}
        />
      </Row>
    </Block>
  );
}
