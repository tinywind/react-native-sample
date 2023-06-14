import React, { useEffect, useRef, useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import debounce from './utils/debounce';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  type ItemType = { key: number; value: string };
  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => init(), []);
  const init = () => setItems(Array.from({ length: 20 }, (a, i) => ({ key: i + 1, value: 'item ' + (i + 1) })));
  const ref = useRef<FlatList>(null);
  let timeoutId: number | undefined;

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Button
        title='add'
        onPress={() => {
          setItems(prev => [...prev, { key: prev.length + 1, value: 'new item ' + (prev.length + 1) }]);
          timeoutId = debounce(timeoutId, () => ref.current?.scrollToEnd({ animated: true }));
        }}
      />
      <FlatList
        ref={ref}
        horizontal={true}
        // numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        data={items}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 1,
            }}>
            <Text style={{ color: 'white', fontSize: 40, margin: 10 }}>{item.value}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
