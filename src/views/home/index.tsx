import React, { useContext } from 'react';
import { ContextApi } from '../../hooks/authContext';

import {
  Container,
  Content,
  Header,
  Main,
  SignOut,
  Text,
  Footer,
} from './style';

export default function Home() {
  const { signOut, name, token, last_name, role } = useContext(ContextApi);

  console.log({
    name,
    token,
    last_name,
    role,
  });
  return (
    <Container>
      <Content>
        <Header></Header>
        <Main>
          <Text> Home </Text>
          <Text> {name} </Text>
          <SignOut onPress={signOut}>
            <Text>Sair</Text>
          </SignOut>
        </Main>
        <Footer></Footer>
      </Content>
    </Container>
  );
}
