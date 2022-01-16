import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '../../../../services/api';
import Header from '../../../../components/Header/index';
import {
  Loading,
  Container,
  Main,
  Label,
  LabelCoin,
  LabelPrice,
  LabelVariation,
  Details,
  Filtered,
  Coins,
  ViewName,
  Thumb,
  NameCoin,
  CurrentPrice,
  Empty,
  Variation,
  NegativeVariation,
  Number,
  Text,
} from './style';

interface Altcoins {
  data?: [
    {
      id?: string;
      symbol?: string;
      name?: string;
      image: {
        thumb?: string;
      };
    },
    {
      market_data?: {
        current_price?: {
          brl?: number;
        };
        price_change_percentage_24h?: {
          brl?: number;
        };
      };
    },
  ];
  success?: boolean;
  id?: string;
  message?: string;
}

export default function Crypto() {
  const [allCryptos, getAllCryptos] = useState<Altcoins[]>([]);

  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();

  useEffect(() => {
    api.get('/cryptos').then(response => {
      getAllCryptos(response.data);
    });
  }, []);

  async function handleCryptoFilter(cryptoById) {
    if (!cryptoById) {
      Alert.alert('Ops!', 'Campo de busca não pode ser vazio!');
    }
    try {
      const response = await api.get(`/cryptos/${cryptoById.toLowerCase()}`);
      setCryptosFiltered(response.data);
    } catch (error) {
      Alert.alert('Ops!', 'Algo deu errado ao pesquisar token!');
    }
  }

  if (!allCryptos?.data) {
    return (
      <>
        <Header />
        <Loading>
          <Text> Loading...</Text>
        </Loading>
      </>
    );
  }

  return (
    <Container>
      <Header
        onPress={() => handleCryptoFilter(cryptoById)}
        value={cryptoById}
        onChangeText={setcryptoById}
      />
      <Main>
        <Label>
          <LabelCoin>Par</LabelCoin>
          <LabelPrice> Último preço </LabelPrice>
          <LabelVariation>% alt. 24h</LabelVariation>
        </Label>
        {cryptosFiltered === undefined || cryptoById === '' ? (
          allCryptos?.data.map(crypto => {
            return (
              <Coins key={crypto.id}>
                <Details>
                  <ViewName>
                    {crypto.name === undefined || '' ? (
                      <NameCoin>--/--</NameCoin>
                    ) : (
                      <>
                        <Thumb source={{ uri: crypto.image.thumb }} />
                        <NameCoin>{crypto.name}</NameCoin>
                      </>
                    )}
                  </ViewName>
                  {crypto.market_data?.current_price?.brl === undefined ||
                  '' ? (
                    <CurrentPrice>R$ --</CurrentPrice>
                  ) : (
                    <CurrentPrice>
                      R$
                      {crypto.market_data?.current_price?.brl
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </CurrentPrice>
                  )}

                  {crypto.market_data?.price_change_percentage_24h >= 0 ? (
                    <Variation>
                      <Number>
                        {crypto.market_data?.price_change_percentage_24h.toFixed(
                          2,
                        )}
                        %
                      </Number>
                    </Variation>
                  ) : (
                    <NegativeVariation>
                      <Number>
                        {crypto.market_data?.price_change_percentage_24h.toFixed(
                          2,
                        )}
                        %
                      </Number>
                    </NegativeVariation>
                  )}
                </Details>
              </Coins>
            );
          })
        ) : (
          <Filtered>
            <Details>
              <ViewName>
                <Thumb source={{ uri: cryptosFiltered?.data?.image.thumb }} />
                <NameCoin>{cryptosFiltered?.data?.name}</NameCoin>
              </ViewName>
              <CurrentPrice>
                R$
                {cryptosFiltered?.data?.market_data?.current_price?.brl
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </CurrentPrice>

              {cryptosFiltered?.data?.market_data
                ?.price_change_percentage_24h >= 0 ? (
                <Variation>
                  <Number>
                    {cryptosFiltered?.data?.market_data?.price_change_percentage_24h.toFixed(
                      2,
                    )}
                    %
                  </Number>
                </Variation>
              ) : (
                <NegativeVariation>
                  <Number>
                    {cryptosFiltered?.data?.market_data?.price_change_percentage_24h.toFixed(
                      2,
                    )}
                    %
                  </Number>
                </NegativeVariation>
              )}
            </Details>
          </Filtered>
        )}
      </Main>
    </Container>
  );
}
