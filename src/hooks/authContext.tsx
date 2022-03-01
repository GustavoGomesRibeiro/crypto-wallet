import React, { useState, useEffect, useCallback, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ReceiveScreen } from '../utils/navigationRoutes';
import PersitedTheme from '../utils/persitedTheme';
import api from '../services/api';
import { DarkTheme, LightTheme } from '../themes/index';

const ContextApi = createContext();

interface AuthState {
  token: string;
  name: string;
  lastName: string;
  role: string;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState<AuthState>(
    {} as AuthState,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState(false);
  // const [theme, setTheme] = PersitedTheme('theme', false);
  const navigation = useNavigation<ReceiveScreen>();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, name, lastName, role] = await AsyncStorage.multiGet([
        '@wallet:token',
        '@wallet:name',
        '@wallet:lastName',
        '@wallet:role',
      ]);
      if (token[1] && name[1] && lastName[1] && role[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setAuthenticated({
          token: token[1],
          name: JSON.parse(name[1]),
          lastName: JSON.parse(lastName[1]),
          role: role[1],
        });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/login', {
      email,
      password,
    });

    const { token } = response.data;
    const { name, lastName, role } = response.data.user;

    const key = [
      ['@wallet:token', token],
      ['@wallet:name', JSON.stringify(name)],
      ['@wallet:lastName', JSON.stringify(lastName)],
      ['@wallet:role', role],
    ];

    await AsyncStorage.multiSet(key);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthenticated({ token, name, lastName, role });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@wallet:token', '@wallet:name']);
    setAuthenticated({});
    navigation.navigate('Signin');
  }, []);

  return (
    <ThemeProvider theme={theme === false ? LightTheme : DarkTheme}>
      <View
        style={{
          height: STATUS_BAR_HEIGHT,
          backgroundColor: theme ? '#121212' : '#fff',
        }}
      >
        <StatusBar style={theme ? 'light' : 'dark'} translucent />
      </View>
      <ContextApi.Provider
        value={{
          token: authenticated?.token,
          name: authenticated.name,
          lastName: authenticated.lastName,
          role: authenticated.role,
          theme,
          setTheme,
          signIn,
          signOut,
          loading,
        }}
      >
        {children}
      </ContextApi.Provider>
    </ThemeProvider>
  );
}

export { ContextApi, AuthProvider };
