import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Apploading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import {
  Archivo_400Regular,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';

import Router from './src/routes/router';
import AppProvider from './src/hooks/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Apploading />;
  }

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
  const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

  return (
    <NavigationContainer>
      <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#fff' }}>
        <StatusBar style="auto" translucent />
      </View>
      <AppProvider>
        <Router />
      </AppProvider>
    </NavigationContainer>
  );
}
