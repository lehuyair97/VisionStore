import { Row, Icon, MainContainer } from "@components";
import Block from "@components/block";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { View, Text, Image, StyleSheet } from "react-native"; // Thêm StyleSheet vào đây
import { commonStyles } from "../styles/styles";

interface HeaderProfileProps {
    avatar: string;
    displayName: string;
    email: string
}

const HeaderProfile = ({ avatar, displayName, email }: HeaderProfileProps) => {
    return (
<Block>
        <MainContainer edges={EDGES.LEFT_RIGHT} style={[commonStyles.container, {paddingTop: 40}]}>
            <Row between >
                <Row center>
                    <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                    <Block ml={"_15"}>
                        <Text style={styles.name}>{displayName}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </Block>
                </Row>
                <Row center >
                <Icon type="fontAwesome" name="search" size={20} color={Colors.black2A} />
                <Block m={"_15"}/>
                <Icon type="fontAwesome" name="bell" size={20} color={Colors.black2A} />
                </Row>
            </Row>
        </MainContainer>
        </Block>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 19,
        fontWeight: "600",
    },
    email: {
        fontSize: 13,
        color: "gray",
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: Colors.white255,
    }
});

export default HeaderProfile;