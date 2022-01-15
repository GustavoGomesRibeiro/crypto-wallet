import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Content, Header, Main, Text, Footer } from './style';

interface User {
  token: string;
  name: string;
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState({});
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDataUser() {
      const [token, name] = await AsyncStorage.multiGet([
        '@wallet:token',
        '@wallet:name',
      ]);
      setAuthenticated({
        token: token[1],
        name: name[1],
      });
    }
    // setLoading(false);
    getDataUser();
  }, []);

  return (
    <Container>
      <Content>
        <Header></Header>
        <Main>
          <Text> Home </Text>
          <Text> {authenticated.name} </Text>
        </Main>
        <Footer></Footer>
      </Content>
    </Container>
  );
}
