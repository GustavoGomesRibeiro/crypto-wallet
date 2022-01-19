import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootParamsRouteList } from './rootParamsRouteList/ParamsRoutesList';

import Home from '../views/home/index';
import Wallet from '../views/wallet';
import Profile from '../views/profile/index';

const Stack = createStackNavigator<RootParamsRouteList>();
const Tab = createBottomTabNavigator<RootParamsRouteList>();

const BottomNavigationInternal = () => (
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
            <MaterialCommunityIcons name="account" size={size} color={color} />
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default function BasicRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={BottomNavigationInternal}
        options={{ title: 'Home', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
