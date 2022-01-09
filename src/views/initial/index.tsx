import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootParamsRouteList from '../../routes/rootParamsRouteList/ParamsRoutesList';

import { Container, Content, Header, Main, Text, Input, Button } from './style';
import api from '../../services/api';

interface Altcoins {
  data?: [];
  success?: boolean;
  id?: string;
  symbol?: string;
  name?: string;
  message?: string;
}

// type ArrayObject = Altcoins[];

export default function Initial() {
  const [allCryptos, getAllCryptos] = useState<Altcoins>();

  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();

  type ReciveScreens = StackNavigationProp<RootParamsRouteList, 'Singin'>;

  const navigation = useNavigation<ReciveScreens>();

  useEffect(() => {
    async function apiCryptos() {
      try {
        const response = await api.get<Altcoins>('/cryptos/bitcoin');

        // console.log(response.data, '>>teste<<');

        getAllCryptos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    apiCryptos();
  }, []);

  async function handleCryptoFilter(cryptoById) {
    if (!cryptoById) {
      Alert.alert('Field cannot be empty!');
    } else {
      try {
        const response = await api.get(`/cryptos/${cryptoById}`);

        setCryptosFiltered(response.data);

        console.log(cryptosFiltered.data.id, '>>moeda filtrada<<');
      } catch (error) {
        Alert.alert('Alguma coisa deu errado');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <Input
            placeholder="Pesquisar"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={cryptoById}
            onChangeText={setcryptoById}
          />
        </Header>

        <Main>
          <Button onPress={() => handleCryptoFilter(cryptoById)}>
            <Text> Click Here</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Singin')}>
            <Text> Move </Text>
          </Button>
          <Text> {cryptosFiltered?.data.id} </Text>
        </Main>
      </Content>
    </Container>
  );
}
