import { Icon, MainContainer, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import { goBack } from "@navigation/config/navigation-service";
import Colors from "@theme/colors";
import { TouchableOpacity } from "react-native";

interface AppBarProps {
  title?: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  iconRightName?: string;
  colorIconLeft?: string;
  colorIconRight?: string;
  isBackground?: boolean;
}

const AppBar = ({
  title,
  iconLeft,
  iconRight,
  iconRightName,
  isBackground,
  colorIconLeft,
  colorIconRight,
}: AppBarProps) => {
  return (
    <Block
      bg={isBackground ? "primary" : "transparent"}
      paddingTop={"_40"}
      paddingBottom={"_25"}
      paddingHorizontal={"_20"}
    >
      <Row between center>
        <TouchableOpacity onPress={goBack}>
          <Icon
            type="fontAwesome"
            name="arrow-left"
            size={24}
            color={colorIconLeft ?? Colors.container}
          />
        </TouchableOpacity>
        <Text fontSize={16} fontWeight={"600"}>
          {title}
        </Text>
        {iconRight && iconRight ? (
          <Icon
            type="fontAwesome"
            name={iconRightName}
            size={20}
            color={colorIconRight ?? Colors.container}
          />
        ) : (
          <Block width={20} />
        )}
      </Row>
    </Block>
  );
};

export default AppBar;
