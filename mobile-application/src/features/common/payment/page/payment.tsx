import { Block, MainContainer } from "@components";
import Text from "@components/text";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import AppBar from "../../common/appbar";
import { View } from "react-native";
import Address from "../component/address";
import ItemProduct from "../component/item_product";
import PaymentDetails from "../component/payment_details";
import Pay from "../component/pay";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Cart } from "@hooks/common/use-cart";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { ScrollView } from "react-native-virtualized-view";
const Payment = () => {
    const route = useRoute();
    const { selectedProducts } = route.params as { selectedProducts: Cart[] };

    const totalProductPrice = selectedProducts.reduce((sum, product) => sum + product.totalBill, 0);
    const shippingCost = 1000;
    const discount = 10;
    const finalTotal = totalProductPrice + shippingCost - discount;

    return (
        <MainContainer edges={EDGES.LEFT_RIGHT} >
            <Block backgroundColor={"gray_profile"} flex={1}>
                <AppBarCustom title="Thanh toán" iconLeft titleCenter isBackground paddingHorizontal={20} paddingVertical={10}/>
                <Block m={"_10"}/>
                <ScrollView>
                {selectedProducts.length > 0 && <Address address={selectedProducts[0]} />}
                <Block m={"_10"}/>
                <ItemProduct selectedProducts={selectedProducts} />
                <Block m={"_10"}/>
                <PaymentDetails 
                    totalProductPrice={totalProductPrice} 
                    shippingCost={shippingCost} 
                    discount={discount} 
                    finalTotal={finalTotal} 
                />
                <Block height={100}/>
                </ScrollView>
                <View style={styles.totalizeContainer}>
                    <Pay finalTotal={finalTotal} />
                </View>
            </Block>
        </MainContainer>
    );
}

export default Payment;
const styles = StyleSheet.create({
    totalizeContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopColor: '#ccc',
      
    },
  });