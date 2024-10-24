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
  REFRESH_TOKEN: "/refreshtoken",
  SIGN_IN: "/login",
  SIGN_IN_WITH_GOOGLE: "/auth/google",
  CREATE_USER: "/users",
  CATEGORY: "/category",
  CREATE_USER_WITH_IMAGE: "/users/upload",
  GET_ALL_USERS: "/users",
  GET_USER_BY_ID: (id) => `/users/${id}`,
  CHANGE_PASSWORD: (id) => `/change_pw/${id}`,
  UPDATE_FAVORITE: (id) => `/favorites/${id}`,
  UPDATE_INFO: (id) => `/updateInfo/${id}`,
  DELETE_USER: (id) => `/users/${id}`,
  GET_ALL_CATEGORIES: "/category",
  GET_CATEGORY_BY_ID: (id) => `/category/${id}`,
  CREATE_CATEGORY: "/category",
  UPDATE_CATEGORY: (id) => `/category/${id}`,
  DELETE_CATEGORY: (id) => `/category/${id}`,
  GET_ALL_SUBCATEGORIES: "/subcategory",
  GET_SUBCATEGORY_BY_ID: (id) => `/subcategory/${id}`,
  CREATE_SUBCATEGORY: "/subcategory",
  UPDATE_SUBCATEGORY: (id) => `/subcategory/${id}`,
  DELETE_SUBCATEGORY: (id) => `/subcategory/${id}`,
  GET_ALL_PRODUCTS: "/products",
  GET_PRODUCT_BY_ID: (id) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id) => `/products/${id}`,
  DELETE_PRODUCT: (id) => `/products/${id}`,
  GET_ALL_ORDERS: "/orders",
  GET_ORDER_BY_ID: (id) => `/orders/${id}`,
  GET_ORDERS_BY_USER_ID: (customerId) => `/orders/users/${customerId}`,
  CREATE_ORDER: "/orders",
  UPDATE_ORDER: (id) => `/orders/${id}`,
  DELETE_ORDER: (id) => `/orders/${id}`,
};

const BASE_URL = "http://192.168.1.2:3000/api";

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
