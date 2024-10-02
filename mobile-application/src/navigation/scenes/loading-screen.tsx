import Block from "@components/block";

import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <Block bg="white255" flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color="blue" />
    </Block>
  );
};

export default LoadingScreen;
