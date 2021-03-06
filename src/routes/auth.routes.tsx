import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Fontisto } from 'react-native-vector-icons';
import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Initial from '../views/initial/index';
import Signin from '../views/auth/signin/index';
import Signup from '../views/auth/signup/index';
import Token from '../views/auth/token/index';

// Tab
import Crypto from '../views/initial/partials/crypto/index';
import StockInvestiment from '../views/initial/partials/stockInvestiment/index';
import InvestimentFunds from '../views/initial/partials/investimentsFunds/index';

const Stack = createStackNavigator<RootParamsRouteList>();
const Tab = createBottomTabNavigator();

const BottomTabInitialView = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0,
        shadowOpacity: 0,
        height: 100,
        backgroundColor: '#fff',
        borderTopColor: '#fff',
      },
      tabBarIconStyle: {
        flex: 1,
        marginTop: 10,
      },
      tabBarLabelStyle: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      tabBarActiveTintColor: '#016be4',
      tabBarInactiveTintColor: '#969696',
    }}
  >
    <Tab.Screen
      name="Criptomoedas"
      component={Crypto}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return <Fontisto name="money-symbol" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Ações"
      component={StockInvestiment}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="line-chart" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Fundos Imobiliários"
      component={InvestimentFunds}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="building" color={color} size={size} />;
        },
      }}
    />
  </Tab.Navigator>
);

export default function AuthRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={BottomTabInitialView}
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
        options={{ title: 'Criar uma conta', headerShown: false }}
      />
      <Stack.Screen
        name="Token"
        component={Token}
        options={{ title: 'Token', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
