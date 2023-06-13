import React, { useState } from 'react';
import { Button, Linking, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 2, backgroundColor: '#000000', flexDirection: 'row', opacity: 0.75, alignItems: 'flex-start' }}>
          <View style={{ flex: 1, backgroundColor: '#ffeeaa', opacity: 0.75, alignItems: 'center', justifyContent: 'center', minHeight: '50%' }}>
            <Text>1</Text>
          </View>
          <View style={{ flex: 2, backgroundColor: '#ffaaee', alignItems: 'center', justifyContent: 'center', minHeight: '50%' }}>
            <Text>2</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#aaffee', alignItems: 'center', justifyContent: 'center', minHeight: '50%' }}>
            <Text>3</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '#eeeeee' }} />
        <View style={{ flex: 1, backgroundColor: '#dddddd' }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
