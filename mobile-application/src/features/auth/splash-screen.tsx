import { localImages } from "@assets/icons/images";
import { MainContainer, Block, Text, Button } from "@components";
import { navigate, replace } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <MainContainer>
      <Block
        flex={1}
        mx="l"
        gap="_10"
        alignItems={"center"}
        justifyContent={"center"}
        mb={'_60'}
      >
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().logo}
        />
        <Text
          color={"black"}
          fontSize={52}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Vision Store
        </Text>
        <Text
          color={"black"}
          fontSize={18}
          textAlign={"center"}
          fontWeight={"500"}
          fontStyle={"italic"}
        >
          Thế giới đồ công nghệ cho bạn
        </Text>
      </Block>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
