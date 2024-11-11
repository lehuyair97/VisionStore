import  { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import messaging from "@react-native-firebase/messaging";
import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

// Configure Expo Notifications handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to request notification permissions
const requestNotificationPermission = async () => {
  if (Platform.OS === "ios") {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Cannot obtain push notification token!");
        return null;
      }
    }
    return (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    const existingStatus = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    if (existingStatus !== RESULTS.GRANTED) {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (result !== RESULTS.GRANTED) {
        alert("Cannot obtain push notification token!");
        return null;
      }
    }
    return (await Notifications.getExpoPushTokenAsync()).data;
  }
};

// Function to register for push notifications and set up channels
const registerForPushNotificationsAsync = async () => {
  const token = await requestNotificationPermission();
  if (!token) return;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

// Hook to configure notifications and FCM
export const useNotifications = () => {
  const isFCMListenerSet = useRef(false); // Track if the FCM listener has been set
  useEffect(() => {
    const setupFCM = async () => {
      const token = await messaging().getToken();

      // Only set up the listener if it hasn't been set
      if (!isFCMListenerSet.current) {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
          console.log("Received a new FCM message!", remoteMessage);

          // Show notification
          await Notifications.scheduleNotificationAsync({
            content: {
              title: remoteMessage.notification?.title || "New Notification",
              body:
                remoteMessage.notification?.body || "You have a new message!",
              sound: "default",
            },
            trigger: null, // Send immediately
          });
        });

        isFCMListenerSet.current = true; // Mark listener as set
        return unsubscribe; // Return unsubscribe function
      }
    };

    registerForPushNotificationsAsync();
    setupFCM(); // Call function to set up FCM

    // Listen for notification events
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    // Clean up listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []); // Empty dependency array ensures this effect only runs once
};

type Variables = {
  token: any;
  title: string;
  body: string;
};

const usePushNotification = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (variables: Variables) => {
      console.log("value ", variables);
      return api({
        url: REQUEST_URL.PUSH_NOTIFICATION,
        method: "POST",
        data: variables,
      });
    },
  });
  return { data, submit, error, isPending };
};

export default usePushNotification;
