import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const setAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
  } catch (error) {
    console.error("Error setting access token", error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error getting access token", error);
    return null;
  }
};

export const setRefreshToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN, token);
  } catch (error) {
    console.error("Error setting refresh token", error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  } catch (error) {
    console.error("Error getting refresh token", error);
    return null;
  }
};

export const deleteAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error deleting access token", error);
  }
};

export const deleteRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem(REFRESH_TOKEN);
  } catch (error) {
    console.error("Error deleting refresh token", error);
  }
};

type DecodedToken = {
  exp: number;
  [key: string]: any;
};

export const validateToken = async (): Promise<boolean> => {
  try {
    const token = await getAccessToken();
    if (!token) return false;
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !!(decoded.exp > currentTime);
  } catch (error) {
    return false;
  }
};
