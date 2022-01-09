import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Initial from '../views/initial/index';
import Singin from '../views/auth/signin/index';

const Stack = createStackNavigator<RootParamsRouteList>();

export default function UserRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={Initial}
        options={{ title: 'Tela Inicial', headerShown: false }}
      />
      <Stack.Screen
        name="Singin"
        component={Singin}
        options={{ title: 'Singin', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
