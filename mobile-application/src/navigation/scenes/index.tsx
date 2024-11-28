import { AuthProvider } from "@context/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import theme, { navigationTheme, ThemeProvider } from "@theme";
import { queryClient } from "@utils/helper";
import RootScenes from "./root-scenes";
import { CommonProvider } from "@context/common-context";
import WebSocketProvider from "@context/web-socket-context";
import CheckValidateModal from "@features/common/components/check-validate-modal";
import { navigationRef } from "@navigation/config/navigation-service";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
                  <CheckValidateModal />
                </NavigationContainer>
              </ThemeProvider>
            </GestureHandlerRootView>
          </CommonProvider>
        </AuthProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}
