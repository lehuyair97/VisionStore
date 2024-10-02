import { User } from "@hooks/auth/use-sign-in";
import { CheckInStatus } from "@context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userInfoStorage = "user_info_storage";
const checkInStatusStorage = "checkin_status_storage"

export const setUserInfoStorage = async (user: User) => {
  try {
    await AsyncStorage.setItem(userInfoStorage, JSON.stringify(user));
  } catch (e) {
    console.error("Error saving user info", e);
  }
};

export const getUserInfoStorage = async (): Promise<User | undefined> => {
  try {
    const userInfo = await AsyncStorage.getItem(userInfoStorage);
    return userInfo ? JSON.parse(userInfo) : undefined;
  } catch (e) {
    console.error("Error to get data", e);
    return undefined;
  }
};

export const setCheckInStatusStorage = async (data: CheckInStatus) => {
  try {
    await AsyncStorage.setItem(checkInStatusStorage, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving user info", e);
  }
};

export const getCheckInStatusStorage = async (): Promise<CheckInStatus | undefined> => {
  try {
    const checkInStatus = await AsyncStorage.getItem(checkInStatusStorage);
    return checkInStatus ? JSON.parse(checkInStatus) : undefined;
  } catch (e) {
    console.error("Error to get data", e);
    return undefined;
  }
};

