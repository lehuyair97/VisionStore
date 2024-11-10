import { AuthProvider } from "@context/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import theme, { navigationTheme, ThemeProvider } from "@theme";
import { queryClient } from "@utils/helper";
import RootScenes from "./root-scenes";

import { navigationRef } from "@navigation/config/navigation-service";
import { CommonProvider } from "@context/common-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WebSocketProvider from "@context/web-socket-context";
export default function MainNavigation() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <AuthProvider>
          <CommonProvider>
            <GestureHandlerRootView>
              <ThemeProvider theme={theme}>
                <NavigationContainer
                  theme={navigationTheme}
                  ref={navigationRef}
                >
                  <RootScenes />
                </NavigationContainer>
              </ThemeProvider>
            </GestureHandlerRootView>
          </CommonProvider>
        </AuthProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}
