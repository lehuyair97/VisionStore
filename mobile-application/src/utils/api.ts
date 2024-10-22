import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
  ResponseType,
} from "axios";
import { getAccessToken } from "./token";
import axios from "axios";

export const CLIENT_ID =
  "";
export const REQUEST_URL = {
  SIGN_IN: "/",
  SIGN_IN_WIth_GOOGLE: "/",
  CHECK_IN: "/",
  CATEGORY: "/category",
};
const BASE_URL = 'http://192.168.1.2:3000/api'


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
