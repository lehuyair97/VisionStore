import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageStyle,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { makeStyles } from "@theme";
import { IconComponentProps } from "../icon/type";
import Row from "../row";
import Icon from "../icon";
import Text from "../text";

type ButtonProps = TouchableOpacityProps & {
  label?: string;
  isLoadding?: boolean;
  leadingIcon?: IconComponentProps;
  trailingIcon?: IconComponentProps;
  leadingImage?: number;
  trailingImage?: number;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  leadingImageStyle?: ImageStyle;
  trailingImageStyle?: ImageStyle;
  isOutline?: boolean;
  activityIndicatorSize?: number;
  noneStyle?: boolean;
};

const Button = React.forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const {
    label,
    leadingIcon,
    isLoadding,
    textStyle,
    trailingIcon,
    leadingImage,
    trailingImage,
    leadingImageStyle,
    trailingImageStyle,
    activityIndicatorSize,
    isOutline,
    buttonStyle,
    noneStyle,
    children,
    ...touchableProps
  } = props;
  const styles = useStyles();
  return (
    <TouchableOpacity
      ref={ref}
      style={
        noneStyle
          ? [buttonStyle]
          : [styles.button, isOutline && styles.buttonOutline, buttonStyle]
      }
      {...touchableProps}
    >
      <Row justifyContent="space-between" alignItems="center">
        {leadingImage && (
          <Image
            style={[styles.image as ImageStyle, leadingImageStyle]}
            source={leadingImage}
          />
        )}
        {leadingIcon && (
          <Icon
            type={leadingIcon?.type}
            name={leadingIcon?.name}
            size={24}
            color={leadingIcon?.color ?? "gray888"}
          />
        )}
        {label && (
          <Text fontSize={16} color="black" px="_10" style={textStyle}>
            {label}
          </Text>
        )}
        {trailingImage && (
          <Image
            style={[styles.image as ImageStyle, trailingImageStyle]}
            source={trailingImage}
          />
        )}
        {trailingIcon && (
          <Icon
            type={trailingIcon?.type}
            name={trailingIcon?.name}
            size={24}
            color={trailingIcon?.color ?? "gray888"}
          />
        )}

        {isLoadding && (
          <ActivityIndicator size={activityIndicatorSize ?? "small"} />
        )}
      </Row>
      {children}
    </TouchableOpacity>
  );
});

export default Button;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing._12,
    alignItems: "center",
    borderRadius: theme.borderRadii.l,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: theme.spacing._12,
    alignItems: "center",
    borderColor: theme.colors.gray_300,
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
  },
}));
