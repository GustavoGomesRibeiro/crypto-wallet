import React, { useState, useContext, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ContextApi } from '../../../hooks/authContext';

import getValidationErrors from '../../../utils/getValidationErrors';
import { ReceiveScreen } from '../../../utils/navigationRoutes';

import Button from '../../../components/Button/index';
import Input from '../../../components/Input/index';
import { AlertToastError } from '../../../components/Toast/index';

import { SigInFormData } from '../interfaces/index';
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

export default function Signin() {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useContext(ContextApi);
  const navigation = useNavigation<ReceiveScreen>();

  const [visible, setVisible] = useState(true);
  const [error, setError] = useState<string>('');

  const handleLogin = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        setError('error');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    },
    [signIn],
  );

  const enableVision = () => {
    setVisible(event => !event);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Form ref={formRef} onSubmit={handleLogin}>
            <Input
              name="email"
              icon="user"
              keyboardType="email-address"
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              icon_eyes_opened="eye"
              icon_eyes_closed="eye-off"
              placeholder="Senha"
              secureTextEntry={!!visible}
              onPress={enableVision}
              value_eye={visible}
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>
          <Footer>
            <Register onPress={() => navigation.navigate('Signup')}>
              <Text>Crie sua conta</Text>
            </Register>
          </Footer>
        </KeyboardAvoidingView>

        {error === 'error' ? (
          <AlertToastError name="error" icon="error">
            {'                   '}Erro na autenticação {'\n'}
            Ocorreu um erro valide suas credencias!
          </AlertToastError>
        ) : (
          <></>
        )}
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
