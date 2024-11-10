import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import { Cart } from "@hooks/common/use-cart";
import Colors from "@theme/colors";


interface AddressProps {
    address: Cart;
}

const Address = ({address}: AddressProps) => {
    return (
        <Block paddingHorizontal={"_20"} paddingVertical={"_15"} bg={"container"}>
            <Row between center>
                <Row>
                    <Icon type="fontAwesome" name="map-marker" size={24} color={Colors.primary} />
                    <Block m={"_15"}/>
                    <Block>
                    <Text color={"black"}>Địa chỉ nhận hàng</Text>
                    <Block m={"_5"}/>
                    <Text color={"black"}>{address.customerEmail ?? '----------'} |+{address.customerPhoneNumber ?? '----------'}</Text>
                    <Text color={"black"}>{address.customerAddress ?? '----------'}</Text>
                </Block>
                </Row>
                <Icon type="fontAwesome" name="arrow-right" size={24} color={Colors.primary} />
            </Row>
        </Block>
        
    );
}

export default Address;