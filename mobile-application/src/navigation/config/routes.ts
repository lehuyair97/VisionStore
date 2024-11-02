import Payment from "@features/common/payment/page/payment";
import { Auth, Common } from "../../features";
import { createEnum } from "./types";
import BottomTabScenes from "@navigation/scenes/bottom-tab-scenes";
import DetailProduct from "@features/common/detail_product/detail_product";
import Search from "@features/common/search/page/search";

export const notLoggedInScreens = {
  Signin: Auth.Signin,
  SignUp: Auth.Signup,

};

export const loggedInScreens = {
  BottomTab: BottomTabScenes,
  Payment: Payment,
  DetailProduct: DetailProduct,
  Search: Search,
};

export const ROUTES = createEnum({
  //Auth Rotues
  Signin: "Signin",
  SignUp: "SignUp",

  //Common Routes
  Home: "Home",
  DetailProduct:"DetailProduct",
  Search: "Search",
});
