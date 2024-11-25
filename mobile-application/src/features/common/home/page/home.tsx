import { Block, Icon, MainContainer, Row, Text } from "@components";
import { RBSheetRef } from "@features/common/components/bottom-sheet";
import { useAuth } from "@hooks/auth";
import useAddRecentProduct from "@hooks/common/use-add-recent-products";
import useCategory from "@hooks/common/use-category";
import useCommon from "@hooks/common/use-common";
import useGetProductGroupedByChildSubCategory from "@hooks/common/use-get-product-grouped-by-Sub-category-child-id";
import useGetProductGrouped from "@hooks/common/use-get-products-grouped";
import useGetSubCategoryByType from "@hooks/common/use-get-sub-category-by-type";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import Colors from "@theme/colors";
import { iconMap } from "@utils/containts";
import { EDGES } from "@utils/helper";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { CategoryCustomProps } from "./types";
import useGetBanner from "@hooks/common/use-get-banner";
const AppBarCustom = lazy(() => import("../component/appbar_custom"));
const Banner = lazy(() => import("../component/banner"));
const FitAdvisor = lazy(() => import("../component/fit_advisor"));
const FitFinder = lazy(() => import("../component/fit_finder"));
const ProductBrand = lazy(
  () => import("../component/product-grouped-by-brand")
);
const SubCategoryBottomSheet = lazy(
  () => import("@features/common/components/sub-categories")
);

export default function Home() {
  const { userInfo } = useAuth();
  const { data: banners } = useGetBanner();
  const { addRecentProduct } = useAddRecentProduct(userInfo?._id);
  const { messageUnread } = useCommon();
  const { data: categories, isLoading, error } = useCategory();
  const [categorySelected, setCategorySelected] =
    useState<CategoryCustomProps | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedIdBrand, setSelectedIdBrand] = useState<string>("");
  const refRBSheet = useRef<RBSheetRef>(null);
  const [subCategories, setSubCategories] = useState<any>();
  const [products, setProducts] = useState<any>([]);
  const [subCategoryChildSelected, setSubCategoryChildSelected] =
    useState<any>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    refetch: submitSubCategory,
    isRefetchError,
    isRefetching,
  } = useGetSubCategoryByType(categorySelected?.type, false);
  const { data: productsByCategory } = useGetProductGrouped(
    categorySelected?.id || ""
  );
  console.log(subCategories)
  const { data: productsBySubCategoryChild } =
    useGetProductGroupedByChildSubCategory(subCategoryChildSelected?._id) 

  const transformedCategories = useMemo(
    () =>
      categories?.map((item) => ({
        id: item._id,
        title: item.name,
        icon: iconMap[item.name] || "home",
        type: item?.type,
      })) || [],
    [categories]
  );

  const transformedBrands = useMemo(
    () =>
      products?.data?.map((brandItem) => ({
        _id: brandItem._id,
        brand: brandItem.brand,
      })) || [],
    [products]
  );

  const extendedBrands = useMemo(
    () => [{ _id: "", brand: "Tất cả" }, ...transformedBrands],
    [transformedBrands]
  );

  const openSubCategories = () => refRBSheet?.current?.open();
  const closeSubCategories = () => refRBSheet?.current?.close();

  useEffect(() => {
    if (!categorySelected && transformedCategories.length > 0) {
      setCategorySelected(transformedCategories[0]);
    }
  }, [transformedCategories, categorySelected]);

  useEffect(() => {
    if (
      categorySelected?.type === "accessories" ||
      categorySelected?.type === "components"
    ) {
      openSubCategories();
      const fetchSubCategory = async () => {
        const res = await submitSubCategory();
        setSubCategories(res?.data);
      };
      fetchSubCategory();
    }
  }, [categorySelected, submitSubCategory, resetTrigger]);

  useEffect(() => {
    setSelectedIdBrand("");
    if (
      categorySelected?.type === "accessories" ||
      categorySelected?.type === "components"
    ) {
      setProducts({ data: productsBySubCategoryChild, type: "subCategory" });
    } else {
      setProducts({ data: productsByCategory, type: "category" });
    }
  }, [productsByCategory, productsBySubCategoryChild, categorySelected]);

  const handleNavigateToDetailProduct = async (id: string) => {
    navigate(ROUTES.DetailProduct as keyof ParamListBase, { productId: id });
    await addRecentProduct(id);
  };

  const handleNavigateToDetailBrand = ({
    id,
    brandName,
    brandType,
  }: {
    id: string;
    brandName: string;
    brandType: "subCategory" | "subCategory";
  }) => {
    navigation.navigate(ROUTES.DetailBrand as keyof ParamListBase, {
      id,
      brandName,
      categoryId: categorySelected?.id,
      brandType: brandType,
      subCategoryId: subCategoryChildSelected?._id,
    });
  };
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!categories || categories.length === 0)
    return <Text>No categories available</Text>;
  if (!productsByCategory && !productsBySubCategoryChild) {
    return <ActivityIndicator />;
  }
  return (
    <Suspense
      fallback={
        <Block flex={1} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={30} />
        </Block>
      }
    >
      <MainContainer edges={EDGES.LEFT_RIGHT}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
        >
          <AppBarCustom
            title="VisionStore"
            titleStyle={{ fontWeight: "bold", color: Colors.primary }}
            childrenRight={
              <Row>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ROUTES.Search as keyof ParamListBase)
                  }
                >
                  <Icon
                    type="fontAwesome"
                    name="search"
                    size={20}
                    color={Colors.black2A}
                  />
                </TouchableOpacity>
                <Block width={20} />
                <TouchableOpacity
                  onPress={() => navigate(ROUTES.NotificationScreen)}
                >
                  <Icon
                    type="fontAwesome"
                    name="bell"
                    size={20}
                    color={Colors.black2A}
                  />
                  <Block
                    position="absolute"
                    top={-5}
                    right={-4}
                    width={14}
                    height={14}
                    borderRadius="full"
                    backgroundColor="red_500"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text textAlign="center" fontSize={8}>
                      {messageUnread ?? messageUnread}
                    </Text>
                  </Block>
                </TouchableOpacity>
              </Row>
            }
          />
          <Banner data={banners} />
          <FitFinder
            data={transformedCategories}
            selected={categorySelected}
            onPress={(category) => {
              if (category.id === categorySelected?.id) {
                setResetTrigger((prev) => prev + 1);
              } else {
                setCategorySelected(category);
              }
            }}
          />
          <FitAdvisor
            data={extendedBrands}
            selectedId={selectedIdBrand}
            onPress={setSelectedIdBrand}
          />
          <ProductBrand
            brandSelected={selectedIdBrand}
            data={products}
            handleNavigateToDetailProduct={handleNavigateToDetailProduct}
            handleNavigateToDetailBrand={handleNavigateToDetailBrand}
          />
        </ScrollView>
        <SubCategoryBottomSheet
          isFetching={isRefetching}
          refRBSheet={refRBSheet}
          subCategories={subCategories?.sub_category_list}
          category={categorySelected?.type}
          onsubCategoryChildSelected={(item) => {
            setSubCategoryChildSelected(item);
            closeSubCategories();
          }}
        />
      </MainContainer>
    </Suspense>
  );
}
