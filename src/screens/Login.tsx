import { useFonts } from 'expo-font';
import { NotoSansKR_400Regular } from '@expo-google-fonts/noto-sans-kr';
import { NotoSerifKR_400Regular } from '@expo-google-fonts/noto-serif-kr';
import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import ColorSchemeScreen from '../components/ColorSchemeScreen';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { MainStackNavigationParameters } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as SQLite from 'expo-sqlite';
import { DATABASE_FILE } from '../constants';
import { useAppDispatch, useAppSelector } from '../contexts/store/store';
import { setUser } from '../contexts/store/userSlice';
import { sendPushNotification } from '../utils/notifications';

const database = SQLite.openDatabase(DATABASE_FILE);
type LoginFormValues = { loginId: string; password: string; remember: boolean };

const STORAGE_KEY = 'loginForm';
const saveForm = async (form: LoginFormValues) => {
  await AsyncStorage.setItem(STORAGE_KEY, form.remember ? JSON.stringify(form) : '');
  await loadForm();
};
const loadForm = async (): Promise<LoginFormValues> => {
  const form = await AsyncStorage.getItem(STORAGE_KEY);
  return form ? JSON.parse(form) : { loginId: '', password: '', remember: false };
};

export default function Login({ navigation }: NativeStackScreenProps<MainStackNavigationParameters, 'Login'>) {
  const expoPushToken = useAppSelector(state => state.token);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue } = useForm<LoginFormValues>({
    defaultValues: {
      loginId: '',
      password: '',
      remember: false,
    },
  });
  const [fontsLoaded] = useFonts({
    NotoSansKR_400Regular,
    NotoSerifKR_400Regular,
    Kablammo: require('../../assets/fonts/Kablammo_Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const validate = async ({ loginId, password }: LoginFormValues) => {
    // TODO: validate loginId and password
  };

  const onSubmit = async ({ loginId, password, remember }: LoginFormValues) => {
    try {
      await validate({ loginId, password, remember });
    } catch (error) {
      console.error(error);
      Alert.alert(`로그인에 실패했습니다: ${error}`);
      return;
    }
    try {
      if (remember) await saveForm({ loginId, password, remember });
    } catch (error) {
      console.error(error);
    }
    dispatch(setUser({ id: loginId }));
    await database.transaction(async tx => await tx.executeSql('INSERT INTO login_history (login_id) VALUES (?);', [loginId]));

    navigation.navigate('Logged');
  };

  useEffect(() => {
    loadForm().then(({ loginId, password, remember }) => {
      setValue('loginId', loginId);
      setValue('password', password);
      setValue('remember', remember);
    });
  }, []);

  useEffect(() => {
    database.transaction(
      async tx => await tx.executeSql('CREATE TABLE IF NOT EXISTS login_history (id INTEGER PRIMARY KEY AUTOINCREMENT, login_id TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'),
    );
  }, []);

  if (!fontsLoaded) return null;
  return (
    <ColorSchemeScreen>
      <View onLayout={onLayoutRootView}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 40, fontFamily: 'Kablammo' }}>Login</Text>
        </View>

        <View style={{ marginBottom: 3 }}>
          <Text style={{ fontSize: 13, margin: 5 }}>아이디</Text>
          <Controller
            name='loginId'
            control={control}
            render={({ field }) => <TextInput style={{ borderRadius: 5, borderWidth: 1, height: 40, paddingLeft: 10 }} onChangeText={value => field.onChange(value)} {...field} />}
          />
        </View>
        <View style={{ marginBottom: 3 }}>
          <Text style={{ fontSize: 13, margin: 5 }}>비밀번호</Text>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextInput secureTextEntry={true} style={{ borderRadius: 5, borderWidth: 1, height: 40, paddingLeft: 10 }} onChangeText={value => field.onChange(value)} {...field} />
            )}
          />
        </View>
        <View style={{ marginBottom: 3 }}>
          <Controller
            name='remember'
            control={control}
            render={({ field }) => (
              <BouncyCheckbox
                size={25}
                fillColor='red'
                unfillColor='#FFFFFF'
                text='아이디 저장하기'
                iconStyle={{ borderColor: 'red' }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: 'NotoSansKR_400Regular' }}
                onPress={(isChecked: boolean) => {}}
                {...field}
              />
            )}
          />
        </View>

        <CustomButton style={{ margin: 10 }} onPress={handleSubmit(onSubmit)}>
          <Text style={{ fontFamily: 'NotoSerifKR_400Regular' }}>submit</Text>
        </CustomButton>
        {expoPushToken && <Button title='Press to Send Notification' onPress={async () => await sendPushNotification(expoPushToken)} />}
      </View>
    </ColorSchemeScreen>
  );
}
