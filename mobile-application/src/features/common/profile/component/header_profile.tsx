import { Row } from "@components";
import Block from "@components/block";
import { View, Text, Image, StyleSheet } from "react-native"; // Thêm StyleSheet vào đây

interface HeaderProfileProps {
    avatar: string;
}

const HeaderProfile = ({ avatar }: HeaderProfileProps) => {
    return (
        <Block>
            <Row>
                <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
            </Row>
        </Block>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default HeaderProfile;