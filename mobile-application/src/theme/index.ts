/* eslint-disable no-unused-vars */
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { DefaultTheme } from "@react-navigation/native";
import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";

import Colors from "./colors";
import { Spacing } from "./layout";

export {
  ThemeProvider,
  createBox,
  createRestyleComponent,
  createText,
  createTheme,
  createVariant,
} from "@shopify/restyle";

export const theme = createTheme({
  colors: {
    ...Colors,
  },
  spacing: {
    ...Spacing,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: "text",
      fontSize: 12,
    },
    label: {
      fontSize: 12,
      fontWeight: "600",
      color: "title",
      lineHeight: 20,
    },
    helperLabel: {
      fontSize: 12,
      lineHeight: 16,
      color: "gray888",
    },
    header: {
      fontSize: 48,
      fontWeight: "bold",
      color: "title",
    },
    footer: {
      textAlign: "left",
      color: "gray888",
      lineHeight: 20,
      textDecorationLine: "underline",
      fontSize: 14,
    },
    showMore: {
      fontSize: 12,
      lineHeight: 16,
      color: "blue_500",
      textAlign: "right",
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "700",
      color: "text",
    },
    progress_step: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      textAlign: "center",
    },
    title: {
      marginTop: 5,
      alignSelf: "stretch",
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: "title",
      textAlign: "left",
    },
    titleHeader: {
      fontSize: 16,
      fontWeight: "600",
      color: "title",
    },
    titleEmpty: {
      fontSize: 18,
      fontWeight: "bold",
      color: "secondary",
    },
    contentEmpty: {
      fontSize: 14,
      color: "gray888",
      width: 246,
      textAlign: "center",
    },
    font14: {
      fontSize: 14,
    },
    font20: {
      fontSize: 20,
    },
    font22: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "700",
    },
  },
  cardVariants: {
    defaults: {},
    primary: {
      backgroundColor: "blue_500",
    },
    secondary: {
      backgroundColor: "cardSecondaryBackground",
    },
  },
  borderRadii: {
    none: 0,
    xxs: 2,
    xs: 4,
    s: 6,
    m: 8,
    l: 10,
    _14: 14,
    _28: 28,
    xl: 33,
    xxl: 40,
    _3xl: 50,
    full: 99999,
  },
  zIndices: {
    _1: 1,
    full: 9999,
  },
});
type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
  },
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T & NamedStyles<T> //work fine
) => {
  return () => {
    return styles(theme);
  };
};

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export type Theme = typeof theme;

export default theme;
