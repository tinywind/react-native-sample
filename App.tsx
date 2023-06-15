import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const ref = useRef<TextInput>(null);

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Text style={{ color: 'black', margin: 10 }}>write your name:</Text>
      <TextInput
        ref={ref}
        style={{ borderWidth: 1, borderRadius: 50, width: 200, borderColor: 'slategrey', textAlign: 'center' }}
        placeholder='input your name'
        onChangeText={text => setName(text)}
        keyboardType='decimal-pad'
        maxLength={5}
      />
      <TouchableOpacity
        style={{ width: 150, height: 50, margin: 20 }}
        onPress={() => {
          if (submitted) {
            ref.current?.clear();
            setSubmitted(false);
          } else if (name.length < 3) {
            ToastAndroid.show('Name must be at least 3 characters long', ToastAndroid.SHORT);
            Alert.alert(
              'Error',
              'Name must be at least 3 characters long',
              [
                {
                  text: 'Do not show again',
                  onPress: () => console.warn('Do not show again Pressed'),
                  style: 'destructive',
                },
                {
                  text: 'Cancel',
                  onPress: () => console.warn('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => console.warn('OK Pressed'),
                  style: 'default',
                },
              ],
              { cancelable: true, onDismiss: () => console.warn('Dismissed') },
            );
          } else {
            setSubmitted(true);
          }
        }}
        activeOpacity={0.2}>
        <Text>{submitted ? 'Clear' : 'Submit'}</Text>
      </TouchableOpacity>
      {submitted && <Text>My name is: {name}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
