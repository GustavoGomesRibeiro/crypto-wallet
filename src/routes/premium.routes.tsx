import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Home from '../views/home/index';
import Wallet from '../views/wallet/index';

const Stack = createStackNavigator<RootParamsRouteList>();

export default function PremiumRouter() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home', headerShown: false }}
      /> */}
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: 'Carteira', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
