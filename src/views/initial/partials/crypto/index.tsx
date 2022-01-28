import React, { useState, useEffect, useRef } from 'react';
import { Alert, FlatList } from 'react-native';
import api from '../../../../services/api';
import Header from '../../../../components/Header/index';
import { ListItem, Loader } from '../../../../components/ListItem/index';

import { Altcoins } from '../../interfaces/index';
import {
  Container,
  Main,
  Label,
  LabelCoin,
  LabelPrice,
  LabelVariation,
  Details,
  Filtered,
  ViewName,
  Thumb,
  NameCoin,
  CurrentPrice,
  Variation,
  NegativeVariation,
  Number,
} from './style';

export default function Crypto() {
  const [cryptos, setCryptos] = useState<Altcoins[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();

  useEffect(() => {
    loadCryptos();
  }, []);

  async function loadCryptos() {
    if (loading) return;

    setLoading(true);
    const response = await api.get(`/cryptos?page=${page}&per_page=${perPage}`);

    setCryptos([...cryptos, ...response.data.data]);
    setPage(page + 1);
    setLoading(false);
  }

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

  return (
    <Container>
      <Header
        onPress={() => handleCryptoFilter(cryptoById)}
        value={cryptoById}
        onChangeText={setcryptoById}
        keyboardType="web-search"
      />
      <Main>
        <Label>
          <LabelCoin>Par</LabelCoin>
          <LabelPrice> Último preço </LabelPrice>
          <LabelVariation>% alt. 24h</LabelVariation>
        </Label>
        {cryptosFiltered === undefined || cryptoById === '' ? (
          <FlatList
            data={cryptos}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ListItem data={item} />}
            onEndReached={loadCryptos}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<Loader load={loading} />}
          />
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
