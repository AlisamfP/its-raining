import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { useAsyncStorage } from './useAsyncStorage';


const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;


let apiCallCount = 0;
function incrementApiCallCount() {
    apiCallCount += 1;
    console.log(`Weather API calls made: ${apiCallCount}`);
}

type WeatherData = {
    isRaining: boolean;
    description: string;
    temperature: number;
}

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const { value: cachedWeather, save: saveWeather, loading: cacheLoading } = useAsyncStorage<WeatherData>('weather_cache', 5 * 60 * 1000)

    useEffect(() => {
        let isMounted = true;
        (async () => {
            setLoading(true);
            try {
                if (cachedWeather) {
                    if (isMounted) setWeather(cachedWeather);
                    console.log('Using cached weather data');
                    setLoading(false);
                    return;
                }
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
                incrementApiCallCount();
                const data = await response.json();
                if (data.weather && data.weather.length > 0) {
                    const main = data.weather[0].main.toLowerCase();
                    const isRaining = main.includes('rain') || main.includes('drizzle') || main.includes('thunderstorm');

                    const weatherData: WeatherData = {
                        isRaining,
                        description: data.weather[0].description,
                        temperature: data.main.temp,
                    }
                    saveWeather(weatherData);
                    if(isMounted) setWeather(weatherData);
                } else {
                    if(isMounted) setError('Weather data unavailable')
                }
            } catch (err) {
                if(isMounted) setError((err as Error).message)
            } finally {
                if(isMounted) setLoading(false)
            }
        })()
        return () => { isMounted = false }
    }, [cachedWeather, saveWeather])

    return { weather, loading: loading || cacheLoading, error };
}