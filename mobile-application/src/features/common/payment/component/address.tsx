import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import Colors from "@theme/colors";

const Address = () => {
    return (
        <Block paddingHorizontal={"_20"} paddingVertical={"_15"} bg={"container"}>
            <Row between center>
                <Row>
                    <Icon type="fontAwesome" name="map-marker" size={24} color={Colors.primary} />
                    <Block m={"_15"}/>
                    <Block>
                    <Text color={"black"}>Địa chỉ nhận hàng</Text>
                    <Block m={"_5"}/>
                    <Text color={"black"}>Phạm đồng thảo |+14987889999 </Text>
                    <Text color={"black"}>123 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM</Text>
                </Block>
                </Row>
                <Icon type="fontAwesome" name="arrow-right" size={24} color={Colors.primary} />
            </Row>
        </Block>
        
    );
}

export default Address;