import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Text, Input, Button } from './style';

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
  const [cryptos, getCryptos] = useState<Altcoins>();

  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();

  useEffect(() => {
    async function apiCryptos() {
      try {
        const response = await api.get<Altcoins>('/cryptos/bitcoin');

        // console.log(response.data, '>>teste<<');

        getCryptos(response.data);
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
        <Input
          placeholder="Pesquisar"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={cryptoById}
          onChangeText={setcryptoById}
        />
        <Button onPress={() => handleCryptoFilter(cryptoById)}>
          <Text> Click Here</Text>
        </Button>
        <Text> {cryptos?.message} </Text>
        <Text> {cryptos?.data.id} </Text>
      </Content>
    </Container>
  );
}
