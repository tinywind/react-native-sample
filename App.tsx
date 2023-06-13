import React, { useEffect, useRef, useState } from 'react';
import { Button, Linking, RefreshControl, SafeAreaView, ScrollView, ScrollViewComponent, StatusBar, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  type ItemType = { key: number; value: string };
  const [items, setItems] = useState<ItemType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => init(), []);
  const init = () => setItems(Array.from({ length: 20 }, (a, i) => ({ key: i + 1, value: 'item ' + (i + 1) })));
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Button
        title='add'
        onPress={() => {
          setItems(prev => [...prev, { key: prev.length + 1, value: 'new item ' + (prev.length + 1) }]);
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, flexDirection: 'column' }}
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => (setRefreshing(false), init())} colors={['#ff00ff']} />}>
        {items.map(e => (
          <View key={e.key} style={{ backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 1 }}>
            <Text style={{ color: 'white', fontSize: 40, margin: 10 }}>{e.value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
