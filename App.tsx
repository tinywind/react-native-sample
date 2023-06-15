import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomButton from './src/CustomButton';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type StackParameters = {
  Home: undefined;
  Detail: undefined;
  User: { userId: string };
};
const Stack = createNativeStackNavigator<StackParameters>();

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

function HomeScreen({ navigation }: NativeStackScreenProps<StackParameters, 'Home'>) {
  return (
    <Screen>
      <Text style={{ fontSize: 40 }}>Home</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('Detail')}>
        <Text>Go to Detail Screen</Text>
      </CustomButton>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('User', { userId: 'tinywind' })}>
        <Text>Go to User Screen</Text>
      </CustomButton>
    </Screen>
  );
}

function DetailScreen({ navigation }: NativeStackScreenProps<StackParameters, 'Detail'>) {
  return (
    <Screen>
      <Text>Detail</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </Screen>
  );
}

function UserScreen({ route, navigation }: NativeStackScreenProps<StackParameters, 'User'>) {
  return (
    <Screen>
      <Text>User: {route.params.userId}</Text>
      <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </CustomButton>
    </Screen>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Detail' component={DetailScreen} />
        <Stack.Screen name='User' component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
