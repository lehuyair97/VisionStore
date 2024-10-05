import { Icon, Row } from "@components";
import TextHome from "./text_home";
import Block from "@components/block";
import Colors from "@theme/colors";

const AppBar = () => {
    return (
        <Row between>
            <TextHome>Vision Store</TextHome>
            <Row>
                <Icon type="fontAwesome" name="search" size={20} color={Colors.black2A} />
                <Block width={20} />
                <Icon type="fontAwesome" name="bell" size={20} color={Colors.black2A} />
            </Row>
        </Row>
    );
}

export default AppBar;