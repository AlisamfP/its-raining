import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAsyncStorage<T>(key: string, expiryMs: number) {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const { timestamp, data } = JSON.parse(stored);
          if (Date.now() - timestamp < expiryMs) {
            if (isMounted) setValue(data);
            return;
          }
        }
        if (isMounted) setValue(null); // cache expired or missing
      } catch (err) {
        console.error('AsyncStorage error', err);
        if (isMounted) setValue(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => { isMounted = false };
  }, [key, expiryMs]);

  const save = async (data: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
      setValue(data);
    } catch (err) {
      console.error('AsyncStorage save error', err);
    }
  };

  return { value, save, loading };
}
