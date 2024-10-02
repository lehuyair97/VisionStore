import { TextStyle, ViewProps } from "react-native";

import Block from "../block";
import Text from "../text";
import theme from "@theme";
import React from "react";

type DividerProps = ViewProps & {
  middleText?: string;
  middleTextStyle?: TextStyle;
  lineHeight?: number;
  lineColor?: keyof typeof theme.colors;
  hasTwoLine?: boolean;
};

const Divider = (props: DividerProps, ref: React.Ref<any>) => {
  const {
    middleText,
    middleTextStyle,
    lineHeight,
    lineColor,
    hasTwoLine,
    ...viewProps
  } = props;

  return (
    <Block ref={ref} flexDirection="row" alignItems="center" {...viewProps}>
      <Block
        flex={1}
        height={lineHeight ?? 1.5}
        backgroundColor={lineColor ?? "gray888"}
      />
      {middleText && (
        <Text fontSize={16} color="black" px="_10" style={middleTextStyle}>
          {middleText}
        </Text>
      )}
      {hasTwoLine && (
        <Block
          flex={1}
          height={lineHeight ?? 1.5}
          backgroundColor={lineColor ?? "gray888"}
        />
      )}
    </Block>
  );
};

export default React.forwardRef(Divider);