import {  TouchableOpacity } from "react-native";
import Block from "../../../../components/block";
import { Icon, Row } from "@components";
import Colors from "@theme/colors";
import { Text } from "@components";


interface Props {
    title: string;
    icon: string;
    onPress?: () => void;
    title_method: string;
    color_title_method: string;

}
const RowTow = ({title, icon, onPress, title_method, color_title_method}: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
        <Block marginHorizontal={"_20"} marginVertical={"_10"}>
            <Row between center>
            <Row>
                <Icon name={icon} size={20} color={Colors.primary} type="fontAwesome"  />
                <Block m={"_10"}/>
                <Text color={"black"} fontSize={12} >{title}</Text>
            </Row>
            <Row>
                
                <Text style={{fontSize: 12, color: color_title_method ?? Colors.green_300}} >{title_method}</Text>
                <Block m={"_10"}/>
                <Icon name="arrow-right" size={20} color={Colors.black} type="fontAwesome" />
            </Row>
            </Row>
            
        </Block>
        </TouchableOpacity>
    );
}

export default RowTow;