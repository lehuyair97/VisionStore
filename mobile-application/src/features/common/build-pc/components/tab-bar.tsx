import { StyleSheet, TextStyle } from "react-native";
import { Button, Row } from "@components";
import theme from "@theme";
import {
  NavigationState,
  Route,
  SceneRendererProps,
} from "react-native-tab-view";
import { SCREEN_WIDTH } from "@utils/helper";

type State = NavigationState<Route>;

export const TAB_BUILD = [
  { key: "Manual", title: "Thủ công" },
  { key: "Automatic", title: "Tự động" },
];

export default function TabBarHome(
  props: SceneRendererProps & {
    navigationState?: State;
  }
) {
  return (
    <Row marginHorizontal={"_20"}>
      {props.navigationState?.routes.map((route: Route, index: number) => {
        const isActive = index === props.navigationState?.index;
        return (
          <Button
            key={route.key}
            label={route.title}
            textStyle={{
              fontWeight: "bold",
              fontSize: 14,
              color: isActive ? theme.colors.primary : theme.colors.gray136,
            }}
            onPress={() => props.jumpTo(route.key)}
            style={[
              styles.button,
              {
                borderColor: isActive ? theme.colors.primary : theme.colors.gray136,
                borderBottomWidth: isActive ? 1.5 : 0.8,
              },
            ]}
          >
          </Button>
        );
      })}
    </Row>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    minHeight: 30,
    width: (SCREEN_WIDTH - 40) / 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    marginHorizontal: 1,
  },
});
