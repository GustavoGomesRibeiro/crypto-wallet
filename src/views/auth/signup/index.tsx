import React, { useCallback, useState, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../utils/navigationRoutes';

import api from '../../../services/api';
import Input from '../../../components/Input/index';
import Button from '../../../components/Button/index';
import MenuHeader from '../../../components/MenuHeader/index';
import {
  AlertToastError,
  AlertToastSuccess,
} from '../../../components/Toast/index';

import { RegisterUser } from '../interfaces/index';
import { Container, Content, Main, Label, RequiredField } from './style';

export default function Signup() {
  const formRef = useRef<FormHandles>();
  const emailInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<ReceiveScreen>();

  const [visible, setVisible] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = useCallback(async (data: RegisterUser) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert('Valide sua senha!', 'Senhas divergentes!');
    } else {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          name: Yup.string().required('Nome obrigatório'),
          lastName: Yup.string().required('Sobrenome obrigatório'),
          password: Yup.string().min(
            6,
            'Digite uma senha de no mínimo 6 dígitos',
          ),
          confirmPassword: Yup.string().min(6, 'Repita sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        setSuccess(!success);
        setTimeout(() => {
          navigation.navigate('Signin');
        }, 2000);
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        }

        setError('error');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  }, []);

  const enableVision = () => {
    setVisible(event => !event);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <MenuHeader title="Crie sua conta" />
          <Main>
            <Form ref={formRef} onSubmit={handleRegister}>
              <Label>
                <RequiredField>Email</RequiredField>
              </Label>
              <Input
                ref={emailInputRef}
                placeholder="Email"
                autoCapitalize="none"
                name="email"
                icon="mail"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nameInputRef.current?.focus();
                }}
              />
              <Label>
                <RequiredField>Nome</RequiredField>
              </Label>
              <Input
                ref={nameInputRef}
                placeholder="Nome"
                name="name"
                icon="user"
                returnKeyType="next"
                onSubmitEditing={() => {
                  lastNameInputRef.current?.focus();
                }}
              />
              <Label>
                <RequiredField>Sobrenome</RequiredField>
              </Label>
              <Input
                ref={lastNameInputRef}
                placeholder="Sobrenome"
                name="lastName"
                icon="user"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Label>
                <RequiredField>Senha</RequiredField>
              </Label>
              <Input
                ref={passwordInputRef}
                placeholder="Senha"
                name="password"
                icon="lock"
                icon_eyes_opened="eye"
                icon_eyes_closed="eye-off"
                value_eye={visible}
                onPress={enableVision}
                secureTextEntry={!!visible}
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Label>
                <RequiredField>Repita sua senha</RequiredField>
              </Label>
              <Input
                placeholder="Repita sua senha"
                name="confirmPassword"
                icon="lock"
                icon_eyes_opened="eye"
                icon_eyes_closed="eye-off"
                value_eye={visible}
                onPress={enableVision}
                secureTextEntry={!!visible}
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
                Cadastrar
              </Button>
              {error === 'error' ? (
                <AlertToastError name="error" icon="error">
                  {'                   '}Erro no cadastro {'\n'}
                  Ocorreu um erro ao fazer o cadastro!
                </AlertToastError>
              ) : (
                <></>
              )}

              {success ? (
                <AlertToastSuccess name="success" icon="check-circle-outline">
                  Cadastrado com sucesso
                </AlertToastSuccess>
              ) : (
                <></>
              )}
            </Form>
          </Main>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
