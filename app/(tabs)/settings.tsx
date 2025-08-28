import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import { Button, Linking, Platform, StyleSheet, Text, View } from "react-native";

function openAppSettings() {
    if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
    } else {
        Linking.openSettings();
    }
}

function AboutSection() {
    return (
        <View
            accessible
            accessibilityRole="summary"
            style={{ marginTop: 32, marginHorizontal: 24 }}
        >
            <Text
                accessibilityRole="header"
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}
            >
                About This App
            </Text>
            <Text
                accessibilityRole="text"
                style={{ fontSize: 16, marginBottom: 8 }}
            >
                This app notifies you if it's raining outside, so you can plan your day accordingly.
            </Text>
            <Text
                accessibilityRole="text"
                style={{ fontSize: 16, marginBottom: 8 }}
            >
                To function as intended, the app requires access to your device's location and permission to send notifications.
            </Text>
            <Text
                accessibilityRole="text"
                style={{ fontSize: 16, marginBottom: 8 }}
            >
                Please ensure both permissions are enabled.
            </Text>
        </View>
    );
}

function PermissionsCTA() {
    const [locationStatus, setLocationStatus] = useState<"unknown" | "granted" | "denied">("unknown");
    const [notificationStatus, setNotificationStatus] = useState<"unknown" | "granted" | "denied">("unknown");

    async function requestLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationStatus(status === "granted" ? "granted" : "denied");
        if (status !== "granted") openAppSettings();
    }

    async function requestNotifications() {
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationStatus(status === "granted" ? "granted" : "denied");
        if (status !== "granted") openAppSettings();
    }

    return (
        <View style={styles.container}>
            <Text
                accessibilityRole="header"
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}
            >
                Enable Permissions
            </Text>
            <Button
                title={
                    locationStatus === "granted"
                        ? "Location Access Granted"
                        : "Grant Location Access"
                }
                onPress={requestLocation}
                accessibilityLabel="Grant location access"
                disabled={locationStatus === "granted"}
            />
            <View style={{ height: 16 }} />
            <Button
                title={
                    notificationStatus === "granted"
                        ? "Notifications Enabled"
                        : "Enable Notifications"
                }
                onPress={requestNotifications}
                accessibilityLabel="Enable notifications"
                disabled={notificationStatus === "granted"}
            />
        </View>
    );
}

export default function Settings() {
    return (
        <>
        <AboutSection />
        <PermissionsCTA />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
    
})