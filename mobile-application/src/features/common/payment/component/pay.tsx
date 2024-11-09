import { Button, Row, Text } from "@components"; // Giữ nguyên import này
import Block from "@components/block"; // Giữ nguyên import này
import Colors from "@theme/colors"; // Giữ nguyên import này

const Pay = ({finalTotal}: {finalTotal: number}) => {
    return (
        <Block alignItems={"flex-end"} >
            <Row center  >
                <Block paddingRight={"_10"}  height={90} backgroundColor={"background_fit_finder"} flex={1} alignItems={"flex-end"}>
                    <Block m={"_10"}/>
                    <Text fontSize={14} color={"black"} fontWeight={"bold"}>Thanh toán</Text>
                    <Block m={"_3"}/>
                    <Text fontSize={14} color={"primary"} fontWeight={"normal"}>{finalTotal} VNĐ</Text>
                </Block>
                <Block style={{borderRadius: 0, width: "35%", height: "100%", backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center",marginTop: 20}}>
                <Button>
                    <Text textAlign={"center"} color={"container"} fontWeight={"bold"}>Thanh toán</Text>
                    <Block m={"_10"}/>
                </Button>
                </Block>
                
            </Row>
        </Block>
    );
}

export default Pay; // Giữ nguyên export này