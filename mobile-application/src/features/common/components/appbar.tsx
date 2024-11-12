import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import Colors from "@theme/colors";
interface AppBarProps {
    title?: string;
    iconLeft?: boolean;
    iconRight?: boolean;
    iconRightName?: string;
    colorIconLeft?: string;
    colorIconRight?: string;
    isBackground?: boolean;
}

const AppBar = ({title, iconLeft, iconRight, iconRightName, isBackground, colorIconLeft , colorIconRight}: AppBarProps) => {
    return (
        <Block bg={isBackground ? "primary" : "transparent"} paddingTop={"_40"} paddingBottom={"_25"} paddingHorizontal={"_20"}>
            <Row between center>
                 <Icon type="fontAwesome" name="arrow-left" size={20} color={colorIconLeft ?? Colors.container}/>
                <Text fontSize={16} fontWeight={"500"}>{title}</Text>
                {iconRight && iconRight 
                ? <Icon type="fontAwesome" name={iconRightName} size={20} color={colorIconRight ?? Colors.container} /> 
                : <Block width={20} />}
            </Row>
        </Block>    
    );
}

export default AppBar;
