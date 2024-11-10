/* eslint-disable max-len */
import { Pressable, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BuildPC, Cart, Home, Profile } from "@features/common";
import { Block, Text } from "@components";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import {
  BottomTabRoutes,
  ScreenOptions,
  TScreen,
} from "@navigation/config/types";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { localImages } from "@assets/icons/images";
import { navigate } from "@navigation/config/navigation-service";
import { useEffect } from "react";

const Tab = createBottomTabNavigator<BottomTabRoutes>();

export const bottomTabScreensRoute = [
  { component: Home, name: "HomeStack" },
  { component: BuildPC, name: "BuildPCStack" },
  { component: Cart, name: "CartStack" },
  { component: Profile, name: "ProfileStack" },
];
const BottomTabScenes = () => {
  useEffect(() => {
    changeNavigationBarColor("#DF5454", true);
  });

  const renderTabBarIcon = (title: keyof BottomTabRoutes, focused: boolean) => {
    switch (title) {
      case "HomeStack":
        return (
          <Image
            source={
              focused ? localImages().ic_home_fill : localImages().ic_home
            }
          />
        );
      case "BuildPCStack":
        return (
          <Image
            source={
              focused ? localImages().ic_window_fill : localImages().ic_window
            }
          />
        );
      case "CartStack":
        return (
          <Image
            source={
              focused
                ? localImages().ic_shopping_cart_fill
                : localImages().ic_shopping_cart
            }
          />
        );
      case "ProfileStack":
        return (
          <Image
            source={
              focused ? localImages().ic_profile_fill : localImages().ic_profile
            }
          />
        );
      default:
        return null;
    }
  };

  const renderTabBarLabel = (label: string, focused: boolean) => (
    <Text
      fontSize={12}
      lineHeight={16}
      textAlign="center"
      color={focused ? "white255" : "whiteC4"}
    >
      {label}
    </Text>
  );

  const screenOptions: ScreenOptions<
    BottomTabRoutes,
    BottomTabNavigationOptions
  > = {
    HomeStack: {
      tabBarLabel: ({ focused }) => renderTabBarLabel("Trang chủ", focused),
      tabBarIcon: ({ focused }) => renderTabBarIcon("HomeStack", focused),
      tabBarButton: (props) => <Pressable {...props} />,
    },
    BuildPCStack: {
      tabBarLabel: ({ focused }) => renderTabBarLabel("Build PC", focused),
      tabBarIcon: ({ focused }) => renderTabBarIcon("BuildPCStack", focused),
      tabBarButton: (props) => <Pressable {...props} />,
    },
    CartStack: {
      tabBarLabel: ({ focused }) => renderTabBarLabel("Thư viện", focused),
      tabBarIcon: ({ focused }) => renderTabBarIcon("CartStack", focused),
      tabBarButton: (props) => <Pressable {...props} />,
    },
    ProfileStack: {
      tabBarLabel: ({ focused }) => renderTabBarLabel("Cá nhân", focused),
      tabBarIcon: ({ focused }) => renderTabBarIcon("ProfileStack", focused),
      tabBarButton: (props) => <Pressable {...props} />,
    },
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarAllowFontScaling: false,
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => <Block flex={1} bg="primary" />,
        }}
      >
        {bottomTabScreensRoute.map(({ name, component }: TScreen) => (
          <Tab.Screen
            key={name}
            name={name as keyof BottomTabRoutes}
            component={component}
            options={{
              ...screenOptions[name],
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    navigate(name);
                  }}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default BottomTabScenes;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "red",
  },
});
