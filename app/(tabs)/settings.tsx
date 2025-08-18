import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet } from 'react-native';

export default function SettingsScreen() {
    const [locationStatus, setLocationStatus] = useState<string>('Unknown');
    const [notificationStatus, setNotificationStatus] = useState<string>('Unknown');

    useEffect(() => {
        (async () => {
            try {

                const { status: locStatus } = await Location.getForegroundPermissionsAsync();
                setLocationStatus(locStatus);

                const { status: notifStatus } = await Notifications.getPermissionsAsync()
                setNotificationStatus(notifStatus);

            } catch (err) {
                console.error('Error checking permissions: ', err)
            }
        })();
    }, [])

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationStatus(status);
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="title" style={styles.heading}>
                    Permissions
                </ThemedText>
                <ThemedText style={styles.text}>
                    Location access is required to detect when it’s raining at your current location.
                </ThemedText>
                <ThemedText style={styles.status}>
                    Status: {locationStatus}
                </ThemedText>
                <Button
                    label="Request Location Permission"
                    onPress={requestLocationPermission}
                />


                <ThemedText type="title" style={[styles.heading, { marginTop: 24 }]}>Notifications</ThemedText>
                <ThemedText style={styles.text}>
                    Notifications must be enabled so the app can alert you when it starts raining.
                </ThemedText>
                <ThemedText style={styles.status}>Status: {notificationStatus}</ThemedText>

                <ThemedText type="link" style={styles.button} onPress={openNotificationSettings}>
                    Open Notification Settings
                </ThemedText>

                <ThemedText type="title" style={[styles.heading, { marginTop: 24 }]}>About</ThemedText>
                <ThemedText style={styles.text}>
                    It’s Raining! notifies you whenever it starts raining at your location. Version 1.0
                </ThemedText>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40
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
