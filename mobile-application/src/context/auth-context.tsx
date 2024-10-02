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
} from "../utils/token";
import {
  setUserInfoStorage,
  getUserInfoStorage,
  getCheckInStatusStorage,
  setCheckInStatusStorage,
} from "@utils/storage";
import { User } from "../hooks/auth/use-sign-in";
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
  handleLoginSuccess: (data: { accessToken: string; user: User }) => void;
  setAuthenticationStatus: (status: AuthenticationStatus) => void;
  logout: () => Promise<void>;
  userInfo: User;
  checkInStatus: CheckInStatus;
  setUserInfo: (user: User) => void;
  handleCheckInStatus: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>("UNAUTHENTICATED");
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<User | null>();

  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus>({
    lastCheckInTime: "",
    checkInCount: 0,
  });

  useEffect(() => {
    const validateAndSetAuth = async () => {
      const isValidToken = await validateToken();
      if (isValidToken) {
        setAuthenticationStatus("AUTHENTICATED");
        const info = await getUserInfoStorage();
        const checkInStatusStorage = await getCheckInStatusStorage();
        setUserInfo(info);
        if (checkInStatusStorage) {
          setCheckInStatus(checkInStatusStorage);
        }
      }
    };
    validateAndSetAuth();
  }, []);

  const logout = async () => {
    await deleteAccessToken();
    await setUserInfoStorage(null);
    setAuthenticationStatus("UNAUTHENTICATED");
  };

  const handleCheckInStatus = () => {
    const currentDate = dayjs(new Date()).format("HH:mm:ss");
    if (checkInStatus?.lastCheckInTime > currentDate) {
      setCheckInStatus({ checkInCount: 1, lastCheckInTime: currentDate });
      setCheckInStatusStorage({
        checkInCount: 1,
        lastCheckInTime: currentDate,
      });
      return;
    }
    setCheckInStatus({
      checkInCount: checkInStatus?.checkInCount + 1,
      lastCheckInTime: currentDate,
    });
    setCheckInStatusStorage({
      checkInCount: checkInStatus?.checkInCount + 1,
      lastCheckInTime: currentDate,
    });
  };

  const handleLoginSuccess = useCallback(
    (data: { accessToken: string; user: User }) => {
      setAccessToken(data?.accessToken);
      setUserInfo(data?.user);
      setAuthenticationStatus("AUTHENTICATED");
      setAccessTokenStorage(data?.accessToken);
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
      checkInStatus,
      handleCheckInStatus,
    }),
    [
      authenticationStatus,
      setAuthenticationStatus,
      logout,
      accessToken,
      handleLoginSuccess,
      userInfo,
      setUserInfo,
      checkInStatus,
      handleCheckInStatus,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
