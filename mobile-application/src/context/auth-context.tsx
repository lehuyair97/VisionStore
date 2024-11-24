import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import useRefreshToken from "@hooks/auth/use-refresh-token";
import useGetProfile from "@hooks/common/use-get-profile";
import { getUserInfoStorage, setUserInfoStorage } from "@utils/storage";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getRefreshToken,
  setAccessToken as setAccessTokenStorage,
  setRefreshToken as setRefreshTokenStorage,
  validateToken,
} from "../utils/token";
import { User } from "../hooks/auth/use-sign-in";

export type AuthenticationStatus =
  | "REFRESHING"
  | "AUTHENTICATED"
  | "UNAUTHENTICATED";

type TAuthContext = {
  authenticationStatus: AuthenticationStatus;
  accessToken?: string;
  handleLoginSuccess: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;
  setAuthenticationStatus: (status: AuthenticationStatus) => void;
  logout: () => Promise<void>;
  userInfo: User 
  setUserInfo: (user: User | null) => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>("UNAUTHENTICATED");
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const { submit: submitRefreshToken } = useRefreshToken();
  const { data: userData, refetchUserInfo } = useGetProfile(userInfo?._id || "");

  const refreshToken = useCallback(async () => {
    try {
      const storedRefreshToken = await getRefreshToken();
      if (storedRefreshToken) {
        const { accessToken } = await submitRefreshToken(storedRefreshToken);
        if (accessToken) {
          setAccessToken(accessToken);
          setAccessTokenStorage(accessToken);
          setAuthenticationStatus("AUTHENTICATED");
          await refetchUserInfo;
        }
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      setAuthenticationStatus("UNAUTHENTICATED");
    }
  }, [submitRefreshToken, refetchUserInfo]);
  const handleLoginSuccess = useCallback(
    async (data: { accessToken: string; refreshToken: string; user: User }) => {
      try {
        setAccessToken(data.accessToken);
        setUserInfo(data.user);
        setAuthenticationStatus("AUTHENTICATED");
        setAccessTokenStorage(data.accessToken);
        setRefreshTokenStorage(data.refreshToken);
        await setUserInfoStorage(data.user);
      } catch (error) {
        console.error("Handle login success failed:", error);
      }
    },
    []
  );

  const validateAndSetAuth = useCallback(async () => {
    try {
      const isValidToken = await validateToken();
      if (isValidToken) {
        setAuthenticationStatus("AUTHENTICATED");
        await refetchUserInfo();
      } else {
        await refreshToken();
      }
    } catch (error) {
      console.error("Validation failed:", error);
      setAuthenticationStatus("UNAUTHENTICATED");
    }
  }, [refreshToken, refetchUserInfo]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUserInfo = await getUserInfoStorage();
        if (storedUserInfo) {
          setUserInfo(storedUserInfo);
          await validateAndSetAuth();
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };
    initializeAuth();
  }, [validateAndSetAuth]);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData); 
    }
  }, [userData]);

  const logout = useCallback(async () => {
    try {
      deleteAccessToken();
      deleteRefreshToken();
      await setUserInfoStorage(null);
      setUserInfo(null);
      setAuthenticationStatus("UNAUTHENTICATED");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      authenticationStatus,
      setAuthenticationStatus,
      logout,
      accessToken,
      handleLoginSuccess,
      userInfo,
      setUserInfo,
    }),
    [authenticationStatus, logout, accessToken, handleLoginSuccess, userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
