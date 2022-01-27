import React, { useState, useEffect, useCallback, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../utils/navigationRoutes';
import api from '../services/api';

const ContextApi = createContext();

interface AuthState {
  token: string;
  name: string;
  lastName: string;
  role: string;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState<AuthState>(
    {} as AuthState,
  );
  const [loading, setLoading] = useState(true);

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
    <ContextApi.Provider
      value={{
        token: authenticated?.token,
        name: authenticated.name,
        lastName: authenticated.lastName,
        role: authenticated.role,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export { ContextApi, AuthProvider };
