// ... existing imports ...
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { notLoggedInScreens, loggedInScreens, ROUTES } from "../config/routes";
import { useNotifications } from "@hooks/root/use-push-notification";
import useNetWorkStatus from "@hooks/root/use-internet";
import { useEffect, useState } from "react";
import { toast } from "@components";
import NoInternet from "@features/common/no-internet";
import { getFirstTimeUsingApp, setFirstTimeUsingApp } from "@utils/storage";
import SplashScreen from "@features/auth/splash-screen";

export default function RootScenes() {
  const { isConnected, resetWasOffline, isBackOnline } = useNetWorkStatus();
  const { Navigator, Group, Screen } = createNativeStackNavigator();
  const [appAlready, setAppAlready] = useState<boolean>(false);
  useNotifications();
  useEffect(() => {
    if (isBackOnline) {
      toast.success("Kết nối đã được khôi phục");
      resetWasOffline();
    }
  }, [isBackOnline, resetWasOffline]);
  useEffect(() => {
    setTimeout(() => setAppAlready(true), 2000);
  }, []);

  if (!isConnected) {
    return <NoInternet callbackRetry={resetWasOffline} />;
  }

  if (!appAlready) {
    return <SplashScreen />;
  }
  
  return (
    <Navigator>
      <Group>
        {Object.entries({ ...loggedInScreens, ...notLoggedInScreens }).map(
          ([key, value]) => {
            const screenOptions = {
              headerShown: false,
              ...(key === "DetailProduct" && {
                animation: "slide_from_bottom",
              }),
            };

            return (
              <Screen
                key={key}
                name={key}
                component={value}
                options={screenOptions as any}
              />
            );
          }
        )}
      </Group>
    </Navigator>
  );
}
