import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Initial from '../views/initial/index';
import Signin from '../views/auth/signin/index';
import Signup from '../views/auth/signup/index';

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
        name="Signin"
        component={Signin}
        options={{ title: 'Signin', headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Signup', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
