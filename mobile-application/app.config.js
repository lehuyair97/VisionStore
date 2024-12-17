import withCustomMetaData from "./plugins/withCustomMetaData"

module.exports = {
  expo: {
    name: 'mobile-application',
    slug: 'mobile-application',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    plugins: [
      withCustomMetaData, 
      [
        'expo-notifications',
        {
          icon: './assets/adaptive-icon.png',
          color: '#ffffff',
        },
      ],
      [
        '@react-native-firebase/app',
        {
          android: {
            googleServicesFile: './google-services.json',
          },
        },
      ],
      [
        '@react-native-firebase/messaging',
        {
          android: {
            googleServicesFile: './google-services.json',
          },
        },
      ],
    ],
    android: {
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'CAMERA',
        'RECORD_AUDIO',
        'ACCESS_FINE_LOCATION',
        'INTERNET',
        'POST_NOTIFICATIONS',
      ],
      package: 'com.visionstore.mobile',
    },
    extra: {
      eas: {
        projectId: '3566e4f2-d4a3-4ec5-8848-059ce8911a9b',
      },
    },
  },
};
