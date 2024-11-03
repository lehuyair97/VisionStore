import { Row } from "@components"
import Text from "@components/text"
import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"

const CustomControllerNums = ({decreaseQuantity, increaseQuantity, quantity}: {decreaseQuantity: () => void, increaseQuantity: () => void, quantity: number}) => {
    return (
        <Row center between>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text fontSize={16} fontWeight={"bold"} color="black2A">-</Text>
    </TouchableOpacity>
    <Text fontSize={16} fontWeight={"bold"} color="black2A">{quantity}</Text>
    <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
        <Text fontSize={16} fontWeight={"bold"} color="black2A">+</Text>
    </TouchableOpacity>
    </Row>
    )
}

const styles = StyleSheet.create({
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
   
});

export default CustomControllerNums;