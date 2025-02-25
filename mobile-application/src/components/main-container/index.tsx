import theme from "@theme";
import { StatusBar } from "expo-status-bar";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

const MainContainer = ({
  children,
  style,
  edges,
  ...rest
}: NativeSafeAreaViewProps) => {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: theme.colors.whiteF8 }, style]}
      edges={edges}
      {...rest}
    >
      <StatusBar style="light" backgroundColor={theme.colors.primary} />

      {children}
    </SafeAreaView>
  );
};

export default MainContainer;
