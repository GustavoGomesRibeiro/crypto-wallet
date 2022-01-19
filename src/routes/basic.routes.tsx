import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Home from '../views/home/index';

const Stack = createStackNavigator<RootParamsRouteList>();

export default function BasicRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
