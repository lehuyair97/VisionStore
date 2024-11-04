import React from "react";
import { TabView } from "react-native-tab-view";
import { useTabState } from "@hooks/common/use-tab-state";
import { TAB_BUILD } from "./components/tab-bar";
import BuildAutomatic from "./components/build-automatic";
import BuildManual from "./components/build-manual";
import { SCREEN_WIDTH } from "@utils/helper";
import { Block, MainContainer, Text } from "@components";
import TabBarHome from "./components/tab-bar";
import SearchView from "./components/search-view";
export type Route = {
  key: string;
  icon?: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};
export default function BuildPC() {
  const { index, setIndex, routes } = useTabState(TAB_BUILD);

  const renderScene = ({ route: { key } }: { route: Route }) => {
    const components = {
      Manual: <BuildManual />,
      Automatic: <BuildAutomatic />,
    };
    return components[key];
  };

  return (
    <MainContainer>
      <Block flex={1}>
        <SearchView/>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => <TabBarHome {...props} />}
          onIndexChange={setIndex}
          initialLayout={{ width: SCREEN_WIDTH }}
          swipeEnabled={true}
          lazy
        />
      </Block>
    </MainContainer>
  );
}
