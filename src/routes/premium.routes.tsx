import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Home from '../views/home/index';
import Wallet from '../views/wallet/index';
import CreateWallet from '../views/wallet/partial/createWallet/index';
import Transaction from '../views/wallet/partial/transactions/index';
import ListTransactions from '../views/wallet/partial/listTransactions/index';
import Profile from '../views/profile/index';

import { ContextApi } from '../hooks/authContext';

const Stack = createStackNavigator<RootParamsRouteList>();
const Tab = createBottomTabNavigator<RootParamsRouteList>();

const BottomNavigationInternal = () => {
  const { theme } = useContext(ContextApi);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 0,
          shadowOpacity: 0,
          height: 100,
          backgroundColor: theme ? '#121212' : '#fff',
          borderTopColor: theme ? '#121212' : '#fff',
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
        tabBarActiveTintColor: theme ? '#ff9000' : '#016be4',
        tabBarInactiveTintColor: theme ? '#fff' : '#969696',
      }}
    >
      <Stack.Screen
        name="Início"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Carteiras"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="wallet" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function PremiumRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={BottomNavigationInternal}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="CreateWallet"
        component={CreateWallet}
        options={{ title: 'Minhas Carteiras', headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: 'Crie sua carteira', headerShown: false }}
      />
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{ title: 'Transaction', headerShown: false }}
      />
      <Stack.Screen
        name="ListTransactions"
        component={ListTransactions}
        options={{ title: 'ListTransactions', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
