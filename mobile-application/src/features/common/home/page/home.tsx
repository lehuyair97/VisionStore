import { Block, Icon, MainContainer, Row, Text } from "@components";
import useCategory, { Category } from "@hooks/common/use-category";
import useBrand from "@hooks/common/use-get-brand";
import useGetProductGrouped from "@hooks/common/use-get-products-grouped";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { EDGES, Helper } from "@utils/helper";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import Banner from "../component/banner";
import FitAdvisor from "../component/fit_advisor";
import FitFinder from "../component/fit_finder";
import ProductBrand from "../component/product-grouped-by-brand";
import { banners, iconMap } from "@utils/containts";
import { CategoryCustomProps } from "./types";
import useGetSubCategoryByType from "@hooks/common/use-get-sub-category-by-type";
import BottomSheet from "@features/common/components/bottom-sheet";
import { RBSheetRef } from "@features/common/components/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import SubCategoryBottomSheet from "@features/common/components/sub-categories";
import Colors from "@theme/colors";
import AppBarCustom from "../component/appbar_custom";
export default function Home() {
  const { data: categories, isLoading, error } = useCategory();
  const [categorySelected, setCategorySelected] =
    useState<CategoryCustomProps | null>(null);
  const [selectedIdBrand, setSelectedIdBrand] = useState("");
  const refRBSheet = useRef<RBSheetRef>();
  const [subCategories, setSubCategories] = useState<any>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    refetch: submmitSubCategory,
    isRefetchError,
    isRefetching,
  } = useGetSubCategoryByType(categorySelected?.type, false);

  const transformedCategories =
    categories?.map((item) => ({
      id: item._id,
      title: item.name,
      icon: iconMap[item.name] || "home",
      type: item?.type,
    })) || [];

  const openSubCategories = () => {
    if (refRBSheet?.current) {
      refRBSheet.current.open();
    }
  };
  const closeSubCategories = () => {
    if (refRBSheet?.current) {
      refRBSheet.current.close();
    }
  };

  useEffect(() => {
    if (!categorySelected && transformedCategories.length > 0) {
      setCategorySelected(transformedCategories[0]);
    }
  }, [transformedCategories]);

  useEffect(() => {
    if (
      categorySelected?.type === "accessories" ||
      categorySelected?.type === "components"
    ) {
      const fetchSubCategory = async () => {
        openSubCategories();
        const res = await submmitSubCategory();
        setSubCategories(res?.data);
      };
      fetchSubCategory();
    }
  }, [categorySelected]);
  const { data: productsByCategory } = useGetProductGrouped(
    categorySelected?.id || ""
  );
  const { data: brands } = useBrand();
  const extendedBrands = brands
    ? [
        { _id: "", name: "Tất cả", description: "", logo: "", brandType: "" },
        ...brands,
      ]
    : [];

  const handleNavigateToDetailProduct = (id: string) => {
    navigate(ROUTES.DetailProduct as keyof ParamListBase, { productId: id });
  };

  const handleNavigateToDetailBrand = (id: string, brandName: string) => {
    navigation.navigate(ROUTES.DetailBrand as keyof ParamListBase, {
      id,
      brandName,
      categoryId: categorySelected?.id,
    });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!categories || categories.length === 0)
    return <Text>No categories available</Text>;

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
      >
        <AppBarCustom title="VisionSore" titleStyle={{ fontWeight: "bold", color: Colors.primary }}
          childrenRight={
              <Row>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Search as keyof ParamListBase)}>
                <Icon
                  type="fontAwesome"
                  name="search"
                  size={20}
                  color={Colors.black2A}
                />
              </TouchableOpacity>
              <Block width={20} />
              <Icon type="fontAwesome" name="bell" size={20} color={Colors.black2A} />
            </Row>
          }
        />
        <Banner images={banners} />
        <FitFinder
          data={transformedCategories}
          selected={categorySelected}
          onPress={setCategorySelected}
        />
        <FitAdvisor
          data={extendedBrands}
          selectedId={selectedIdBrand}
          onPress={setSelectedIdBrand}
        />
        <ProductBrand
          brandSelected={selectedIdBrand}
          data={productsByCategory}
          handleNavigateToDetailProduct={handleNavigateToDetailProduct}
          handleNavigateToDetailBrand={handleNavigateToDetailBrand}
        />
      </ScrollView>
      <SubCategoryBottomSheet
        isFetching={isRefetching}
        refRBSheet={refRBSheet}
        subCategories={subCategories?.sub_category_list}
        category={categorySelected?.type}
      />
    </MainContainer>
  );
}
