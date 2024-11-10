import { Button, Row, Text } from "@components"; // Giữ nguyên import này
import Block from "@components/block"; // Giữ nguyên import này
import Colors from "@theme/colors"; // Giữ nguyên import này
import { StyleSheet } from "react-native";

const Pay = ({ finalTotal }: { finalTotal: number }) => {
    return (
        <Block alignItems="flex-end">
            <Row center>
                <Block style={styles.paymentInfo}>
                    <Block m="_10" />
                    <Text style={styles.paymentText}>Thanh toán</Text>
                    <Block m="_3" />
                    <Text style={styles.totalText}>{finalTotal} VNĐ</Text>
                </Block>
                <Block style={styles.paymentButtonContainer}>
                    <Button>
                        <Text style={styles.buttonText}>Thanh toán</Text>
                        <Block m="_10" />
                    </Button>
                </Block>
            </Row>
        </Block>
    );
}

const styles = StyleSheet.create({
    paymentInfo: {
        paddingRight: 10,
        height: 80,
        backgroundColor: Colors.background_fit_finder,
        flex: 1,
        alignItems: "flex-end",
    },
    paymentText: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: "bold",
    },
    totalText: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: "normal",
    },
    paymentButtonContainer: {
        width: "35%",
        height: 80,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        color: Colors.container,
        fontWeight: "bold",
    },
});

export default Pay; // Giữ nguyên export này