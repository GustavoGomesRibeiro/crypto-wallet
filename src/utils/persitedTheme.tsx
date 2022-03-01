import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PersitedTheme(key: string, initialState: any) {
  const [state, setState] = useState(async () => {
    const valueStore = await AsyncStorage.getItem(key);

    if (valueStore) {
      return JSON.parse(valueStore);
    }
    return initialState;
  });

  useEffect(() => {
    async function listeningState() {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    }
    listeningState();
  }, [key, state]);

  return [state, setState];
}

export default PersitedTheme;
