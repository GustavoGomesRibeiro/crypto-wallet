import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../utils/navigationRoutes';
import { ContextApi } from '../../hooks/authContext';
import MenuHeader from '../../components/MenuHeader/index';
import api from '../../services/api';

import { ListWallet } from './interfaces/index';
import {
  Loading,
  Text,
  Container,
  Content,
  Main,
  WalletContent,
  Icons,
  Delete,
  Details,
  Label,
  Name,
  Description,
  Assets,
  Crypto,
  Stock,
  Funds,
  LabelAssets,
  TextAssets,
} from './style';

export default function Wallet() {
  const { token } = useContext(ContextApi);
  const navigation = useNavigation<ReceiveScreen>();

  const [wallets, setWallets] = useState<ListWallet[]>([]);

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

  if (!wallets) {
    return (
      <>
        <Loading>
          <Text> Loading...</Text>
        </Loading>
      </>
    );
  }
  return (
    <Container>
      <MenuHeader
        onPress={() => navigation.navigate('CreateWallet')}
        icon="plus"
        title="Minhas Carteiras"
      />
      <Content>
        <Main>
          {wallets.map(wallet => {
            return (
              <WalletContent
                onPress={() => navigation.navigate('ListTransactions')}
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
                <Assets>
                  <Crypto>
                    <LabelAssets>Criptomoedas</LabelAssets>
                    <TextAssets>R$2.000,00</TextAssets>
                  </Crypto>
                  <Stock>
                    <LabelAssets>Ações</LabelAssets>
                    <TextAssets>R$1.000,00</TextAssets>
                  </Stock>
                  <Funds>
                    <LabelAssets>FIIS</LabelAssets>
                    <TextAssets>R$2.000,00</TextAssets>
                  </Funds>
                </Assets>
              </WalletContent>
            );
          })}
        </Main>
      </Content>
    </Container>
  );
}
