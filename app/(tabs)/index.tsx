import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Dummy weather hook (replace with real API logic)
function useWeather() {
  // Example data; in real use, fetch from API
  return {
    isRaining: false, // or false
    description: "Light rain showers",
    temperature: 22, // Celsius
    isSunny: true, // or true
  };
}




export default function Home() {
  const weather = useWeather();


  return (
    <View style={styles.container}>
      {/* Sun in top left if sunny */}
      {weather.isSunny && (
        <View style={styles.sunContainer}>
          <Image 
            source={require('../../assets/images/sun.png')} 
            resizeMode="contain"
            style={styles.sunImage} 
          />
        </View>
      )}

      {/* Temperature in top right */}
      <View style={styles.tempContainer}>
        <Text
          style={styles.tempText}>{weather.temperature}°C</Text>
      </View>

      {/* Rain animation if raining */}
      {/* {weather.isRaining && <RainAnimation />} */}

      {/* Centered weather info */}
      <View style={styles.centerContent}>
        <Text
          adjustsFontSizeToFit
          style={styles.title}>
          {weather.isRaining ? "It's raining" : "It's not raining"}
        </Text>
        <Text style={styles.description}>{weather.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f7fa", position: 'relative' },
  sunContainer: {
    position: "absolute",
    top: -2,
    left: 0,
    zIndex: 2,
  },
  sunImage: {
    width: 250,
    height: 250
  },
  tempContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 125,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1976d2",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    maxWidth: 300,
  },
});
