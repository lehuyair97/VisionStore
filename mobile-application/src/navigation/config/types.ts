import { ParamListBase, RouteConfig } from "@react-navigation/native";

export function createEnum<T extends Record<string, string>>(o: T): T {
  return o;
}

export type BottomTabRoutes = {
  HomeStack: {
    Home: undefined;
  };
  BuildPCStack: {
    BuildPC: undefined;
  };
  CartStack: {
    Cart: undefined;
  };
  ProfileStack: {
    Profile: undefined;
  };
};

export type signInForm = {
  email: string;
  password: string;
  device_token?: any;
};

export type signUpForm = {
  email: string;
  display_name: string;
  password: string;
  re_password: string;
};

export type ScreenOptions<T extends ParamListBase, K extends {}> = {
  [screenName: string]: RouteConfig<T, keyof T, any, K, any>["options"];
};
export type TScreen = {
  name: string;
  component: () => JSX.Element;
};
