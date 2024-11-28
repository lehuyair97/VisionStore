import { Row, Icon, MainContainer, Block, Text } from "@components";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"; // Thêm StyleSheet vào đây
import { commonStyles } from "../styles/styles";
import useCommon from "@hooks/common/use-common";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { localImages } from "@assets/icons/images";
interface HeaderProfileProps {
  avatar?: string;
  displayName?: string;
  email?: string;
  onPressSetting: () => void;
}

const HeaderProfile = ({
  avatar,
  displayName,
  email,
  onPressSetting,
}: HeaderProfileProps) => {
  const { messageUnread } = useCommon();
  return (
    <Block>
      <MainContainer
        edges={EDGES.LEFT_RIGHT}
        style={[commonStyles.container, { paddingTop: 40, paddingRight: 10 }]}
      >
        <Row between>
          <Row center>
            <Image
              source={avatar ? { uri: avatar }: localImages().default_avatar}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <Block ml={"_15"}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>{email}</Text>
            </Block>
          </Row>
          <Row center>
            <TouchableOpacity onPress={onPressSetting}>
              <Icon
                type="fontAwesome"
                name="gear"
                size={24}
                color={Colors.black2A}
              />
            </TouchableOpacity>
            <Block m={"_15"} />
            <TouchableOpacity
              onPress={() => navigate(ROUTES.NotificationScreen)}
            >
              <Icon
                type="fontAwesome"
                name="bell"
                size={20}
                color={Colors.black2A}
              />
              <Block
                position={"absolute"}
                top={-5}
                right={-4}
                width={14}
                height={14}
                borderRadius={"full"}
                backgroundColor={"red_500"}
                alignItems={"center"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Text textAlign={"center"} fontSize={8}>
                  {messageUnread ?? messageUnread}
                </Text>
              </Block>
            </TouchableOpacity>
          </Row>
        </Row>
      </MainContainer>
    </Block>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 19,
    fontWeight: "600",
    color: "black",
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
  },
});

export default HeaderProfile;
