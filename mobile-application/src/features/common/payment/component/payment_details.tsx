import { Block, Icon, Row, Text } from "@components";
import Colors from "@theme/colors";
import TextRow from "./text_row";
const PaymentDetails = () => {

    const totalPrice = [
        {
            title: "Tổng tiền hàng",
            price: "100.000đ"
        },
        {
            title: "Tổng tiền vận chuyển",
            price: "100.000đ"
        },
        {
            title: "Tổng tiền giảm giá",
            price: "100.000đ"
        }
    ];
    return (
        <Block backgroundColor={"container"} paddingHorizontal={"_20"} paddingVertical={"_15"} >
            <Row center>
                <Icon name="ticket" size={20} color={Colors.primary} type="fontAwesome" />
                <Block m={"_10"}/>
                <Text fontSize={14} color={"black"} fontWeight={"bold"}>Chi tiết thanh toán</Text>
            </Row>  
            <Block m={"_10"}/>
            {totalPrice.map((item, index) => (
                <TextRow key={index} title={item.title} price={item.price} />
            ))}
            <TextRow title="Tổng thanh toán" price="100.000đ" bold={true} size={16} color={Colors.primary}/>
        </Block>
    );
}

export default PaymentDetails;