import { Component, FC } from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

import Block from "../block";
import theme from "@theme";
import { getIconComponent } from "@assets/icons";
import { IconComponentProps } from "./type";

const Icon: FC<IconComponentProps> = (props) => {
  const {
    type,
    name,
    color = theme.colors.text,
    size,
    disabledStyle,
    style,
    bg,
    activeOpacity = 0.6,
    ButtonComponent = props.onPress
      ? Platform.select<typeof Component>({
          android: TouchableNativeFeedback,
          default: TouchableOpacity,
        })
      : Block,
    ...rest
  } = props;

  const IconComponent = getIconComponent(type);

  const initContainerStyle = StyleSheet.flatten([
    disabledStyle && disabledStyle,
    style,
  ]);

  return (
    <ButtonComponent
      {...rest}
      {...{ activeOpacity }}
      {...(props.disabled && { opacity: 0.5 })}
      bg={bg}
      overflow="hidden"
      style={Platform.OS === "android" ? {} : initContainerStyle}
    >
      <Block
        bg={bg}
        overflow="hidden"
        style={Platform.OS === "android" ? initContainerStyle : {}}
      >
        <IconComponent
          name={name}
          size={size || 0}
          color={theme.colors[color as string] || color}
        />
      </Block>
    </ButtonComponent>
  );
};

export default Icon;
