/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import theme from "@theme";
import Row from "../row";
import Block from "../block";
import Icon from "../icon";
import Text from "../text";
import { InputProps } from "./type";
import { Helper } from "@utils/helper";

function TextInputComponent(props: InputProps, ref: any) {
  const inputRef = useRef<RNTextInput>(null);
  const {
    label,
    labelStyle,
    required,
    containerStyle,
    helperLabel,
    helperLabelStyle,
    error,
    errorStyle,
    showError,
    inputContainerStyle = {
      borderRadius: 8,
    },
    style,
    size = 15,
    disabled,
    disabledInputStyle,
    leftIcon,
    leftIconContainerStyle,
    onLeftIconPress,
    rightIcon,
    rightIconContainerStyle,
    onRightIconPress,
    secureTextEntry,
    onFocus,
    onBlur,
    hideFocus,
    numberOfLines,
    maxLength,
    value = "",
    boderSearch = false,
    errors = [],
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (ref && typeof ref !== "function") {
      ref.current = inputRef.current;
    }
  }, [ref]);

  const renderLabel = () => {
    if (typeof label === "string") {
      return (
        <Text mb="s" variant="label" style={labelStyle}>
          {label}
          {required && <Text color="red_500"> *</Text>}
        </Text>
      );
    }
    return label;
  };

  const renderHelperLabel = () => {
    return (
      <Text mt="x" variant="helperLabel" style={helperLabelStyle}>
        {helperLabel}
      </Text>
    );
  };

  const renderError = () => {
    if (typeof error === "string") {
      return (
        <Text mx="_5" color="red_500" mt="x" style={errorStyle}>
          {error}
        </Text>
      );
    }
    return error;
  };

  const renderErrorItem = (item: string) => {
    return (
      <Text key={item} mx="_5" color="red_500" mt="x" style={errorStyle}>
        {item}
      </Text>
    );
  };

  const inputInitStyle: ViewStyle = StyleSheet.flatten([
    {
      color: theme.colors.title,
      minHeight: 25,
      flex: 1,
      fontSize: size,
      borderRadius: 16,
      paddingLeft: leftIcon ? 30 : 10,
      paddingRight: rightIcon || props.secureTextEntry ? 44 : 15,
      justifyContent: "center",
      alignSelf: "center",
      paddingBottom: 0,
    },
    disabled && {
      backgroundColor: theme.colors.gray_500,
      color: theme.colors.gray_600,
    },
    disabled && disabledInputStyle,
    !!numberOfLines && {
      height: size * 1.6 * numberOfLines,
    },
    style,
  ]);

  const [secureEye, setSecureEye] = useState(true);

  const renderIcon = (isRight?: boolean) => {
    const defaultIconStyle: ViewStyle = {
      minHeight: 25,
      opacity: disabled ? 0.5 : 1,
      justifyContent: "center",
      alignItems: "center",
    };

    if (secureTextEntry && isRight && !rightIcon) {
      return (
        <Icon
          style={[defaultIconStyle, styles.secureIcon]}
          size={24}
          color="gray888"
          name={secureEye ? "eye" : "eye-off"}
          type="ionicons"
          onPress={() => setSecureEye((prev) => !prev)}
        />
      );
    }

    const [icon, iconStyle, onPressIcon] = isRight
      ? [rightIcon, rightIconContainerStyle, onRightIconPress]
      : [leftIcon, leftIconContainerStyle, onLeftIconPress];

    if (Helper.isIcon(icon)) {
      return (
        <Icon
          onPress={onPressIcon}
          style={StyleSheet.flatten([defaultIconStyle, iconStyle])}
          name={icon.name}
          size={icon.size || size}
          color={theme.colors[icon.color as string] || theme.colors.gray_300}
          type={icon.type}
        />
      );
    }

    return icon;
  };

  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const renderInput = () => {
    return (
      <RNTextInput
        ref={(e) => {
          inputRef.current = e;
          typeof ref === "function" && ref(e);
        }}
        {...rest}
        autoCapitalize="none"
        allowFontScaling={false}
        underlineColorAndroid="transparent"
        style={inputInitStyle}
        autoCorrect={false}
        placeholderTextColor={theme.colors.gray888}
        cursorColor={theme.colors.title}
        selectionColor={theme.colors.title}
        editable={props.editable ?? !disabled}
        value={value}
        onFocus={_onFocus}
        onBlur={_onBlur}
        maxLength={maxLength}
        secureTextEntry={
          rightIcon ? props.secureTextEntry : props.secureTextEntry && secureEye
        }
      />
    );
  };

  const renderHint = () => (
    <Text mr="x" mt="_5" color="gray888">
      {`${value.length}/${maxLength}`}
    </Text>
  );

  return (
    <Block style={containerStyle}>
      {!!label && renderLabel()}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Row
          center
          style={[
            {
              borderColor: boderSearch
                ? "transparent"
                : !hideFocus && showError
                ? theme.colors.red_500
                : isFocused
                ? theme.colors.blue_500
                : theme.colors.gray41,
              borderWidth: boderSearch ? 0 : 1,
            },
            inputContainerStyle,
          ]}
        >
          {leftIcon && (
            <Block position="absolute" left={0} width={20} zIndex="full">
              {renderIcon()}
            </Block>
          )}
          {renderInput()}
          {((rightIcon && !!value) || props.secureTextEntry) && (
            <Block position="absolute" right={0} width={20}>
              {renderIcon(true)}
            </Block>
          )}
        </Row>
      </TouchableWithoutFeedback>
      {Helper.isString(helperLabel) && renderHelperLabel()}
      <Row
        alignContent="flex-start"
        justifyContent={showError && error ? "space-between" : "flex-end"}
      >
        {showError && renderError()}
        {!!maxLength && renderHint()}
      </Row>
      {errors && errors.map((item) => renderErrorItem(item))}
    </Block>
  );
}

export const TextInput = forwardRef(TextInputComponent) as (
  props: InputProps & {
    ref?: React.Ref<RNTextInput>;
  }
) => React.ReactElement;

const styles = StyleSheet.create({
  secureIcon: {
    right: 20,
    minWidth: 30,
  },
});
