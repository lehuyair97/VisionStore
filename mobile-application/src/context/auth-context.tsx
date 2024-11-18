import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { User } from "../hooks/auth/use-sign-in";
import useRefreshToken from "@hooks/auth/use-refresh-token";
import { getUserInfoStorage, setUserInfoStorage } from "@utils/storage";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getRefreshToken,
  setAccessToken as setAccessTokenStorage,
  setRefreshToken as setRefreshTokenStorage,
  validateToken,
} from "../utils/token";
import useGetProfile from "@hooks/common/use-get-profile";

export type AuthenticationStatus = "REFRESHING" | "AUTHENTICATED" | "UNAUTHENTICATED";

type TAuthContext = {
  authenticationStatus: AuthenticationStatus;
  accessToken?: string;
  handleLoginSuccess: (data: { accessToken: string; refreshToken: string; user: User }) => void;
  setAuthenticationStatus: (status: AuthenticationStatus) => void;
  logout: () => Promise<void>;
  userInfo: User;
  setUserInfo: (user: User) => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticationStatus, setAuthenticationStatus] = useState<AuthenticationStatus>("UNAUTHENTICATED");
  const { submit: submitRefreshToken } = useRefreshToken();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { data: userData } = useGetProfile(userInfo?._id);

  const validateAndSetAuth = useCallback(async () => {
    const isValidToken = await validateToken();
    if (isValidToken) {
      setAuthenticationStatus("AUTHENTICATED");
      const userInfo = await getUserInfoStorage();
      setUserInfo(userInfo);
    } else {
      await refreshToken();
    }
  }, []);

  useEffect(() => {
    validateAndSetAuth();
  }, [validateAndSetAuth]);

  useEffect(() => {
    if (!userData) {
      setUserInfo(userData);
    }
  }, [userData]);

  const logout = useCallback(async () => {
    await deleteAccessToken();
    await deleteRefreshToken();
    await setUserInfoStorage(null);
    setAuthenticationStatus("UNAUTHENTICATED");
  }, []);

  const refreshToken = useCallback(async () => {
    const storedRefreshToken = await getRefreshToken();
    if (storedRefreshToken) {
      const { accessToken } = await submitRefreshToken(storedRefreshToken);
      if (accessToken) {
        const userInfo = await getUserInfoStorage();
        setAccessToken(accessToken);
        setAccessTokenStorage(accessToken);
        setAuthenticationStatus("AUTHENTICATED");
        setUserInfo(userInfo);
      }
    }
  }, [submitRefreshToken]);

  const handleLoginSuccess = useCallback(
    async (data: { accessToken: string; refreshToken: string; user: User }) => {
      setAccessToken(data?.accessToken);
      setUserInfo(data?.user);
      setAuthenticationStatus("AUTHENTICATED");
      setAccessTokenStorage(data?.accessToken);
      setRefreshTokenStorage(data?.refreshToken);
      setUserInfoStorage(data?.user);
    },
    []
  );

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
