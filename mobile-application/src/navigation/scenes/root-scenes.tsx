// ... existing imports ...

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { notLoggedInScreens, loggedInScreens } from "../config/routes";
import { useAuth } from "@hooks/auth";
import { useNotifications } from "@hooks/root/use-push-notification";
export default function RootScenes() {
  const { Navigator, Group, Screen } = createNativeStackNavigator();
  const { authenticationStatus } = useAuth();
  const isAuth = authenticationStatus === "AUTHENTICATED";
  useNotifications();

  return (
    <Navigator>
      <Group>
        {Object.entries({...loggedInScreens,...notLoggedInScreens}).map(([key, value]) => (
          <Screen
            key={key}
            name={key}
            component={value}
            options={{ headerShown: false }}
          />
        ))}
      </Group>
    </Navigator>
  );
}
