import React, { useEffect, useState } from 'react';
import ColorSchemeScreen from '../components/ColorSchemeScreen';
import { NavigationParameters } from '../../App';
import { ScrollView, Text, View } from 'react-native';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import CustomButton from '../components/CustomButton';
// @ts-ignore
import { API_URL } from '@env';

export default function Posts({ navigation }: MaterialBottomTabScreenProps<NavigationParameters, 'Posts'>) {
  const [array, setArray] = useState<{ userId: number; id: number; title: string; body: string }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/posts`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(r => r.json())
      .then(r => setArray(r));
  }, []);

  return (
    <ColorSchemeScreen>
      <View style={{ paddingTop: 50, width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>Posts with API</Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <CustomButton style={{ padding: 10, margin: 10 }} onPress={() => navigation.goBack()}>
              <Text>Go Back</Text>
            </CustomButton>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'column', marginBottom: 10 }}>
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: 'row',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>title</Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%', flexDirection: 'column' }}>
          {array.map(({ title }, index) => (
            <View
              key={index}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                justifyContent: 'space-between',
              }}>
              <Text>{title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ColorSchemeScreen>
  );
}
