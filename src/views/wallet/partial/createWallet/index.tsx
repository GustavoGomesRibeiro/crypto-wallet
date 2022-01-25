import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../../utils/navigationRoutes';

import { ContextApi } from '../../../../hooks/authContext';

import {
  AlertToastSuccess,
  AlertToastError,
} from '../../../../components/Toast/index';
import MenuHeader from '../../../../components/MenuHeader/index';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';
import api from '../../../../services/api';

import { Container, Main, Label, LabelWallet, Register } from './style';

interface Wallet {
  name: string;
  description: string;
  user_id: number;
}

export default function CreateWallet() {
  const { token } = useContext(ContextApi);
  const navigation = useNavigation<ReceiveScreen>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [toast, setToast] = useState(false);

  const data = { name, description };

  const createWallet = async () => {
    if (!name || !description) {
      Alert.alert('Ops!', 'Os campos não devem ser vazios.');
    } else {
      try {
        const response = await api.post<Wallet>('/wallets', data, {
          headers: { Authorization: token },
        });

        if (response.status === 200) {
          setToast(!toast);
        }

        setTimeout(() => {
          navigation.navigate('Wallet');
        }, 2000);
      } catch (error) {
        Alert.alert('Ops!', 'Alguma coisa deu errado.');
      }
    }
  };

  return (
    <Container>
      <MenuHeader title="Criar Carteira" />
      <Main>
        {toast ? (
          <AlertToastSuccess name="check" icon="checkmark-circle-outline">
            Carteira cadastrada
          </AlertToastSuccess>
        ) : (
          <></>
        )}

        <Label>
          <LabelWallet>Nome da carteira</LabelWallet>
        </Label>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="ex. Criptmoedas"
        />

        <Label>
          <LabelWallet>Descrição da carteira</LabelWallet>
        </Label>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="ex. Carteira de criptomoedas"
        />

        <Register>
          <Button onPress={createWallet}>Cadastrar</Button>
        </Register>
      </Main>
    </Container>
  );
}
