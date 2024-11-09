import { Block, Row } from "@components";
import Text from "@components/text";
import { Image, View } from "react-native";
import { Cart } from "@hooks/common/use-cart";

const RenderProduct = ({item}: {item: Cart}) => {
    const cart = item.carts && item.carts[0];


    if (!cart) {
        return <Text>Product information is not available</Text>;
    }

    return (
        <Block paddingVertical={"_10"}>
            <Row  center>
                <Image source={{uri: cart.image}} style={{width: 50, height: 50}} />
                <Block m={"_10"}/>
                <Block>
                    <Text color={"black"}>{cart.productName}</Text>
                    <Block m={"_3"}/>
                    <Text color={"black"} fontWeight={"600"}>{item.optionsMemory} - {item.optionsColor}</Text>
                </Block>
                <Block m={"_10"}/>
            </Row>
        </Block>
    );
}

export default RenderProduct;
