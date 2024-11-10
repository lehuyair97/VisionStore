import { IconType } from "@assets/icons";
import { Icon, Row, Text } from "@components";
import Colors from "@theme/colors";
import { TouchableOpacity } from "react-native";
import Block from "../../../../components/block";

interface Props {
  title: string;
  icon: string;
  iconType?: IconType;
  onPress?: () => void;
  title_method: string;
  color_title_method?: string;
  expectedDelivery?: string;
}
const RowTow = ({
  title,
  icon,
  iconType,
  onPress,
  title_method,
  color_title_method,
  expectedDelivery,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        paddingHorizontal={"_20"}
        paddingVertical={"_20"}
        marginBottom={"_15"}
        bg={"container"}
      >
        <Row between center>
          <Row center gap={"_10"}>
            <Icon
              name={icon}
              size={20}
              color={Colors.primary}
              type={iconType ?? "fontAwesome"}
            />

            <Block>
              <Text color={"black"} fontSize={12}>
                {title}
              </Text>
              {expectedDelivery && (
                <Text color={"green_400"}>
                  Nhận hàng dự kiến: {expectedDelivery}
                </Text>
              )}
            </Block>
          </Row>
          <Row>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: color_title_method ?? Colors.green_300,
              }}
            >
              {title_method}
            </Text>
            <Block m={"_10"} />
            <Icon
              name="arrow-right"
              size={20}
              color={Colors.black}
              type="fontAwesome"
            />
          </Row>
        </Row>
      </Block>
    </TouchableOpacity>
  );
};

export default RowTow;
