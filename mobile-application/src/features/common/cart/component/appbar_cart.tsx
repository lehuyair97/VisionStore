import { Block, Row, Icon, MainContainer } from "@components";
import Text from "@components/text";
import { commonStyles } from "@features/common/profile/styles/styles";
import Colors from "@theme/colors";
import { View } from "react-native";

const AppBarCart = () => {
    return (
        
        <Block  style={[commonStyles.container,{padding: 20,backgroundColor:Colors.container}]}>
            <Row between>
                <Text fontSize={20} fontWeight="bold" color="black">Giỏ hàng</Text>
            </Row>
           
        </Block>

    );
}

export default AppBarCart;