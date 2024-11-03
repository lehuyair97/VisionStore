import { AuthProvider } from "@context/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import theme, { navigationTheme, ThemeProvider } from "@theme";
import { queryClient } from "@utils/helper";
import RootScenes from "./root-scenes";
import { navigationRef } from "@navigation/config/navigation-service";
export default function MainNavigation() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={navigationTheme} ref={navigationRef}>
            <RootScenes />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
