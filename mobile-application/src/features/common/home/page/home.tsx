import { Block, Button, Icon, MainContainer, Row, Text } from "@components";
import { EDGES } from "@utils/helper";
import AppBar from "../component/appbar";
import Banner from "../component/banner";
import FitFinder from "../component/fit_finder";
import FitAdvisor from "../component/fit_advisor";
import { ScrollView } from "react-native-virtualized-view";
import useCategory, { Category } from "@hooks/common/use-category";
import useBrand from "@hooks/common/use-get-brand";
import useGetProductGrouped from "@hooks/common/use-get-products-grouped";
import useGetProductByBrandID, { ProductResponse } from "@hooks/common/use-get-product-by-brand";
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { ROUTES } from "@navigation/config/routes";
import ProductGrouped from "../component/product-grouped";
import ProductBrand from "../component/product-brand";
import { View } from "react-native";
import { navigate } from "@navigation/config/navigation-service";

const images = [
  require("../../../../assets/icons/banner.png"),
  require("../../../../assets/icons/banner2.png"),
  require("../../../../assets/icons/banner.png"),
];

const iconMap: { [key: string]: string } = {
  Laptop: "home",
  PC: "desktop",
  "Linh  kiện": "microchip",
  "Phụ kiện": "headphones",
};


export default function Home() {
  const { data: category, isLoading, error } = useCategory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIdBrand, setSelectedIdBrand] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleNavigateToDetailProduct = (id: string) => {
    navigation.navigate(ROUTES.DetailProduct as keyof ParamListBase, {
      productId: id
    });
  };

  const categoryID = selectedId || (category && category[0]._id);
  const brandID = selectedIdBrand;

  const { data: dataProductsCategory } = useGetProductGrouped(categoryID);
  const { data: dataProductsBrand } = useGetProductByBrandID({
    categoryID,
    brandID
  });
  const { data: dataBrand } = useBrand();
  const extendedDataBrand = dataBrand ? [
    { _id: "", name: "Tất cả", description: "", logo: "", brandType: "" },
    ...dataBrand
  ] : [];

  const handleSelectCategory = (id: string) => {
    setSelectedId(id);
  };

  const handleSelectBrand = (id: string) => {
    setSelectedIdBrand(id);
  };


  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!category || category.length === 0)
    return <Text>No categories available</Text>;

  const data = category.map((item: Category) => ({
    id: item._id,
    title: item.name,
    icon: iconMap[item.name] || "home",
  }));


  const selectedBrandName = selectedIdBrand
    ? dataBrand.find((brand) => brand._id === selectedIdBrand)?.name
    : null;

  const mergedProducts = (dataProductsBrand || []).reduce((acc, product) => {
    const brandId = product.brand;
    let brandGroup = acc.find(group => group._id === brandId);

    if (!brandGroup) {
      brandGroup = {
        _id: brandId,
        brand: selectedBrandName,
        products: []
      };
      acc.push(brandGroup);
    }

    brandGroup.products.push(product);
    return acc;
  }, []);

  const handleNavigateToDetailBrand = (id: string, brandName: string) => {
    navigation.navigate(ROUTES.DetailBrand as keyof ParamListBase, {
      brandId: id,
      brandName: brandName
    });
  };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
      >
        <AppBar />
        <Block mt="_20" />
        <Banner images={images} />
        <Block mt="_20" />
        <FitFinder data={data} selectedId={selectedId} onPress={handleSelectCategory} />
        <Block mt="_15" />
        <FitAdvisor data={extendedDataBrand} selectedId={selectedIdBrand} onPress={handleSelectBrand} />
        <Block mt="_15" />
        {selectedIdBrand === "" || selectedIdBrand === null 
          ? (dataProductsCategory ? 
              <ProductGrouped 
                data={dataProductsCategory} 
                handleNavigateToDetailProduct={handleNavigateToDetailProduct} 
                handleNavigateToDetailBrand={handleNavigateToDetailBrand}  
              /> 
              : <Text>Không có sản phẩm</Text>)
          : <ProductBrand 
              data={mergedProducts} 
              selectedBrandName={selectedBrandName} 
              handleNavigateToDetailProduct={handleNavigateToDetailProduct} 
              handleNavigateToDetailBrand={handleNavigateToDetailBrand}
            />
        }
      </ScrollView>
    </MainContainer>
  );
}
