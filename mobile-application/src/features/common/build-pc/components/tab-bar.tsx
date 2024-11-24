import React from "react";
import { StyleSheet, FlatList } from "react-native";
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
export const TAB_ORDER_MANGAGERMENT = [
  { key: "Progress", title: "Đang xử lý" },
  { key: "Shipping", title: "Đang giao" },
  { key: "Delivered", title: "Đã giao" },
  { key: "Cancle", title: "Đã hủy" },
];

export default function TabBarHome(
  props: SceneRendererProps & {
    navigationState?: State;
  }
) {
  const renderItem = ({ item, index }: { item: Route; index: number }) => {
    const isActive = index === props.navigationState?.index;

    return (
      <Button
        key={item.key}
        label={item.title}
        textStyle={{
          fontWeight: "bold",
          fontSize: 14,
          color: isActive ? theme.colors.primary : theme.colors.gray136,
        }}
        onPress={() => props.jumpTo(item.key)}
        style={[
          styles.button,
          {
            borderColor: isActive ? theme.colors.primary : theme.colors.gray136,
            borderBottomWidth: isActive ? 1.5 : 0.8,
          },
        ]}
      />
    );
  };

  return (
    <Row paddingHorizontal={"_20"} pt={"_10"} backgroundColor={"container"}>
      <FlatList
        horizontal
        data={props.navigationState?.routes}
        renderItem={({ item, index }) =>
          renderItem({ item, index})
        }
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    minHeight: 30,
    width: (SCREEN_WIDTH - 30) / 2.8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    marginHorizontal: 1,
  },
});
