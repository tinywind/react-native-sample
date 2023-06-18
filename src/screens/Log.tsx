import React, { useEffect, useState } from 'react';
import ColorSchemeScreen from '../components/ColorSchemeScreen';
import { NavigationParameters } from '../../App';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ScrollView, Text, View } from 'react-native';
import { getLogs } from '../utils/logs';

export default function Log({ route, navigation }: DrawerScreenProps<NavigationParameters, 'Log'>) {
  const [array, setArray] = useState<{ log: string; createdAt: any }[]>([]);
  useEffect(() => {
    getLogs().then(setArray);
  }, []);

  return (
    <ColorSchemeScreen>
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>로그</Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'column', marginBottom: 10 }}>
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: 'row',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontWeight: 'bold' }}>log</Text>
            <Text style={{ fontWeight: 'bold' }}>time</Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%', flexDirection: 'column' }}>
          {array.map(({ log, createdAt }, index) => (
            <View
              key={index}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                justifyContent: 'space-between',
              }}>
              <Text>{log}</Text>
              <Text>{createdAt}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ColorSchemeScreen>
  );
}
