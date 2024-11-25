import { AxiosParams } from "./api";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";

const API_KEY = "c09eacbc-a682-11ef-9834-7e8875c3faf5";
const BaseURL = "https://online-gateway.ghn.vn/shiip/public-api";
const BaseURL2 = "https://online-gateway.ghn.vn/shiip/public-api/v2";

const GHN_API = async ({ url, method, data, headers }: AxiosParams) => {
  const request = {
    baseURL: BaseURL2,
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      token: "c09eacbc-a682-11ef-9834-7e8875c3faf5",
      ShopId: 5467966,
    },
  };
  try {
    const res = await axios(request as AxiosRequestConfig);
    return res.data;
  } catch (error: any) {
    if ([500, 502].includes(error?.response?.status)) {
      console.log("Máy chủ gặp sự cố, vui lòng thử lại sau.");
    }
    throw error;
  }
};

export const GHN_LOCATION_API = async ({
  url,
  method,
  data,
  headers,
}: AxiosParams) => {
  const request = {
    baseURL: BaseURL,
    url,
    method,
    data,
    headers: { ...headers, "Content-Type": "application/json", Token: API_KEY },
  };
  try {
    const res = await axios(request as AxiosRequestConfig);
    return res.data;
  } catch (error: any) {
    if ([500, 502].includes(error?.response?.status)) {
      console.log("Máy chủ gặp sự cố, vui lòng thử lại sau.");
    }
    throw error;
  }
};
export default GHN_API;
