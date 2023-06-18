import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from 'react-redux';
import store, { useAppDispatch } from './src/contexts/store/store';
import Logged from './src/screens/Logged';
import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import { setToken } from './src/contexts/store/tokenSlice';
import { setNotification } from './src/contexts/store/notificationSlice';
import { insertLog } from './src/utils/logs';

export type MainStackNavigationParameters = {
  Login: undefined;
  Logged: undefined;
};

export type NavigationParameters = {
  Main: undefined;
  Log: undefined;
  Welcome: undefined;
  Posts: undefined;
  LoginHistory: undefined;
  User: { userId?: string };
};

const MainStack = createNativeStackNavigator<MainStackNavigationParameters>();

function SetterNotification({ children }: PropsWithChildren<{}>) {
  const dispatch = useAppDispatch();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    insertLog('before registerForPushNotificationsAsync');
    registerForPushNotificationsAsync().then(async token => {
      if (!token) return;
      dispatch(setToken(token));

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // note: self notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          sound: 'mySoundFile.wav',
        },
        trigger: {
          seconds: 2,
          channelId: 'new-emails',
        },
      });
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification', notification);
      dispatch(setNotification(notification));
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response', response.notification);
      dispatch(setNotification(response.notification));
    });
    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <>{children}</>;
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SetterNotification />
      <NavigationContainer
        linking={{
          prefixes: ['https://example.com', 'example://'],
          async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (url != null) return url;
            const response = await Notifications.getLastNotificationResponseAsync();
            return response?.notification.request.content.data.url;
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url);
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              const url = response.notification.request.content.data.url;
              listener(url);
            });
            return () => {
              eventListenerSubscription.remove();
              subscription.remove();
            };
          },
        }}>
        <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <MainStack.Screen name='Login' component={Login} />
          <MainStack.Screen name='Logged' component={Logged} />
        </MainStack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
