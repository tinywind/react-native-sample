import React, { useEffect, useState } from 'react';
import { Alert, AppState, AppStateStatus, BackHandler, Linking, Text, View } from 'react-native';
import { EventArg, EventMapCore, NavigationContainer, NavigationState, StackNavigationState } from '@react-navigation/native';
import CustomButton from './src/components/CustomButton';
import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps, useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import ColorSchemeScreen from './src/components/ColorSchemeScreen';
import Login from './src/screens/Login';
import { createNativeStackNavigator, NativeStackNavigationEventMap, NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginHistory from './src/screens/LoginHistory';
import { EventMapBase } from '@react-navigation/core/src/types';
import { EventName } from 'react-native/Libraries/Performance/Systrace';

export type MainStackNavigationParameters = {
  Login: undefined;
  Logged: undefined;
};

export type NavigationParameters = {
  Main: undefined;
  Article: undefined;
  Welcome: undefined;
  Detail: undefined;
  LoginHistory: undefined;
  User: { userId?: string };
};
const MainStack = createNativeStackNavigator<MainStackNavigationParameters>();
const Drawer = createDrawerNavigator<NavigationParameters>();
const Tabs = createMaterialBottomTabNavigator<NavigationParameters>();

function WelcomeScreen({ navigation }: MaterialBottomTabScreenProps<NavigationParameters, 'Welcome'>) {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem('userId').then(setUserId);
  }, []);

  return (
    <ColorSchemeScreen>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25 }}>Welcome </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{userId}</Text>
        </View>
        <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('Detail')}>
          <Text>Go to Detail Screen</Text>
        </CustomButton>
        <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'tinywind' })}>
          <Text>Go to 사용자(tinywind) 스크린</Text>
        </CustomButton>
        <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'jeon' })}>
          <Text>Go to 사용자(jeon) 스크린</Text>
        </CustomButton>
      </View>
    </ColorSchemeScreen>
  );
}

function DetailScreen({ navigation }: MaterialBottomTabScreenProps<NavigationParameters, 'Detail'>) {
  return (
    <ColorSchemeScreen>
      <Text>Detail</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </ColorSchemeScreen>
  );
}

function UserScreen({ route, navigation }: MaterialBottomTabScreenProps<NavigationParameters, 'User'>) {
  return (
    <ColorSchemeScreen>
      <Text>User: {route.params?.userId}</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </ColorSchemeScreen>
  );
}

function MainScreen({ route, navigation }: DrawerScreenProps<NavigationParameters, 'Main'>) {
  return (
    <Tabs.Navigator initialRouteName='Welcome'>
      <Tabs.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          tabBarLabel: '집',
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name='phone'
              color={color}
              size={focused ? 15 : 10}
              style={{
                margin: focused ? 2.5 : 5,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          tabBarLabel: '자세히',
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name='download'
              color={color}
              size={focused ? 15 : 10}
              style={{
                margin: focused ? 2.5 : 5,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='User'
        component={UserScreen}
        options={{
          tabBarLabel: '사용자',
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name='check'
              color={color}
              size={focused ? 15 : 10}
              style={{
                margin: focused ? 2.5 : 5,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function ArticleScreen({ route, navigation }: DrawerScreenProps<NavigationParameters, 'Article'>) {
  return (
    <ColorSchemeScreen>
      <Text>Article</Text>
    </ColorSchemeScreen>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const progress = useDrawerProgress();
  const translateX = Animated.interpolateNode(progress as number | Animated.Node<number>, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...props} />
        <DrawerItem label='Help' onPress={() => Linking.openURL('https://mywebsite.com/help')} />
        <DrawerItem label='Go Detail' onPress={() => navigation.navigate('Detail')} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

function LoggedScreen({ route, navigation }: NativeStackScreenProps<MainStackNavigationParameters, 'Logged'>) {
  const [, setAppState] = useState(AppState.currentState);
  const toLogin = () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] });

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') AsyncStorage.getItem('userId').then(userId => userId || toLogin());
      setAppState(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);
    // return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  let navigating = false;

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={props => <CustomDrawerContent {...props} />}
      defaultStatus='closed'
      initialRouteName='Main'
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'slide',
        headerShown: true,
        swipeEnabled: true,
        swipeEdgeWidth: 200,
        swipeMinDistance: 30,
      }}
      screenListeners={{
        state: e => {
          const data = (e as EventArg<'state', any, { state: StackNavigationState<MainStackNavigationParameters> }>).data;
          if (data.state.routes[data.state.routes.length - 1].name !== 'Logged') return;
          AsyncStorage.getItem('userId').then(userId => userId || toLogin());
        },
        beforeRemove: async e => {
          if (navigating) return;
          (e as EventArg<'beforeRemove', true, any>).preventDefault();

          const userId = await AsyncStorage.getItem('userId');
          if (!userId) {
            navigating = true;
            toLogin();
            return;
          }

          Alert.alert('Discard changes?', 'You have unsaved changes. Are you sure to discard them and leave the screen?', [
            {
              text: "Don't leave",
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: async () => {
                try {
                  await AsyncStorage.removeItem('userId');
                } catch (error) {
                  console.error(error);
                }
                BackHandler.exitApp();
                toLogin();
              },
            },
          ]);
        },
      }}>
      <Drawer.Screen name='Main' component={MainScreen} />
      <Drawer.Screen name='Article' component={ArticleScreen} />
      <Drawer.Screen name='LoginHistory' component={LoginHistory} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <MainStack.Screen name='Login' component={Login} />
        <MainStack.Screen name='Logged' component={LoggedScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
