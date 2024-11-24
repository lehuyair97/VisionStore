import { User } from "@hooks/auth/use-sign-in";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userInfoStorage = "user_info_storage";

export const setUserInfoStorage = async (user: User) => {
  try {
    await AsyncStorage.setItem(userInfoStorage, JSON.stringify(user));
  } catch (e) {
    console.error("Error saving user info", e);
  }
};

export const getUserInfoStorage = async ()=> {
    try {
      const userInfo = await AsyncStorage.getItem(userInfoStorage);
      if (userInfo) return JSON.parse(userInfo);
    } catch (e) {
      console.error("Error retrieving data from AsyncStorage:", e);
    }
  await new Promise(resolve => setTimeout(resolve, 200));
  console.warn("Unable to retrieve user info after retries.");
  return null;
};


