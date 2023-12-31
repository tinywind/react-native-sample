export default {
  expo: {
    name: 'expo-app',
    slug: 'sample-expo-app',
    version: '1.0.0',
    orientation: 'default',
    icon: './assets/icon.png',
    scheme: 'com.saerosoft.expoapp',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.saerosoft.expoapp',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive_icon.png',
        backgroundColor: '#ffffff',
      },
      versionCode: 1,
      package: 'com.saerosoft.expoapp',
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-notifications',
        {
          icon: './assets/notification_icon.png',
          color: '#ffffff',
          sounds: ['./assets/notification_sound.wav', './assets/notification_sound_other.wav'],
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'cbe32ced-c87f-4bef-89e0-64a5c1c373d3',
      },
    },
    owner: 'tinywind',
  },
};
