import React, { Component, useRef, useState } from 'react';
import { Button, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { AnimatableProperties } from 'react-native-animatable';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const textInput = useRef<TextInput>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const animatableRef = useRef<Component<AnimatableProperties<ViewStyle> & ViewProps, any, any> & Animatable.View>(null);

  const summit = async () => {
    setSubmitted(true);
    if (animatableRef.current?.bounceIn) await animatableRef.current.bounceIn(1000);
  };

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Modal visible={showWarning} animationType='slide' onRequestClose={() => setShowWarning(false)} transparent={true}>
        <View
          style={{
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'wheat',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                padding: -10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'yellow',
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>WARNING</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Name must be at least 3 characters long</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button title='close' onPress={() => setShowWarning(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Text style={{ color: 'black', margin: 10 }}>write your name:</Text>
      <TextInput
        ref={textInput}
        style={{ borderWidth: 1, borderRadius: 50, width: 200, borderColor: 'slategrey', textAlign: 'center' }}
        placeholder='input your name'
        onChangeText={text => setName(text)}
        keyboardType='decimal-pad'
        maxLength={5}
      />
      <TouchableOpacity
        style={{ width: 150, height: 50, margin: 20 }}
        onPress={async () => {
          if (submitted) {
            textInput.current?.clear();
            setSubmitted(false);
            setName('');
          } else if (name.length < 3) {
            setShowWarning(true);
          } else {
            await summit();
          }
        }}
        activeOpacity={0.2}>
        <Text>{submitted ? 'Clear' : 'Submit'}</Text>
      </TouchableOpacity>
      {submitted && (
        <Animatable.View ref={animatableRef} animation='bounceIn'>
          <Text style={{ color: 'black', margin: 10 }}>
            My name is: <AntDesign name='windows' />
            {name}
          </Text>
        </Animatable.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
