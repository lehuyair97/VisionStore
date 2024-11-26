import { MainContainer } from "@components";
import Block from "@components/block";
import AppBar from "@features/common/common/appbar";
import ProductItem from "@features/common/home/component/product-item";
import Banner from "@features/common/home/component/banner";
import useGetProductByBrandID from "@hooks/common/use-get-product-by-brand";
import { navigate } from "@navigation/config/navigation-service";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES, Helper } from "@utils/helper";
import { ActivityIndicator, FlatList, Image } from "react-native";
import { ROUTES } from "@navigation/config/routes";
import Text from "@components/text";
import { useState } from "react";

type RootStackParamList = {
  DetailProduct: { id: string; brandName: string; categoryId: string };
};
const DetailBrand = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DetailProduct">>();
  const [bannerLoadding, setBannerLoadding] = useState(true);

  const { id, brandName, categoryId, brandType, subCategoryId } =
    route.params as any;
  const { data: productsBrand } = useGetProductByBrandID({
    categoryID: categoryId,
    brandID: id,
    brandType: brandType,
    subCategoryId: subCategoryId,
  });
  const handleNavigateToDetailProduct = (id: string) => {
    navigate(ROUTES.DetailProduct as keyof ParamListBase, {
      productId: id,
    });
  };
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block style={{ flex: 1, backgroundColor: Colors.white255 }}>
        <AppBar title={brandName ?? "Thương hiệu"} isBackground />
        <Block
          width={"100%"}
          height={130}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {bannerLoadding && <ActivityIndicator />}
          <Image
              source={{ uri: productsBrand?.data?.brand?.banner }}
              style={{
                width: "100%",
                height: '100%',
              }}
              onLoadStart={() => setBannerLoadding(true)}
              onLoadEnd={() => setBannerLoadding(false)}
              resizeMode="cover"
            />
        </Block>

        <Text
          mt={"_10"}
          textAlign={"center"}
          fontSize={14}
          fontWeight={"bold"}
          fontStyle={"italic"}
          color={"black"}
        >
          {productsBrand?.data?.brand?.description}
        </Text>
        <Block mt="_20" />
        <Block style={{ paddingHorizontal: 16 }}>
          <Block mt="_20" />
          <FlatList
            numColumns={2}
            data={productsBrand?.data?.products}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                onPress={handleNavigateToDetailProduct}
              />
            )}
            keyExtractor={Helper.getKeyExtractor}
          />
        </Block>
      </Block>
    </MainContainer>
  );
};

export default DetailBrand;
