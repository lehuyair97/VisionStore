import { Icon, MainContainer, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { StatusBar } from "expo-status-bar";
interface AppBarProps {
    title: string;
    iconLeft?: boolean;
    iconRight?: boolean;
}

const AppBar = ({title, iconLeft, iconRight}: AppBarProps) => {
    return (
        <Block bg={"primary"} paddingTop={"_40"} paddingBottom={"_25"} paddingHorizontal={"_20"}>
            <StatusBar style="light" backgroundColor="transparent" />
            <Row between center>
                 <Icon type="fontAwesome" name="arrow-left" size={24} color={Colors.container}/>
                <Text fontSize={16} fontWeight={"500"}>{title}</Text>
                {iconRight && iconRight 
                ? <Icon type="fontAwesome" name="arrow-left" size={20} color={Colors.container} /> 
                : <Block width={20} />}

            </Row>
        </Block>
    );
}

export default AppBar;
