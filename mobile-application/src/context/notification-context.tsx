// import React, { createContext, useContext, useEffect, useRef } from "react";
// import { Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import messaging from "@react-native-firebase/messaging";

// export const NotificationsContext = createContext<any>(undefined);

// export const NotificationsProvider = ({ children }) => {
//   const isFCMListenerSet = useRef(false); // Track if the FCM listener has been set

//   useEffect(() => {
//     const requestNotificationPermission = async () => {
//       if (Platform.OS === "ios") {
//         const { status: existingStatus } =
//           await Notifications.getPermissionsAsync();
//         if (existingStatus !== "granted") {
//           const { status } = await Notifications.requestPermissionsAsync();
//           if (status !== "granted") {
//             alert("Cannot obtain push notification token!");
//             return null;
//           }
//         }
//         return (await Notifications.getExpoPushTokenAsync()).data;
//       } else {
//         const existingStatus = await check(
//           PERMISSIONS.ANDROID.POST_NOTIFICATIONS
//         );
//         if (existingStatus !== RESULTS.GRANTED) {
//           const result = await request(
//             PERMISSIONS.ANDROID.POST_NOTIFICATIONS
//           );
//           if (result !== RESULTS.GRANTED) {
//             alert("Cannot obtain push notification token!");
//             return null;
//           }
//         }
//         return (await Notifications.getExpoPushTokenAsync()).data;
//       }
//     };

//     const setupFCM = async () => {
//       const token = await messaging().getToken();
//       console.log("FCM Token:", token);
      
//       const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//         console.log("Received a new FCM message!", remoteMessage);
//         // Show notification if there is notification data
//         if (remoteMessage.notification) {
//           await Notifications.scheduleNotificationAsync({
//             content: {
//               title: remoteMessage.notification.title || "New Notification",
//               body: remoteMessage.notification.body || "You have a new message!",
//               sound: "default",
//             },
//             trigger: null, // Send immediately
//           });
//         }
//       });

//       return unsubscribe; // Return unsubscribe function
//     };

//     const registerForPushNotificationsAsync = async () => {
//       const token = await requestNotificationPermission();
//       if (!token) return;

//       console.log("Expo Push Token:", token);

//       // Configure notification channel for Android
//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#FF231F7C",
//         });
//       }
//     };

//     // Register for notifications and setup FCM
//     registerForPushNotificationsAsync();
//     const unsubscribeFCM = setupFCM();

//     // Listen for notification events
//     const notificationListener = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("Notification received:", notification);
//       }
//     );

//     const responseListener =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification response:", response);
//       });

//     // Clean up listeners on unmount
//     return () => {
//    // Unsubscribe from FCM messages
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []); // Empty dependency array ensures this effect only runs once

//   return (
//     <NotificationsContext.Provider value={{}}>
//       {children}
//     </NotificationsContext.Provider>
//   );
// };

// // Custom hook to use notifications context
// export const useNotifications = () => {
//   return useContext(NotificationsContext);
// };
