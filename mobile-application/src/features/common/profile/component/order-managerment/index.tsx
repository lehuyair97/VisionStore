import { MainContainer } from "@components";
import TabBarHome, {
  TAB_ORDER_MANGAGERMENT,
} from "@features/common/build-pc/components/tab-bar";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { useTabState } from "@hooks/common/use-tab-state";
import { useRoute } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@utils/helper";
import { StyleSheet } from "react-native";
import { Route, TabView } from "react-native-tab-view";
import OrderCancle from "./order-cancle";
import OrderDelivered from "./order-delivered";
import OrderPending from "./order-progress";
import OrderShipping from "./order-shipping";
import { useEffect } from "react";

export default function OrderManagerment() {
  const route = useRoute();
  const { routeIndex } = route.params as { routeIndex?: number } || {};
  const { index, setIndex, routes } = useTabState(TAB_ORDER_MANGAGERMENT);

  useEffect(() => {
    if (routeIndex !== undefined && routeIndex !== index) {
      setIndex(routeIndex); 
    }
  }, []);

  const renderScene = ({ route: { key } }: { route: Route }) => {
    const components = {
      Progress: <OrderPending />,
      Shipping: <OrderShipping />,
      Delivered: <OrderDelivered />,
      Cancle: <OrderCancle />,
    };
    return components[key];
  };

  return (
    <MainContainer>
      <AppBarCustom
        title="Quản lý đơn hàng"
        iconLeft
        titleCenter
        isBackground
        paddingHorizontal={20}
        paddingVertical={10}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => <TabBarHome {...props} />}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        swipeEnabled={true}
        lazy
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
