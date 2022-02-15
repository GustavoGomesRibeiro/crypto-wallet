import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import { View, useColorScheme } from 'react-native';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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

// import themes from './src/themes/index';
// import { DarkTheme, LightTheme } from './src/themes/index';
import Router from './src/routes/router';
import AppProvider from './src/hooks/index';

export default function App() {
  // const deviceTheme = useColorScheme();
  // const theme = themes[deviceTheme] || theme.dark;

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

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
  const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

  return (
    <NavigationContainer>
      {/* <ThemeProvider theme={theme === false ? LightTheme : DarkTheme}> */}
      <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#fff' }}>
        <StatusBar style="auto" translucent />
      </View>
      <AppProvider>
        <Router />
      </AppProvider>
      {/* </ThemeProvider> */}
    </NavigationContainer>
  );
}
