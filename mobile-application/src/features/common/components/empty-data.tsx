import { Block, Text } from "@components";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function EmptyData({
  content,
  title,
}: {
  title?: string;
  content: string;
}) {
  return (
    <Block
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      marginBottom={"_80"}
      gap={"_20"}
    >
      <Text color="primary" fontWeight={"bold"} fontSize={16}>
        {title}
      </Text>
      <Text color="black">{content}</Text>
      <TouchableOpacity
        onPress={() => {
          navigate(ROUTES.Home);
        }}
      >
        <Text
          color="primary"
          fontWeight={"bold"}
          fontSize={16}
          textDecorationLine={"underline"}
        >
          Mua sắm ngay
        </Text>
      </TouchableOpacity>
    </Block>
  );
}
