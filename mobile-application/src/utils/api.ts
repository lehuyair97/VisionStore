import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
  ResponseType,
} from "axios";
import { getAccessToken } from "./token";
import axios from "axios";

export const CLIENT_ID = "";

export const REQUEST_URL = {
  PUSH_NOTIFICATION: "/send-notification",
  REFRESH_TOKEN: "/refreshtoken",
  SIGN_IN: "/login",
  SIGN_IN_WITH_GOOGLE: "/sign-in-google",
  CREATE_USER: "/users",
  CATEGORY: "/category",

  GET_BRANDS: "/brands",
  GET_CART: "/cart",
  CHANGE_QUANTITY_CART: "/cart/quantity",
  GET_CART_BY_USERID: (customerId: string) => `cart/users/${customerId}`,
  SEARCH: "/products/search",
  SEARCH_PRODUCT_OF_COMPONENT: (id) => `/products/components/search/${id}`,
  CREATE_USER_WITH_IMAGE: "/users/upload",
  GET_ALL_USERS: "/users",

  GET_USER_BY_ID: (id) => `/users/${id}`,
  CHANGE_PASSWORD: (id) => `/change_pw/${id}`,
  UPDATE_FAVORITE: (id) => `/favorites/${id}`,
  UPDATE_INFO: (id) => `/updateInfo/${id}`,
  UPDATE_ADDRESS: (id) => `/users/update-address/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  DELETE_ADDRESS: (id) => `/users/remove-address/${id}`,
  GET_ALL_CATEGORIES: "/category",
  GET_CATEGORY_BY_ID: (id) => `/category/${id}`,
  CREATE_CATEGORY: "/category",
  UPDATE_CATEGORY: (id) => `/category/${id}`,
  DELETE_CATEGORY: (id) => `/category/${id}`,
  GET_ALL_SUBCATEGORIES: "/subcategory",
  GET_SUBCATEGORY_BY_ID: (id) => `/subcategory/${id}`,
  GET_SUBCATEGORIES_BY_CATEGORY_ID: (categoryId) =>
    `/subcategory/category/${categoryId}`,
  GET_SUBCATEGORIES_BY_TYPE: (type) => `/subcategory/type/${type}`,
  CREATE_SUBCATEGORY: "/subcategory",
  UPDATE_SUBCATEGORY: (id) => `/subcategory/${id}`,
  DELETE_SUBCATEGORY: (id) => `/subcategory/${id}`,
  GET_ALL_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id) => `/products/${id}`,
  GET_PRODUCT_BY_BRAND_ID: ({ categoryID, brandID }) =>
    `/products-brands?categoryId=${categoryID}&brandId=${brandID}`,
  GET_PRODUCT_GROUPED: (categoryId: string) =>
    `/productsgrouped?categoryId=${categoryId}`,
  GET_PRODUCT_GROUPED_BY_CHILD_SUBCATEGORY: (subCategory_child_ID: String) =>
    `/productsgroupedbySubCategory?subCategory_child_ID=${subCategory_child_ID}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id) => `/products/${id}`,
  DELETE_PRODUCT: (id) => `/products/${id}`,
  GET_ALL_CARDS: "/cart",
  GET_CARD_BY_ID: (id) => `/cart/${id}`,
  GET_CARDS_BY_USER_ID: (customerId) => `/cart/users/${customerId}`,
  CREATE_CARD: "/cart",
  UPDATE_CARD: (id) => `/cart/${id}`,
  DELETE_CARD: (id) => `/cart/${id}`,
  GET_ALL_ORDERS: "/orders",
  GET_ORDER_BY_ID: (id) => `/orders/${id}`,
  CREATE_ORDER: "/orders",
  UPDATE_ORDER_STATUS: (id) => `/orders/status/${id}`,
  GET_ORDERS_BY_STATUS: "/orders/status",
  DELETE_ORDER: (id) => `/orders/${id}`,
  GET_ACTIVE_VOUCHERS: "/active-voucher",
  GET_VOUCHERS: "/voucher",
  USE_VOUCHER: (code, userID) => `/use-voucher?code=${code}&userID=${userID}`,
  ADD_COMMENT: (productID) => `/comment?productID=${productID}`,
  GET_COMMENT: (productID) => `/comment-by-product/${productID}`,
  CREATE_NOTIFICATION: () => `/notifications`,
  GET_ALL_NOTIFICATIONS: (limit = 20, page = 1) =>
    `/notifications?limit=${limit}&page=${page}`,
  GET_NOTIFICATIONS_BY_USER_ID: (userId, limit = 20, page = 1) =>
    `/notifications/user/${userId}?limit=${limit}&page=${page}`,
  MARK_AS_READ: (id) => `/notifications/${id}/read`,
  DELETE_NOTIFICATION_BY_ID: (id) => `/notifications/${id}`,
  RECENT_PRODUCTS: (id) => `/users/recentproducts/${id}`,
};

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.78:3000/api";
export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  unmountSignal?: AbortSignal;
  headers?: Partial<AxiosRequestHeaders>;
  responseType?: ResponseType;
};
const api = async ({
  url,
  method,
  data,
  unmountSignal,
  headers,
  ...rest
}: AxiosParams) => {
  const accessToken = await getAccessToken();
  const authorization = data?.did
    ? data?.did
    : accessToken
    ? `Bearer ${accessToken}`
    : null;

  const request = {
    baseURL: BASE_URL,
    url,
    method,
    data,
    signal: unmountSignal,
    ...(authorization
      ? {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            ...headers,
          },
        }
      : headers
      ? { headers }
      : {}),
  };
  try {
    const response = await axios(request as AxiosRequestConfig);
    return response.data;
  } catch (error: any) {
    if (__DEV__) {
      console.log("from server", error?.response?.data);
    }
    if ([500, 502].includes(error?.response?.status)) {
      console.log("Máy chủ gặp sự cố, vui lòng thử lại sau.");
    }
    throw error;
  }
};
export default api;
