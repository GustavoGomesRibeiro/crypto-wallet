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

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  type ReciveScreen = NativeStackNavigationProp<RootParamsRouteList, 'Signin'>;
  const navigation = useNavigation<ReciveScreen>();

  const handleRegister = async () => {
    if (!email || !name || !lastname || !password) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.create('/users', {
          email,
          name,
          lastname,
          password,
        });
        console.log(response);
        navigation.navigate('signin');
      } catch (error) {
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
          value={lastname}
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
          value={password}
          onChangeText={setPassword}
        />
        <Button onPress={handleRegister}> Cadastrar </Button>
      </Main>
    </Container>
  );
}
