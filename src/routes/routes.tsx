import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Initial from '../views/initial/index';

const Stack = createStackNavigator<RootParamsRouteList>();

export default function UserRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={Initial}
        options={{ title: 'Tela Inicial' }}
      />
    </Stack.Navigator>
  );
}
