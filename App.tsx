/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, ScrollView, useWindowDimensions, TouchableOpacity, Image, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const APPS = [
  {
    key: 'Calls',
    subtitle: 'Calls',
    msg: 'Make Calls from here',
    icon: 'https://img.icons8.com/fluency/96/phone.png',
    tint: '#34C759',
  },
  {
    key: 'Camera',
    subtitle: 'Camera',
    msg: 'Take Pictures from here',
    icon: 'https://img.icons8.com/fluency/96/camera.png',
    tint: '#5E5E5E'
  },
  {
    key: 'Messages',
    subtitle: 'Messages',
    msg: 'Send Messages from here',
    icon: 'https://img.icons8.com/fluency/96/messages.png',
    tint: '#34C759',
  },
  {
    key: 'Music',
    subtitle: 'Music',
    msg: 'Play Music from here',
    icon: 'https://img.icons8.com/fluency/96/music.png',
    tint: '#FF3B30',
  },
  {
    key: 'Photos',
    subtitle: 'Photos',
    msg: 'View Photos from here',
    icon: 'https://img.icons8.com/fluency/96/photos.png',
    tint: '#FFFFFF',
  }
]

function HomeScreen({navigation}: {navigation: any}){
  const {width} = useWindowDimensions();
  const gutter = 16;
  const cardWidth = (width - gutter * 3) / 2;

  return ( 
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {APPS.map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.85}
              onPress={() => navigation?.navigate('Detail', { title: item.key, msg: item.msg })}
              style={[styles.card, {width: cardWidth}]}
            >
              <View style={[styles.iconWrap, { backgroundColor: item.tint }]}>
                <Image source={{ uri: item.icon }} style={styles.icon} resizeMode="contain" />
              </View>
              <Text style={styles.cardText}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
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
    textAlign: 'center',
  },
});

export default App;
