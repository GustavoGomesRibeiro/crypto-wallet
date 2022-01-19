import React, { useContext } from 'react';
import { ContextApi } from '../../hooks/authContext';
import { Container, Text, SignOut } from './style';

export default function Wallet() {
  const { signOut } = useContext(ContextApi);
  return (
    <Container>
      <Text> Wallet</Text>
      <SignOut onPress={signOut}>
        <Text>Sair</Text>
      </SignOut>
    </Container>
  );
}
