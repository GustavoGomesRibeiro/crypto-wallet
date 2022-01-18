import React, { useState } from 'react';
import { Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';
import api from '../../../services/api';

import Button from '../../../components/Button/index';
import Input from '../../../components/Input/index';

import {
  Container,
  Text,
  Header,
  Icon,
  Main,
  Footer,
  Register,
  Separator,
  TokenContent,
  IconKey,
  LabelToken,
  TextToken,
  IconArrowUp,
} from './style';

interface Login {
  email: string;
  password: string;
  token: string;
  name: string;
}

export default function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  type ReciveScreens = NativeStackNavigationProp<
    RootParamsRouteList,
    'Initial'
  >;
  const navigation = useNavigation<ReciveScreens>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.post<Login>('/login', {
          email,
          password,
        });

        const { token } = response.data;

        // console.log(response.data);

        const key = [
          ['@wallet:token', token],
          ['@wallet:name', response.data.userExists.name],
        ];

        await AsyncStorage.multiSet(key);

        // api.defaults.headers.token = `Bearer ${token[1]}`;

        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Ops!', 'Alguma coisa deu errado');
      }
    }
  };

  return (
    <Container>
      <Header>
        <Text></Text>
      </Header>
      <Icon onPress={() => navigation.navigate('Initial')}>
        <AntDesign name="arrowleft" size={20} color="#000" />
      </Icon>
      <Main>
        <Input
          name="email"
          icon="user"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button onPress={handleLogin}>Entrar</Button>
        <Footer>
          <Register onPress={() => navigation.navigate('Signup')}>
            <Text>Crie sua conta</Text>
          </Register>
        </Footer>
      </Main>
      <Separator />
      <TokenContent onPress={() => navigation.navigate('Token')}>
        <IconKey>
          <MaterialCommunityIcons name="key" size={18} color="#000" />
        </IconKey>

        <LabelToken>
          <TextToken>Token</TextToken>
        </LabelToken>

        <IconArrowUp>
          <MaterialCommunityIcons
            name="apple-keyboard-control"
            size={18}
            color="#000"
          />
        </IconArrowUp>
      </TokenContent>
    </Container>
  );
}
