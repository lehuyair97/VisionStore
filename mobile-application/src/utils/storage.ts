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

export const getUserInfoStorage = async (retryCount = 3): Promise<User | undefined> => {
  let attempts = 0;
  while (attempts < retryCount) {
    try {
      const userInfo = await AsyncStorage.getItem(userInfoStorage);
      if (userInfo) return JSON.parse(userInfo);
    } catch (e) {
      console.error("Error retrieving data from AsyncStorage:", e);
    }
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  console.warn("Unable to retrieve user info after retries.");
  return undefined;
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

