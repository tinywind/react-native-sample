import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { insertLog } from './logs';

export async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  insertLog('before Device.isDevice');
  if (Device.isDevice) {
    insertLog('before getPermissionsAsync');
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      insertLog('before requestPermissionsAsync');
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        insertLog('Failed to get push token for push notification!');
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
    }
    insertLog('before getExpoPushTokenAsync');
    token = (await Notifications.getExpoPushTokenAsync()).data;
    Alert.alert(`token: ${token}`);
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
    insertLog('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    insertLog('before setNotificationChannelAsync');
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
