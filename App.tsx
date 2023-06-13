import React, { useState } from 'react';
import { Button, Linking, StyleSheet, Text, useColorScheme, View, useWindowDimensions, ButtonProps } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App() {
  const windowDimensions = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const [number, setNumber] = useState(0);

  return (
    <View style={{ ...styles.body, ...backgroundStyle }}>
      <Text style={{}}>
        window dimensions: {Math.ceil(windowDimensions.width)} x {Math.ceil(windowDimensions.height)}
      </Text>
      <Text style={{}}>Clicked {number}</Text>
      <Button title='button title' onPress={() => Linking.openURL('https://youtube.com')} />
      <Button title='inc number' onPress={() => setNumber(prevState => prevState + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
