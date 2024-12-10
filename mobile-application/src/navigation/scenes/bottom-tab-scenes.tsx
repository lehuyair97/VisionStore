import React, { useEffect } from "react";
import { Pressable, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BuildPC, Cart, Home, Profile } from "@features/common";
import { Block, Text } from "@components";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { localImages } from "@assets/icons/images";
import { navigate } from "@navigation/config/navigation-service";
import useCommon from "@hooks/common/use-common";

const Tab = createBottomTabNavigator();
const COMPONENT_MAP = {
  HomeStack: Home,
  BuildPCStack: BuildPC,
  CartStack: Cart,
  ProfileStack: Profile,
};
const TAB_CONFIG = {
  HomeStack: {
    label: "Trang chủ",
    focusedIcon: localImages().ic_home_fill,
    defaultIcon: localImages().ic_home,
  },
  BuildPCStack: {
    label: "Build PC",
    focusedIcon: localImages().ic_window_fill,
    defaultIcon: localImages().ic_window,
  },
  CartStack: {
    label: "Giỏ hàng",
    focusedIcon: localImages().ic_shopping_cart_fill,
    defaultIcon: localImages().ic_shopping_cart,
  },
  ProfileStack: {
    label: "Cá nhân",
    focusedIcon: localImages().ic_profile_fill,
    defaultIcon: localImages().ic_profile,
  },
};

const BottomTabScenes = () => {
  const { checkValidate } = useCommon();

  useEffect(() => {
    changeNavigationBarColor("#DF5454", true);
  }, []);

  const renderTabBarIcon = (name: keyof typeof TAB_CONFIG, focused: boolean) => (
    <Image source={focused ? TAB_CONFIG[name].focusedIcon : TAB_CONFIG[name].defaultIcon} />
  );

  const renderTabBarLabel = (name: keyof typeof TAB_CONFIG, focused: boolean) => (
    <Text
      fontSize={12}
      lineHeight={16}
      textAlign="center"
      color={focused ? "white255" : "whiteC4"}
    >
      {TAB_CONFIG[name].label}
    </Text>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarAllowFontScaling: false,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <Block flex={1} bg="primary" />,
      }}
    >
      {Object.entries(TAB_CONFIG).map(([name, config]) => (
        <Tab.Screen
          key={name}
          name={name as keyof typeof TAB_CONFIG}
          component={COMPONENT_MAP[name]}
          options={{
            tabBarLabel: ({ focused }) => renderTabBarLabel(name as keyof typeof TAB_CONFIG, focused),
            tabBarIcon: ({ focused }) => renderTabBarIcon(name as keyof typeof TAB_CONFIG, focused),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  if (name === "CartStack" || name === "ProfileStack") {
                    checkValidate(() => navigate(name));
                    return;
                  }
                  navigate(name);
                }}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabScenes;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "red",
  },
});
