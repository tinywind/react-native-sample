## setup
```

```

## cache clear
```
expo start --clear
```

## expo에서 생성된 keystore 다운받기
```
eas credentials > Android > development > Keystore > Download
```

## eas commands
- eas secret:list
- eas build --platform [android|ios|all]
- eas credentials
- eas build:configure
- eas init --id {app id}
- eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
- 

## TO DO
- [ ] table, phone 등 다른 화면 사이즈에 대한 대응
- [ ] firebase 연동
- [ ] google play store 배포


## ref
- The Complete React Native Course: from Zero to Hero: https://www.youtube.com/watch?v=usmvrBShCCU
- Install Android Emulator for React Native Expo: https://www.youtube.com/watch?v=ZGIU5aIRi9M
- Local SQLite Database for Expo React Native App with Import and Export Database from Device Files: https://www.youtube.com/watch?v=1kSLd9oQX7c
- How to Add a Push Notification Feature Using React Native? Both Android and iOS | JS Tutorial: https://www.youtube.com/watch?v=X5kjfW1rfig
- How to publish Expo React Native App to Google Play Store: https://www.youtube.com/watch?v=oBWBDaqNuws&t=483s
- https://reactnative.dev/docs/environment-setup
- https://reactnative.dev/blog/2023/01/12/version-071
- https://reactnative.dev/docs/components-and-apis
- https://reactnavigation.org/
- https://fontawesome.com/icons
- https://fonts.google.com/
- https://docs.expo.dev/versions/latest/sdk/font/
- https://github.com/expo/google-fonts/blob/master/README.md
- https://react-native-async-storage.github.io/async-storage/docs/install/
- https://reactnative.directory/
- https://github.com/andpor/react-native-sqlite-storage
- https://jsonplaceholder.typicode.com/
- https://docs.expo.dev/push-notifications/push-notifications-setup/
- https://expo.dev/
- https://docs.expo.dev/build/setup/
- https://expo.dev/notifications
- https://github.com/google/bundletool/releases
- https://ajh322.tistory.com/289
- https://jestjs.io/docs/getting-started
- https://appicon.co/
- https://play.google.com/console/u/0/developers/
- https://console.cloud.google.com/iam-admin/serviceaccounts
- https://app.privacypolicies.com/
- https://docs.expo.dev/build-reference/variables/#how-to-upload-a-secret-file-and-use-it-in-my-app-config
