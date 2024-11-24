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
import RecentProducts from "@features/common/profile/component/recent-products";
import PaymentManagerment from "@features/common/profile/component/payment-managerment";
import DeliveryManagerment from "@features/common/profile/component/delivery-managerment";
import PaymentScreen from "@features/common/payment/component/vnpay-checkout";
import OrderCancle from "@features/common/profile/component/order-managerment/order-cancle";
import OrderDelivered from "@features/common/profile/component/order-managerment/order-delivered";
import OrderShipping from "@features/common/profile/component/order-managerment/order-shipping";
import OrderPending from "@features/common/profile/component/order-managerment/order-progress";
import OrderManagerment from "@features/common/profile/component/order-managerment";
import ProductReview from "@features/common/profile/component/product-review";

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
  RecentProducts: RecentProducts,
  PaymentManagerment: PaymentManagerment,
  DeliveryManagerment: DeliveryManagerment,
  PaymentScreen: PaymentScreen,
  OrderCancle: OrderCancle,
  OrderPending: OrderPending,
  OrderShipping: OrderShipping,
  OrderDelivered: OrderDelivered,
  OrderManagerment: OrderManagerment,
  ProductReview:ProductReview
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
  RecentProducts: "RecentProducts",
  PaymentManagerment: "PaymentManagerment",
  DeliveryManagerment: "DeliveryManagerment",
  OrderCancle: "OrderCancle",
  OrderPending: "OrderPending",
  OrderShipping: "OrderShipping",
  OrderDelivered: "OrderDelivered",
  OrderManagerment: "OrderManagerment",
  ProductReview:"ProductReview"
});
