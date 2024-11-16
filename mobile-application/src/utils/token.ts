import { jwtDecode } from "jwt-decode";
import { MMKV } from 'react-native-mmkv';


const storage = new MMKV();

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const setAccessToken = (token: string) => {
  try {
    storage.set(ACCESS_TOKEN, token);
  } catch (error) {
    console.error("Error setting access token", error);
  }
};

export const getAccessToken = (): string | null => {
  try {
    return storage.getString(ACCESS_TOKEN) || null;
  } catch (error) {
    console.error("Error getting access token", error);
    return null;
  }
};

export const setRefreshToken = (token: string) => {
  try {
    storage.set(REFRESH_TOKEN, token);
  } catch (error) {
    console.error("Error setting refresh token", error);
  }
};

export const getRefreshToken = (): string | null => {
  try {
    return storage.getString(REFRESH_TOKEN) || null;
  } catch (error) {
    console.error("Error getting refresh token", error);
    return null;
  }
};

export const deleteAccessToken = () => {
  try {
    storage.delete(ACCESS_TOKEN);
  } catch (error) {
    console.error("Error deleting access token", error);
  }
};

export const deleteRefreshToken = () => {
  try {
    storage.delete(REFRESH_TOKEN);
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
