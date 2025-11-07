/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, FlatList, useWindowDimensions, TouchableOpacity, Image, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const APPS = [
  {
    key: 'Calls',
    msg: 'Make Calls from here',
    icon: 'https://img.icons8.com/fluency/96/phone.png',
    tint: '#34C759',
  }
]

function HomeScreen({navigation}: {navigation: any}){
  const {width} = useWindowDimensions();
  const gutter =16;
  const cardWidth = (width - gutter * 3) / 2;

  const renderItem = ({ item }: {item: any}) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Detail', { title: item.key, msg: item.msg })}
      style={[styles.card, {width: cardWidth}]}
    >
    <View style={[styles.iconWrap, { backgroundColor: item.tint }]}>
        <Image source={{ uri: item.icon }} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.cardText}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return ( 
    <View style={styles.screen}>
      <FlatList
        data={APPS}
        numColumns={2}
        columnWrapperStyle={{ gap: gutter }}
        contentContainerStyle={{ padding: gutter, gap: gutter }}
        keyExtractor={(it) => it.key}
        renderItem={renderItem}
      />
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <HomeScreen navigation={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default App;
