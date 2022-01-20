import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';
import api from '../../../services/api';
import Input from '../../../components/Input/index';
import Button from '../../../components/Button/index';

import {
  Container,
  Content,
  Header,
  Main,
  Label,
  LabelRequired,
  ContentRequired,
  RequiredField,
  RequiredText,
  Text,
  Icon,
} from './style';

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
  const [visible, setVisible] = useState(true);

  type ReciveScreen = NativeStackNavigationProp<RootParamsRouteList, 'Signin'>;
  const navigation = useNavigation<ReciveScreen>();

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

  const enableVision = () => {
    setVisible(event => !event);
  };
  // const validateEmail = text => {
  //   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  //   if (reg.test(text) === false) {
  //     setEmail({ text });
  //     return false;
  //   }
  //   setEmail({ text });
  //   console.log('Email is Correct');
  // };

  return (
    <Container>
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Main>
            <Label>
              <RequiredField>Email</RequiredField>
            </Label>
            <Input
              placeholder="Email"
              name="email"
              icon="mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <LabelRequired>
              {!email ? (
                <ContentRequired>
                  <RequiredText>Campo obrigatório</RequiredText>
                  <MaterialIcons name="error" size={20} color="#c42323" />
                </ContentRequired>
              ) : (
                <></>
              )}
            </LabelRequired>
            <Label>
              <RequiredField>Nome</RequiredField>
            </Label>
            <Input
              placeholder="Nome"
              name="nome"
              icon="user"
              value={name}
              onChangeText={setName}
            />
            <LabelRequired>
              {!name ? (
                <ContentRequired>
                  <RequiredText>Campo obrigatório</RequiredText>
                  <MaterialIcons name="error" size={20} color="#c42323" />
                </ContentRequired>
              ) : (
                <></>
              )}
            </LabelRequired>
            <Label>
              <RequiredField>Sobrenome</RequiredField>
            </Label>
            <Input
              placeholder="Sobrenome"
              name="sobrenome"
              icon="user"
              value={last_name}
              onChangeText={setLastname}
            />
            <LabelRequired>
              {!last_name ? (
                <ContentRequired>
                  <RequiredText>Campo obrigatório</RequiredText>
                  <MaterialIcons name="error" size={20} color="#c42323" />
                </ContentRequired>
              ) : (
                <></>
              )}
            </LabelRequired>
            <Label>
              <RequiredField>Senha</RequiredField>
            </Label>
            <Input
              placeholder="Senha"
              name="senha"
              icon="lock"
              icon_eyes_opened="eye"
              icon_eyes_closed="eye-off"
              value_eye={visible}
              onPress={enableVision}
              secureTextEntry={!!visible}
              value={password}
              onChangeText={setPassword}
            />
            <LabelRequired>
              {!password ? (
                <ContentRequired>
                  <RequiredText>Campo obrigatório</RequiredText>
                  <MaterialIcons name="error" size={20} color="#c42323" />
                </ContentRequired>
              ) : (
                <></>
              )}
            </LabelRequired>
            <Label>
              <RequiredField>Repita sua senha</RequiredField>
            </Label>
            <Input
              placeholder="Repita sua senha"
              name="senha"
              icon="lock"
              icon_eyes_opened="eye"
              icon_eyes_closed="eye-off"
              value_eye={visible}
              onPress={enableVision}
              secureTextEntry={!!visible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <LabelRequired style={{ marginBottom: 15 }}>
              {!confirmPassword ? (
                <ContentRequired>
                  <RequiredText>Campo obrigatório</RequiredText>
                  <MaterialIcons name="error" size={20} color="#c42323" />
                </ContentRequired>
              ) : (
                <></>
              )}
            </LabelRequired>
            <Button onPress={handleRegister}> Cadastrar </Button>
          </Main>
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
}
