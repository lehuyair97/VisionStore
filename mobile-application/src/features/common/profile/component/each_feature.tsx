import React from 'react';
import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import Colors from "@theme/colors";
import { StyleSheet, TouchableOpacity } from "react-native";

interface EachFeatureProps {
    icon: string;
    title: string;
    onPress: () => void;
}

const EachFeature = ({ icon, title, onPress }: EachFeatureProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.shadowContainer}>
            <Block p={"_10"} style={styles.block}>
                <Row between>
                    <Row center>
                        <Icon type="fontAwesome" name={icon} size={20} color={Colors.black2A} />
                        <Block ml={"_15"}/>
                        <Text style={styles.textR}>{title}</Text>
                    </Row>
                    <Icon type="fontAwesome" name="angle-right" size={20} color={Colors.black2A} />
                </Row>
            </Block>
        </TouchableOpacity>
    );
}

export default EachFeature;

const styles = StyleSheet.create({
    textR: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.black2A,
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4, // Đặt giá trị height để bóng chỉ xuất hiện ở phía dưới
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8, // Tăng giá trị để bóng rõ hơn trên Android
    },
    block: {
        backgroundColor: Colors.container, // Đảm bảo có màu nền để bóng rõ hơn
        borderRadius: 10, // Thêm bo góc để bóng mềm mại hơn
    }
});