import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";

const OPEN_WEATHER_API_KEY = Constants.expoConfig?.extra?.OPEN_WEATHER_API_KEY;

type WeatherData = {
    isRaining: boolean;
    description: string;
    temperature: number;
}

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Location permission denied')
                    setLoading(false)
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = loc.coords;

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
                );
                const data = await response.json();
                if (data.weather && data.weather.length > 0) {
                    const main = data.weather[0].main.toLowerCase();
                    const isRaining = main.includes('rain') || main.includes('drizzle') || main.includes('thunderstorm');

                    setWeather({
                        isRaining,
                        description: data.weather[0].description,
                        temperature: data.main.temp,
                    })
                } else {
                    setError('Weather data unavailable')
                }
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return { weather, loading, error };
}