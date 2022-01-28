import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  LoaderContent,
  Coins,
  Details,
  ViewName,
  Thumb,
  NameCoin,
  CurrentPrice,
  Variation,
  NegativeVariation,
  Number,
} from './style';

const ListItem = ({ data }) => {
  return (
    <Coins>
      <Details>
        <ViewName>
          {data.name === undefined || '' ? (
            <NameCoin>--/--</NameCoin>
          ) : (
            <>
              <Thumb source={{ uri: data.image.thumb }} />
              <NameCoin>{data.name}</NameCoin>
            </>
          )}
        </ViewName>
        {data.market_data?.current_price?.brl === undefined || '' ? (
          <CurrentPrice>R$ --</CurrentPrice>
        ) : (
          <CurrentPrice>
            R$
            {data.market_data?.current_price?.brl
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </CurrentPrice>
        )}

        {data.market_data?.price_change_percentage_24h >= 0 ? (
          <Variation>
            <Number>
              % {data.market_data.price_change_percentage_24h.toFixed(2)}
            </Number>
          </Variation>
        ) : (
          <NegativeVariation>
            <Number>
              {data.market_data.price_change_percentage_24h.toFixed(2)}%
            </Number>
          </NegativeVariation>
        )}
      </Details>
    </Coins>
  );
};

const Loader = ({ load }) => {
  if (load) return null;
  return (
    <LoaderContent>
      <ActivityIndicator size={25} color="#121212" />
    </LoaderContent>
  );
};

export { ListItem, Loader };
