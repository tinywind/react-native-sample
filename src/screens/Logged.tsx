import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../contexts/store/store';
import React, { useEffect } from 'react';
import { EventArg } from '@react-navigation/native';
import { Alert, BackHandler, Linking, ScrollView, Text, View } from 'react-native';
import { setUser } from '../contexts/store/userSlice';
import LoginHistory from './LoginHistory';
import { MainStackNavigationParameters, NavigationParameters } from '../../App';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps, useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColorSchemeScreen from '../components/ColorSchemeScreen';
import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import CustomButton from '../components/CustomButton';
import Posts from './Posts';
import Log from './Log';

const Drawer = createDrawerNavigator<NavigationParameters>();
const Tabs = createMaterialBottomTabNavigator<NavigationParameters>();

function WelcomeScreen({ navigation }: MaterialBottomTabScreenProps<NavigationParameters, 'Welcome'>) {
  const user = useAppSelector(state => state.user);
  return (
    <ColorSchemeScreen>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25 }}>Welcome </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{user?.id}</Text>
        </View>
        <ScrollView>
          <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('Posts')}>
            <Text>Posts with API</Text>
          </CustomButton>
          <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('LoginHistory')}>
            <Text>LoginHistory with SQLite</Text>
          </CustomButton>
          <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('Log')}>
            <Text>Log</Text>
          </CustomButton>
          <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'tinywind' })}>
            <Text>Go to 사용자(tinywind) 스크린</Text>
          </CustomButton>
          <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'jeon' })}>
            <Text>Go to 사용자(jeon) 스크린</Text>
          </CustomButton>
        </ScrollView>
      </View>
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
        name='Posts'
        component={Posts}
        options={{
          tabBarLabel: 'Posts[API]',
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

export default function Logged({ route, navigation }: NativeStackScreenProps<MainStackNavigationParameters, 'Logged'>) {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const toLogin = () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  useEffect(() => {
    if (!user?.id) toLogin();
  }, [user?.id]);

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
        beforeRemove: async e => {
          if (navigating) return;
          (e as EventArg<'beforeRemove', true, any>).preventDefault();

          const userId = user?.id;
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
                dispatch(setUser(null));
                setTimeout(() => {
                  toLogin();
                  BackHandler.exitApp();
                }, 10);
              },
            },
          ]);
        },
      }}>
      <Drawer.Screen name='Main' component={MainScreen} />
      <Drawer.Screen name='Log' component={Log} />
      <Drawer.Screen name='LoginHistory' component={LoginHistory} />
    </Drawer.Navigator>
  );
}
