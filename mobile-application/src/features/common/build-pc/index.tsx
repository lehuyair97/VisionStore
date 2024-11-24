import { Block, Icon, MainContainer, Row } from "@components";
import { useTabState } from "@hooks/common/use-tab-state";
import { ROUTES } from "@navigation/config/routes";
import Colors from "@theme/colors";
import { SCREEN_WIDTH } from "@utils/helper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabView } from "react-native-tab-view";
import AppBarCustom from "../home/component/appbar_custom";
import BuildAutomatic from "./components/build-automatic";
import BuildManual from "./components/build-manual";
import TabBarHome, { TAB_BUILD } from "./components/tab-bar";
import { navigate } from "@navigation/config/navigation-service";
import Text from "@components/text";
import useCommon from "@hooks/common/use-common";

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
  const { messageUnread } = useCommon();

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
        <Block px={"_20"} pb={'_20'}>
        <AppBarCustom
            title="VisionStore"
            titleStyle={{ fontWeight: "bold", color: Colors.primary }}
            childrenRight={
              <Row>
                <TouchableOpacity
                  onPress={() =>
                    navigate(ROUTES.Search)
                  }
                >
                  <Icon
                    type="fontAwesome"
                    name="search"
                    size={20}
                    color={Colors.black2A}
                  />
                </TouchableOpacity>
                <Block width={20} />
                <TouchableOpacity
                  onPress={() => navigate(ROUTES.NotificationScreen)}
                >
                  <Icon
                    type="fontAwesome"
                    name="bell"
                    size={20}
                    color={Colors.black2A}
                  />
                  <Block
                    position="absolute"
                    top={-5}
                    right={-4}
                    width={14}
                    height={14}
                    borderRadius="full"
                    backgroundColor="red_500"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text textAlign="center" fontSize={8}>
                      {messageUnread ?? messageUnread}
                    </Text>
                  </Block>
                </TouchableOpacity>
              </Row>
            }
          />
        </Block>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => <TabBarHome {...props}   />}
          onIndexChange={setIndex}
          initialLayout={{ width: SCREEN_WIDTH }}
          swipeEnabled={true}
          lazy
        />
      </Block>
    </MainContainer>
  );
}
