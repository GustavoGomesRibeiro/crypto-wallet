import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from 'react-native-vector-icons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContextApi } from '../../hooks/authContext';
import RootParamsRouteList from '../../routes/rootParamsRouteList/ParamsRoutesList';
import MenuHeader from '../../components/MenuHeader/index';
import api from '../../services/api';

import {
  Container,
  Main,
  WalletContent,
  Icons,
  Delete,
  Details,
  Label,
  Name,
  Description,
} from './style';

interface Wallet {
  name: string;
  description: string;
}

export default function Wallet() {
  const { token } = useContext(ContextApi);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  type ReceiveScreen = NativeStackNavigationProp<
    RootParamsRouteList,
    'Transaction'
  >;
  const navigation = useNavigation<ReceiveScreen>();

  useEffect(() => {
    const interval = setInterval(() => {
      api
        .get('/wallets', { headers: { Authorization: token } })
        .then(response => {
          setWallets(response.data);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleRemoveWallet(wallet) {
    await api.delete(`/wallets/${wallet.id}`, {
      headers: { Authorization: token },
    });
    setWallets(wallets.filter(wallet => wallet.id !== wallet.id));
  }

  return (
    <Container>
      <MenuHeader title="Minhas Carteiras" />
      <Main>
        {wallets.map(wallet => {
          return (
            <WalletContent
              onPress={() => navigation.navigate('Transaction')}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              key={wallet.id}
            >
              <Icons>
                <Ionicons name="wallet" size={20} color="#000" />
                <Delete onPress={() => handleRemoveWallet(wallet)}>
                  <Ionicons name="trash" size={20} color="#000" />
                </Delete>
              </Icons>
              <Details>
                <Label>Carteira:</Label>
                <Name>{wallet.name}</Name>
              </Details>
              <Details>
                <Label>Descrição:</Label>
                <Description>{wallet.description}</Description>
              </Details>
            </WalletContent>
          );
        })}
      </Main>
    </Container>
  );
}
