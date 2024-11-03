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
const Payment = () => {
    return (
        <MainContainer edges={EDGES.LEFT_RIGHT} >
            <Block backgroundColor={"gray_profile"} flex={1}>
                <AppBar title="Thanh toán" isBackground />
                <Block m={"_10"}/>
                <Address />
                <Block m={"_10"}/>
                <ItemProduct />
                <Block m={"_10"}/>
                <PaymentDetails />
                <Block m={"_10"}/>
                <View style={styles.totalizeContainer}>
                    <Pay />
                </View>
                
            </Block>
        </MainContainer>
    );
}

export default Payment;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      paddingVertical: 25,
      
    },
    totalizeContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      borderTopColor: '#ccc',
      
    },
  });