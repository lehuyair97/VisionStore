import { MainContainer } from "@components";
import Block from "@components/block";
import AppBar from "@features/common/common/appbar";
import ProductBrandItem from "@features/common/components/product-brand-item";
import Banner from "@features/common/home/component/banner";
import ProductBrand from "@features/common/home/component/product-brand";
import useGetProductByBrandID from "@hooks/common/use-get-product-by-brand";
import { ROUTES } from "@navigation/config/routes";
import { useRoute, RouteProp, useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { FlatList, View } from "react-native";
type DetailBrandParams = {
    DetailBrand: {
        brandId: string;
        brandName: string; 
    };
};

const DetailBrand = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<DetailBrandParams, 'DetailBrand'>>();
    const { brandId, brandName } = route.params;
    const { data: productsBrand = [] } = useGetProductByBrandID({ categoryID: '', brandID: brandId });

    console.log("productsBrand", brandName);

    const images = [
        require("../../../../assets/icons/banner.png"),

      ];

    const handleNavigateToDetailProduct = (id: string) => {
        navigation.navigate(ROUTES.DetailProduct as keyof ParamListBase, {
            productId: id
        });
    };

    return (
        <MainContainer edges={EDGES.LEFT_RIGHT}>
            <Block style={{flex: 1, backgroundColor: Colors.white255, }}>
                <AppBar title={brandName ?? "Thương hiệu"} isBackground />
                <Block mt="_20" />
                <Block style={{paddingHorizontal: 16, alignItems: 'center'}}> 
                    <Banner images={images} borderRadius={0} nums={1} />
                

                <Block mt="_20" />
                <FlatList
                    numColumns={2}
                    data={productsBrand}
                    renderItem={({ item }) => <ProductBrandItem item={item} handleNavigateToDetailProduct={handleNavigateToDetailProduct} />}
                    keyExtractor={item => item._id}
                    
                   
                />
                </Block>
            </Block>
        </MainContainer>
    );
}

export default DetailBrand;