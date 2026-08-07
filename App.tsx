/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, useColorScheme, View, ScrollView, useWindowDimensions, TouchableOpacity, Image, Text } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const APPS = [
  {
    key: 'Calls',
    subtitle: 'Calls',
    msg: 'Make calls from Here',
    icon: require('./assets/iphone_call_logo.webp'),
    notifTitle: 'Missed Call',
    notifBody: 'You have a missed call. Tap to return it.',
  },
  {
    key: 'Camera',
    subtitle: 'Camera',
    msg: 'Welcome to the camera app',
    icon: require('./assets/iphone_camera.png'),
    notifTitle: 'Camera Reminder',
    notifBody: 'Don\'t forget to capture today\'s memories!',
  },
  {
    key: 'Messages',
    subtitle: 'Messages',
    msg: 'Welcome to your Messages',
    icon: require('./assets/IMessage_logo.svg.png'),
    notifTitle: 'New Message',
    notifBody: 'You have unread messages waiting for you.',
  },
  {
    key: 'Music',
    subtitle: 'Music',
    msg: 'Welcome to the Music Selection Screen',
    icon: require('./assets/imusic.png'),
    notifTitle: 'Music Reminder',
    notifBody: 'Your playlist is ready — time to listen!',
  },
  {
    key: 'Photos',
    subtitle: 'Photos',
    msg: 'Welcome to the Photos Screen',
    icon: require('./assets/iphotos.png'),
    notifTitle: 'Photos Reminder',
    notifBody: 'You have new photos to review in your library.',
  },
];

async function scheduleReminder(title: string, body: string) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'reminders',
    name: 'App Reminders',
    importance: AndroidImportance.HIGH,
  });

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5000,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: { channelId },
    },
    trigger,
  );
}

function DetailScreen({ route }: { route: any }) {
  const { msg, notifTitle, notifBody } = route.params;
  const [scheduled, setScheduled] = useState(false);

  async function handleSetReminder() {
    try {
      await scheduleReminder(notifTitle, notifBody);
      setScheduled(true);
      Alert.alert('Reminder Set', 'You\'ll receive a notification in 5 seconds.');
    } catch (e) {
      Alert.alert('Error', 'Could not schedule notification.');
    }
  }

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailMsg}>{msg}</Text>
      <TouchableOpacity
        style={[styles.reminderBtn, scheduled && styles.reminderBtnDone]}
        onPress={handleSetReminder}
        activeOpacity={0.8}
        disabled={scheduled}
      >
        <Text style={styles.reminderBtnText}>
          {scheduled ? 'Reminder Scheduled!' : 'Set Reminder'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({navigation}: {navigation: any}){
  const {width} = useWindowDimensions();
  const gutter = 16;
  const cardWidth = (width - gutter * 3) / 2;

  useEffect(() => {
    notifee.requestPermission();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {APPS.map((item) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Detail', {
                msg: item.msg,
                notifTitle: item.notifTitle,
                notifBody: item.notifBody,
              })}
              style={[styles.card, {width: cardWidth}]}
            >
              <Image source={item.icon} style={styles.icon} resizeMode="contain" />
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Apps' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'App Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
  icon: {
    width: 70,
    height: 70,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  detailMsg: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  reminderBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  reminderBtnDone: {
    backgroundColor: '#34C759',
  },
  reminderBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
