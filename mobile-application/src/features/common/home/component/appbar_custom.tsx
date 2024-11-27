import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import { goBack, navigate } from "@navigation/config/navigation-service";
import Colors from "@theme/colors";
import { TextStyle ,TouchableOpacity } from "react-native";
interface AppBarProps {
  title?: string;
  titleStyle?: TextStyle;
  iconLeft?: boolean;
  iconRight?: boolean;
  iconRightName?: string;
  colorIconLeft?: string;
  colorIconRight?: string;
  isBackground?: boolean;
  childrenLeft?: React.ReactNode;
  titleCenter?: boolean;
  paddingHorizontal?: number;
  childrenRight?: React.ReactNode;
  paddingVertical?: number;
}

const AppBarCustom = ({
  title,
  iconLeft,
  iconRight,
  iconRightName,
  isBackground,
  colorIconLeft,
  colorIconRight,
  childrenLeft,
  titleCenter,
  paddingHorizontal,
  childrenRight,
  titleStyle,
  paddingVertical,
}: AppBarProps) => {
  return (
    <Block
      bg={isBackground ? "primary" : "transparent"}
      paddingTop={"_5"}
      style={{
        paddingHorizontal: paddingHorizontal ?? 0,
        paddingVertical: paddingVertical ?? 0,
        paddingTop: 30,
      }}
    >
      <Block width={"100%"}>
        <Row>
          {iconLeft && (
            <TouchableOpacity onPress={goBack}>
              <Icon
                type="fontAwesome"
                name="arrow-left"
                size={20}
                color={colorIconLeft ?? Colors.container}
              />
            </TouchableOpacity>
          )}
          {childrenLeft && <Block>{childrenLeft}</Block>}
          <Block flex={1}>
            <Text
              style={[
                titleStyle,
                { alignSelf: titleCenter ? "center" : "flex-start" },
              ]}
              fontSize={16}
              color={isBackground ? "white255" : "black"}
              fontWeight={"500"}
            >
              {title}
            </Text>
          </Block>
          {childrenRight && <Row>{childrenRight}</Row>}
          {iconRight && (
            <Icon
              type="fontAwesome"
              name={iconRightName}
              size={20}
              color={colorIconRight ?? Colors.container}
            />
          )}
        </Row>
      </Block>
    </Block>
  );
};

export default AppBarCustom;
