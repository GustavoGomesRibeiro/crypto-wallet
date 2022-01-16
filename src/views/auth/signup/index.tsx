import React, { useState } from 'react';
import { Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';
import api from '../../../services/api';
import Input from '../../../components/Input/index';
import Button from '../../../components/Button/index';

import { Container, Header, Text, Icon, Main } from './style';

interface RegisterUser {
  email: string;
  name: string;
  last_name: string;
  password: string;
}

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [last_name, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  type ReciveScreen = NativeStackNavigationProp<RootParamsRouteList, 'Signin'>;
  const navigation = useNavigation<ReciveScreen>();

  // const validatedPassword = () => {
  //   if (password != confirmPassword) {
  //     Alert.alert('Ops!', 'As senhas estão diferentes');
  //   }
  // };

  const handleRegister = async () => {
    if (!email || !name || !last_name || !password) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else if (password !== confirmPassword) {
      Alert.alert('Ops!', 'As senhas estão diferentes');
    } else {
      try {
        const response = await api.post<RegisterUser>('/users', {
          email,
          name,
          last_name,
          password,
        });

        Alert.alert('Cadastro realizado!');
        navigation.navigate('Signin');
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Erro ao registrar',
          'Ops algo deu errado. Tente novamente!',
        );
      }
    }
  };
  return (
    <Container>
      <Header>
        <Text></Text>
      </Header>
      <Icon onPress={() => navigation.navigate('Signin')}>
        <AntDesign name="arrowleft" size={20} color="#000" />
      </Icon>

      <Main>
        <Input
          placeholder="Email"
          name="email"
          icon="mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Nome"
          name="nome"
          icon="user"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Sobrenome"
          name="sobrenome"
          icon="user"
          value={last_name}
          onChangeText={setLastname}
        />
        <Input
          placeholder="Senha"
          name="senha"
          icon="lock"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Repita sua senha"
          name="senha"
          icon="lock"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button onPress={handleRegister}> Cadastrar </Button>
      </Main>
    </Container>
  );
}
