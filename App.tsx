import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/contexts/store/store';
import Logged from './src/screens/Logged';
import Posts from './src/screens/Posts';

export type MainStackNavigationParameters = {
  Login: undefined;
  Logged: undefined;
};

export type NavigationParameters = {
  Main: undefined;
  Article: undefined;
  Welcome: undefined;
  Posts: undefined;
  LoginHistory: undefined;
  User: { userId?: string };
};

const MainStack = createNativeStackNavigator<MainStackNavigationParameters>();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <MainStack.Screen name='Login' component={Login} />
          <MainStack.Screen name='Logged' component={Logged} />
        </MainStack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
