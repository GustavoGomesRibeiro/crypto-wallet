import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Apploading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
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
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <Router />
      </AppProvider>
    </NavigationContainer>
  );
}
