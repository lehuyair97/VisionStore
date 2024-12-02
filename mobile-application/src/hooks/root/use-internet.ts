import { useState, useEffect, useCallback, useMemo } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
const useNetWorkStatus = () => {
  const [netWorkStatus, setNetWorkStatus] = useState<NetInfoState | null>(null);
  const [wasOffline, setWasOffline] = useState(false);
  const [isReconnected, setIsReconnected] = useState(false);
  useEffect(() => {
    const unsubcribe = NetInfo.addEventListener((state) => {
      setNetWorkStatus(state);
      if (!state.isConnected) {
        setWasOffline(true);
        setIsReconnected(false);
      } else if (wasOffline) {
        setIsReconnected(true);
      }
    });
    NetInfo.fetch().then((state) => {
      setNetWorkStatus(state);
      if (!state.isConnected) {
        setWasOffline(true);
      }
    });
    return () => {
      unsubcribe();
    };
  }, [wasOffline]);
  const isBackOnline = useMemo(() => {
    return isReconnected;
  }, [isReconnected]);

  const resetWasOffline = useCallback(() => {
    setWasOffline(false);
    setIsReconnected(false);
  }, [netWorkStatus]);
  const isConnected = useMemo(() => {
    return netWorkStatus?.isConnected ?? false;
  }, [netWorkStatus]);
  return {
    netWorkStatus,
    isBackOnline,
    resetWasOffline,
    isConnected,
  };
};
export default useNetWorkStatus