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
import { FlatList } from "react-native";
import { ROUTES } from "@navigation/config/routes";

type RootStackParamList = {
  DetailProduct: { id: string; brandName: string; categoryId: string };
};
const DetailBrand = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, "DetailProduct">>();
  const { id, brandName, categoryId } = route.params;
  const { data: productsBrand = [] } = useGetProductByBrandID({
    categoryID: categoryId,
    brandID: id,
  });

  const images = [require("../../../../assets/icons/banner.png")];

  const handleNavigateToDetailProduct = (id: string) => {
    navigate(ROUTES.DetailProduct as keyof ParamListBase, {
      productId: id,
    });
  };
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block style={{ flex: 1, backgroundColor: Colors.white255 }}>
        <AppBar title={brandName ?? "Thương hiệu"} isBackground />
        <Block mt="_20" />
        <Block style={{ paddingHorizontal: 16}}>
          <Banner images={images} borderRadius={0} nums={1} />
          <Block mt="_20" />
          <FlatList
            numColumns={2}
            data={productsBrand}
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
