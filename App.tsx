import React, { useEffect, useRef, useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, FlatList, SectionList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import debounce from './utils/debounce';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  type ItemType = { key: string; data: string[] };
  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => init(), []);
  const init = () => setItems(Array.from({ length: 5 }, (a, i) => ({ key: 'item ' + (i + 1), data: Array.from({ length: i }, (_, j) => (j + 1).toString()) })));
  const ref = useRef<SectionList>(null);
  let timeoutId: number | undefined;

  return (
    <SafeAreaView style={{ ...styles.body, ...backgroundStyle }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Button
        title='add'
        onPress={() => {
          setItems(prev => [...prev, { key: 'new item ' + (prev.length + 1), data: Array.from({ length: prev.length }, (_, j) => (j + 1).toString()) }]);
          timeoutId = debounce(timeoutId, () => ref.current?.scrollToLocation({ animated: true, sectionIndex: items.length, itemIndex: 0 }), 10);
        }}
      />
      <SectionList
        ref={ref}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        sections={items}
        renderItem={({ item }: { item: string }) => <Text style={{ color: 'black', fontSize: 20, margin: 10 }}>{item}</Text>}
        renderSectionHeader={({ section: { key } }) => <Text style={{ color: 'black', fontSize: 20, margin: 10, backgroundColor: 'yellow' }}>{key}</Text>}
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
