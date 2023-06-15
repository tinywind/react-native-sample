import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomButton from './src/CustomButton';
import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type StackParameters = {
  Home: undefined;
  Detail: undefined;
  User: { userId?: string };
};
const Tabs = createMaterialBottomTabNavigator<StackParameters>();

function Screen({ children }: PropsWithChildren<{}>) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundStyle.backgroundColor,
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      {children}
    </SafeAreaView>
    /*<View style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor, alignItems: 'center', justifyContent: 'center' }}>{children}</View>*/
  );
}

function HomeScreen({ navigation }: MaterialBottomTabScreenProps<StackParameters, 'Home'>) {
  return (
    <Screen>
      <Text style={{ fontSize: 40 }}>Home</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('Detail')}>
        <Text>Go to Detail Screen</Text>
      </CustomButton>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'tinywind' })}>
        <Text>Go to User(tinywind) Screen</Text>
      </CustomButton>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'jeon' })}>
        <Text>Go to User(jeon) Screen</Text>
      </CustomButton>
    </Screen>
  );
}

function DetailScreen({ navigation }: MaterialBottomTabScreenProps<StackParameters, 'Detail'>) {
  return (
    <Screen>
      <Text>Detail</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </Screen>
  );
}

function UserScreen({ route, navigation }: MaterialBottomTabScreenProps<StackParameters, 'User'>) {
  return (
    <Screen>
      <Text>User: {route.params?.userId}</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </Screen>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName='Home'>
        <Tabs.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: '집',
            tabBarIcon: ({ focused, color }) => <FontAwesome5 name='phone' color={color} size={focused ? 15 : 10} style={{ margin: focused ? 2.5 : 5, fontWeight: focused ? 'bold' : 'normal' }} />,
          }}
        />
        <Tabs.Screen
          name='Detail'
          component={DetailScreen}
          options={{
            tabBarLabel: '자세히',
            tabBarIcon: ({ focused, color }) => <FontAwesome5 name='download' color={color} size={focused ? 15 : 10} style={{ margin: focused ? 2.5 : 5, fontWeight: focused ? 'bold' : 'normal' }} />,
          }}
        />
        <Tabs.Screen
          name='User'
          component={UserScreen}
          options={{
            tabBarLabel: '사용자',
            tabBarIcon: ({ focused, color }) => <FontAwesome5 name='check' color={color} size={focused ? 15 : 10} style={{ margin: focused ? 2.5 : 5, fontWeight: focused ? 'bold' : 'normal' }} />,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
