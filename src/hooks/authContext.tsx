import React, { useState, useEffect, useCallback, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../routes/rootParamsRouteList/ParamsRoutesList';
import api from '../services/api';

const ContextApi = createContext();

interface AuthState {
  token: string;
  name: string;
  last_name: string;
  role: string;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState<AuthState>(
    {} as AuthState,
  );
  const [loading, setLoading] = useState(true);

  type ReciveScreens = NativeStackNavigationProp<
    RootParamsRouteList,
    'Initial'
  >;
  const navigation = useNavigation<ReciveScreens>();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, name, last_name, role] = await AsyncStorage.multiGet([
        '@wallet:token',
        '@wallet:name',
        '@wallet:last_name',
        '@wallet:role',
      ]);
      if (token[1] && name[1] && last_name[1] && role[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setAuthenticated({
          token: token[1],
          name: JSON.parse(name[1]),
          last_name: JSON.parse(last_name[1]),
          role: role[1],
        });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.post('/login', {
          email,
          password,
        });

        const { token } = response.data;
        const { name, last_name, role } = response.data.userExists;

        const key = [
          ['@wallet:token', token],
          ['@wallet:name', JSON.stringify(name)],
          ['@wallet:last_name', JSON.stringify(last_name)],
          ['@wallet:role', role],
        ];

        await AsyncStorage.multiSet(key);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setAuthenticated({ token, name, last_name, role });
      } catch (error) {
        Alert.alert(
          'Informações Inválidas',
          'Ops! Usuário ou senha estão incorretos!',
        );
      }
    }
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
        last_name: authenticated.last_name,
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
