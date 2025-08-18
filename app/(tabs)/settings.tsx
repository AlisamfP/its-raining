import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { Linking, Platform, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [locationStatus, setLocationStatus] = useState<string>('Unknown');
  const [notificationStatus, setNotificationStatus] = useState<string>('Unknown');

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationStatus(status);
  };

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationStatus(status);
  };

  const openNotificationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:'); // opens iOS app settings
    } else {
      Linking.openSettings(); // opens Android app settings
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>Permissions</ThemedText>
      <ThemedText style={styles.text}>
        Location access is required to detect when it’s raining at your current location.
      </ThemedText>
      <ThemedText style={styles.status}>Status: {locationStatus}</ThemedText>
      <ThemedText type="link" style={styles.button} onPress={requestLocationPermission}>
        Request Location Permission
      </ThemedText>

      <ThemedText type="title" style={[styles.heading, { marginTop: 24 }]}>Notifications</ThemedText>
      <ThemedText style={styles.text}>
        Notifications must be enabled so the app can alert you when it starts raining.
      </ThemedText>
      <ThemedText style={styles.status}>Status: {notificationStatus}</ThemedText>
      <ThemedText type="link" style={styles.button} onPress={checkNotificationPermissions}>
        Check Notification Permission
      </ThemedText>
      <ThemedText type="link" style={styles.button} onPress={openNotificationSettings}>
        Open Notification Settings
      </ThemedText>

      <ThemedText type="title" style={[styles.heading, { marginTop: 24 }]}>About</ThemedText>
      <ThemedText style={styles.text}>
        It’s Raining! notifies you whenever it starts raining at your location. Version 1.0
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    fontSize: 16,
    color: '#0a7ea4',
    marginBottom: 12,
  },
});
