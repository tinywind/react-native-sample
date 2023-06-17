import React, { useEffect, useState } from 'react';
import ColorSchemeScreen from '../components/ColorSchemeScreen';
import { NavigationParameters } from '../../App';
import * as SQLite from 'expo-sqlite';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DATABASE_FILE } from '../constants';
import { ScrollView, Text, View } from 'react-native';

const database = SQLite.openDatabase(DATABASE_FILE);

export default function LoginHistory({ route, navigation }: DrawerScreenProps<NavigationParameters, 'LoginHistory'>) {
  const [array, setArray] = useState<{ userId: string; createdAt: any }[]>([]);

  useEffect(() => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM login_history',
        [],
        (_, { rows: { _array } }) => {
          console.log(_array);
          setArray(_array.sort(e => e.id).map(({ login_id, created_at }) => ({ userId: login_id, createdAt: created_at })));
        },
        (transaction, error) => {
          console.error(error);
          return true;
        },
      );
    });
  }, []);

  useEffect(() => {
    console.log(array);
  }, [array]);

  return (
    <ColorSchemeScreen>
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>로그인 기록</Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'column', marginBottom: 10 }}>
          <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>ID</Text>
            <Text style={{ fontWeight: 'bold' }}>Login time</Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%', flexDirection: 'column' }}>
          {array.map(({ userId, createdAt }, index) => (
            <View key={index} style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between' }}>
              <Text>{userId}</Text>
              <Text>{createdAt}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ColorSchemeScreen>
  );
}
