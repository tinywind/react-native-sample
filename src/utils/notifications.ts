import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { insertLog } from './logs';

const allowedNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return settings.status === 'granted' || settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
};

const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};

export async function sendPushNotification(expoPushToken: string) {
  if (!(await allowedNotificationsAsync())) await requestPermissionsAsync();

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    }),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    insertLog('before getPermissionsAsync');

    if (!(await allowedNotificationsAsync())) {
      const { status } = await requestPermissionsAsync();
      insertLog('after requestPermissionsAsync, status: ' + status);

      if (status !== 'granted') {
        insertLog('Failed to get push token for push notification!');
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
    }
    insertLog('before getExpoPushTokenAsync');
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } catch (error) {
      insertLog('getExpoPushTokenAsync error: ' + JSON.stringify(error));
      Alert.alert('getExpoPushTokenAsync error: ' + JSON.stringify(error));
    }
    console.log(token);
    insertLog('token: ' + token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
    insertLog('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    insertLog('before setNotificationChannelAsync');
    const channel = await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      showBadge: true,
      enableLights: true,
      enableVibrate: true,
    });
    console.log('channel', channel);
  }

  return token;
}
