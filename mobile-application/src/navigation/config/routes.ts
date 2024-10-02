import { Auth, Common } from "../../features";
import { createEnum } from "./types";
import BottomTabScenes from "@navigation/scenes/bottom-tab-scenes";

export const notLoggedInScreens = {
  SignUp: Auth.Signup,
  Signin: Auth.Signin,
};

export const loggedInScreens = {
  BottomTab: BottomTabScenes,
  Home: Common.Home,
};

export const ROUTES = createEnum({
  //Auth Rotues
  Signin: "Signin",

  //Common Routes
  Home: "Home",
});
