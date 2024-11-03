import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  setAccessToken as setAccessTokenStorage,
  deleteAccessToken,
  validateToken,
  setRefreshToken as setRefreshTokenStorage,
  deleteRefreshToken,
  getRefreshToken,
} from "../utils/token";
import { setUserInfoStorage, getUserInfoStorage } from "@utils/storage";
import { User } from "../hooks/auth/use-sign-in";
import useRefreshToken from "@hooks/auth/use-refresh-token";
import dayjs from "dayjs";

export type AuthenticationStatus =
  | "REFRESHING"
  | "AUTHENTICATED"
  | "UNAUTHENTICATED";

export type CheckInStatus = {
  lastCheckInTime: string;
  checkInCount: number;
};

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
  userInfo: User;
  setUserInfo: (user: User) => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>("UNAUTHENTICATED");
  const { submit: submitRefreshToken } = useRefreshToken();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<User | null>();

  useEffect(() => {
    const validateAndSetAuth = async () => {
      const isValidToken = await validateToken();
      if (isValidToken) {
        setAuthenticationStatus("AUTHENTICATED");
        const info = await getUserInfoStorage();
        setUserInfo(info);
        return;
      }
      await refreshToken();
    };
    validateAndSetAuth();
  }, []);

  const logout = async () => {
    await deleteAccessToken();
    await deleteRefreshToken();
    await setUserInfoStorage(null);
    setAuthenticationStatus("UNAUTHENTICATED");
  };

  const refreshToken = async () => {
    const refreshToken = await getRefreshToken();
    console.log(refreshToken);
    const { accessToken } = await submitRefreshToken(refreshToken);
    if (accessToken) {
      setAccessToken(accessToken);
      setAccessTokenStorage(accessToken);
      setAuthenticationStatus("AUTHENTICATED");
    }
  };

  const handleLoginSuccess = useCallback(
    (data: { accessToken: string; refreshToken: string; user: User }) => {
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
    [
      authenticationStatus,
      setAuthenticationStatus,
      logout,
      accessToken,
      handleLoginSuccess,
      userInfo,
      setUserInfo,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
