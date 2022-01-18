import React, { useState, useEffect, useCallback, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../routes/rootParamsRouteList/ParamsRoutesList';
import api from '../services/api';

const ContextApi = createContext();

interface Login {
  email: string;
  password: string;
  token: string;
  name: string;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState({});
  const [loading, setLoading] = useState(false);

  type ReciveScreens = NativeStackNavigationProp<
    RootParamsRouteList,
    'Initial'
  >;
  const navigation = useNavigation<ReciveScreens>();
  useEffect(() => {
    async function loadStorage() {
      const [token, name] = await AsyncStorage.multiGet([
        '@wallet:token',
        '@wallet:name',
      ]);
      if (token[1] && name[1]) {
        api.defaults.headers.Token = `Bearer ${token[1]}`;
        setAuthenticated({
          token: token[1],
          name: name[1],
        });
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.post<Login>('/login', {
          email,
          password,
        });

        const { token } = response.data;

        const key = [
          ['@wallet:token', token],
          ['@wallet:name', response.data.userExists.name],
        ];

        await AsyncStorage.multiSet(key);

        api.defaults.headers.Token = `Bearer ${token[1]}`;

        setAuthenticated({ email, password });

        navigation.navigate('Home');
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
  }, []);

  return (
    <ContextApi.Provider
      value={{
        token: authenticated.token,
        name: authenticated.name,
        signIn,
        signOut,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export { ContextApi, AuthProvider };
