import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@context/auth-context";
import RootScenes from "./root-scenes";
import { NavigationContainer } from "@react-navigation/native";
import { queryClient } from "@utils/helper";
import theme, { navigationTheme, ThemeProvider } from "@theme";

export default function MainNavigation() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer theme={navigationTheme}>
            <RootScenes />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
