import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    sound: 'default',
    title: 'Informações das criptomoedas 💰',
    body: 'Você tem uma nova menssagem, pamonha',
    // data: { data: allCryptos?.success },
  },
  trigger: {
    seconds: 60 * 60,
    // repeats: true,
  },
});

export default function Crypto() {
  const [allCryptos, getAllCryptos] = useState<Altcoins[]>([]);
  const [cryptoById, setcryptoById] = useState('');
  const [cryptosFiltered, setCryptosFiltered] = useState();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    api.get('/cryptos').then(response => {
      getAllCryptos(response.data);
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
      return;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // local: send notification
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     sound: 'default',
  //     title: 'Informações das criptomoedas 💰',
  //     body: 'Você tem uma nova menssagem',
  //     // data: { data: allCryptos?.success },
  //   },
  //   trigger: {
  //     seconds: 3600,
  //     // repeats: true,
  //   },
  // });

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
