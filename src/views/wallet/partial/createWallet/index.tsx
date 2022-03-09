import React, { useState, useContext, useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../../utils/navigationRoutes';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { ContextApi } from '../../../../hooks/authContext';

import {
  AlertToastSuccess,
  AlertToastError,
} from '../../../../components/Toast/index';
import MenuHeader from '../../../../components/MenuHeader/index';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';
import api from '../../../../services/api';

import { AddWallet } from '../../interfaces/index';
import { Container, Main, Label, LabelWallet, Register } from './style';

export default function CreateWallet() {
  const { token, theme } = useContext(ContextApi);

  const formRef = useRef<FormHandles>();
  const descriptionInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<ReceiveScreen>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const createWallet = useCallback(async (data: AddWallet) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/wallets', data, { headers: { Authorization: token } });

      setSuccess(!success);
      setTimeout(() => {
        navigation.navigate('Wallet');
      }, 2000);
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
  }, []);

  return (
    <Container>
      <MenuHeader title="Criar Carteira" theme={theme} />
      <Main>
        <Form ref={formRef} onSubmit={createWallet}>
          <Label>
            <LabelWallet>Nome da carteira</LabelWallet>
          </Label>
          <Input
            name="name"
            returnKeyType="next"
            placeholder="ex. Criptmoedas"
            onSubmitEditing={() => {
              descriptionInputRef.current?.focus();
            }}
          />

          <Label>
            <LabelWallet>Descrição da carteira</LabelWallet>
          </Label>
          <Input
            ref={descriptionInputRef}
            name="description"
            placeholder="ex. Carteira de criptomoedas"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Register>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastrar
            </Button>
          </Register>

          {success ? (
            <AlertToastSuccess name="check" icon="check-circle-outline">
              Carteira cadastrada com sucesso!
            </AlertToastSuccess>
          ) : (
            <></>
          )}

          {error === 'error' ? (
            <AlertToastError name="error" icon="error">
              Os campos não devem ser vazios.
            </AlertToastError>
          ) : (
            <></>
          )}
        </Form>
      </Main>
    </Container>
  );
}
