import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '../../../../services/api';
import Header from '../../../../components/Header/index';
import {
  Container,
  Main,
  Label,
  LabelCoin,
  LabelPrice,
  LabelVariation,
  Details,
  Coins,
  ViewName,
  NameCoin,
  CurrentPrice,
  Variation,
  Number,
  Text,
} from './style';

interface Altcoins {
  data?: [];
  market_data?: {
    current_price?: {
      brl?: boolean;
    };
  };
  success?: boolean;
  id?: string;
  message?: string;
}

export default function Crypto() {
  const [allCryptos, getAllCryptos] = useState<Altcoins>();

  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();

  useEffect(() => {
    async function apiCryptosAll() {
      try {
        const response = await api.get<Altcoins>('/cryptos');

        // console.log(response.data, '>>teste<<');

        getAllCryptos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    apiCryptosAll();
  }, []);

  useEffect(() => {
    async function apiCryptosById() {
      try {
        const response = await api.get<Altcoins>('/cryptos/bitcoin');

        // console.log(response.data, '>>teste<<');

        getAllCryptos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    apiCryptosById();
  }, []);

  async function handleCryptoFilter(cryptoById) {
    if (!cryptoById) {
      Alert.alert('Field cannot be empty!');
    } else {
      try {
        const response = await api.get(`/cryptos/${cryptoById}`);

        setCryptosFiltered(response.data);

        // console.log(cryptosFiltered.data.id, '>>moeda filtrada<<');
      } catch (error) {
        Alert.alert('Alguma coisa deu errado');
      }
    }
  }

  // console.log(allCryptos.market_data?.current_price?.brl, 'TESTE');
  return (
    <Container>
      <Header
        onPress={() => handleCryptoFilter(cryptoById)}
        value={cryptoById}
        onChangeText={setcryptoById}
      />
      {/* <Text> {cryptosFiltered?.data.id} </Text> */}
      <Main>
        <Coins>
          <Label>
            <LabelCoin>Par</LabelCoin>
            <LabelPrice> Último preço </LabelPrice>
            <LabelVariation>% alt. 24h</LabelVariation>
          </Label>
          <Details>
            <ViewName>
              <NameCoin>
                {allCryptos?.data.name}/{allCryptos?.data.symbol}
              </NameCoin>
            </ViewName>
            {/* <CurrentPrice>{allCryptos?.market_data}</CurrentPrice> */}
            <Variation>
              <Number>14%</Number>
            </Variation>
          </Details>
        </Coins>
        <Coins>
          <Details>
            <ViewName>
              <NameCoin>Ethereum</NameCoin>
            </ViewName>
            <CurrentPrice>$400</CurrentPrice>
            <Variation>
              <Number>-2%</Number>
            </Variation>
          </Details>
        </Coins>
      </Main>
    </Container>
  );
}
