import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../../routes/rootParamsRouteList/ParamsRoutesList';

import { ContextApi } from '../../../../hooks/authContext';

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

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  type ReciveScreens = NativeStackNavigationProp<RootParamsRouteList, 'Wallet'>;
  const navigation = useNavigation<ReciveScreens>();

  const data = { name, description };

  const createWallet = async () => {
    if (!name || !description) {
      Alert.alert('Ops!', 'Os campos não devem ser vazios.');
    } else {
      try {
        const response = await api.post<Wallet>('/wallets', data, {
          headers: { Authorization: token },
        });
        Alert.alert(
          'Carteira criada com sucesso!',
          'Sua carteira foi adicionada',
        );
        navigation.navigate('Wallet');
      } catch (error) {
        Alert.alert('Ops!', 'Alguma coisa deu errado.');
      }
    }
  };

  return (
    <Container>
      <MenuHeader title="Criar Carteira" />
      <Main>
        <Label>
          <LabelWallet>Nome da carteira</LabelWallet>
        </Label>
        <Input value={name} onChangeText={setName} placeholder="Nome" />

        <Label>
          <LabelWallet>Descrição da carteira</LabelWallet>
        </Label>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição"
        />

        <Register>
          <Button onPress={createWallet}>Cadastrar</Button>
        </Register>
      </Main>
    </Container>
  );
}
