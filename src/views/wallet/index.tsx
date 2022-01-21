import React, { useContext } from 'react';
import { ContextApi } from '../../hooks/authContext';
import MenuHeader from '../../components/MenuHeader/index';
import { Container, Text, SignOut } from './style';

export default function Wallet() {
  const { signOut } = useContext(ContextApi);
  return (
    <Container>
      <MenuHeader title="Minhas Carteiras" />
      <Text> Wallet</Text>
      <SignOut onPress={signOut}>
        <Text>Sair</Text>
      </SignOut>
    </Container>
  );
}
