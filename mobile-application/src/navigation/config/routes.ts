import Payment from "@features/common/payment/page/payment";
import { createEnum } from "./types";
import BottomTabScenes from "@navigation/scenes/bottom-tab-scenes";
import DetailProduct from "@features/common/detail_product/detail_product";
import Search from "@features/common/search/page/search";
import DetailBrand from "@features/common/detail_brand/page/detail_brand";
import { Signin, Signup } from "@features/auth";
import OrderSuccessfully from "@features/common/order-sucessfully";
import NotificationScreen from "@features/common/notification-screen";
import EditProfile from "@features/common/edit-profile";
import ChangePassword from "@features/common/change_password/page/change_password";
export const notLoggedInScreens = {
  Signin: Signin,
  SignUp: Signup,
};

export const loggedInScreens = {
  BottomTab: BottomTabScenes,
  Payment: Payment,
  DetailProduct: DetailProduct,
  Search: Search,
  DetailBrand: DetailBrand,
  OrderSuccessfully: OrderSuccessfully,
  NotificationScreen: NotificationScreen,
  EditProfile: EditProfile,
  ChangePassword: ChangePassword,
};

export const ROUTES = createEnum({
  //Auth Rotues
  Signin: "Signin",
  SignUp: "SignUp",

  //Common Routes
  BottomTabScenes: "BottomTabScenes",
  Home: "HomeStack",
  DetailProduct: "DetailProduct",
  Search: "Search",
  DetailBrand: "DetailBrand",
  BuildPC: "BuildPCStack",
  OrderSuccessfully: "OrderSuccessfully",
  NotificationScreen: "NotificationScreen",
  EditProfile: "EditProfile",
  ChangePassword: "ChangePassword",
});
