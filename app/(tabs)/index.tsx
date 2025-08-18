import { SafeAreaView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useWeather } from '@/hooks/useWeather';


export default function HomeScreen() {
  const { weather, loading, error } = useWeather();
  console.log(weather);
  let backgroundColor = '#A1CEDC'; // default light blue
  if (weather?.isRaining) backgroundColor = '#1E90FF'; // rainy blue
  else if (weather) backgroundColor = '#FFD700'; // sunny gold

  return (

      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {loading && <ThemedText type="title">Checking the skies...</ThemedText>}
        {error && <ThemedText type="title">⚠ {error}</ThemedText>}
        {weather && (
          <>
          <IconSymbol
            name={weather.isRaining ? 'cloud.rain.fill' : 'sun.max.fill'}
            size={120}
            color={'white'}
            style={styles.weatherIcon}
          /><ThemedText type="title" style={styles.temperature}>
              {Math.round(weather.temperature)}°C
            </ThemedText>
            </>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  weatherIcon: {
    marginBottom: 20,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 72,
  }
});
