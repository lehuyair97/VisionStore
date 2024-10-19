import { Block, Row, Text } from "@components";

interface TextRowProps {
    title: string;
    price: string;
    size?: number;
    bold?: boolean;
    color?: string;
}

const TextRow = ({title, price, size = 12, bold = false, color = "black"}: TextRowProps) => {
    return (
        <Block paddingVertical={"_10"}> 
            <Row between center>
                <Text fontSize={size} color={"black"} fontWeight={bold ? "bold" : "normal"}>{title}</Text>
                <Text fontSize={size} style={{color: color}} >{price}</Text>
            </Row>
        </Block>
    );
}

export default TextRow;