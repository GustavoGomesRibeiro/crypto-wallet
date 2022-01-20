import React from 'react';
import MenuHeader from '../../../../components/MenuHeader/index';
import { Container, Text } from './style';

export default function ListWallet() {
  return (
    <Container>
      <MenuHeader title="Carteiras criadas" />
      <Text> List Wallet</Text>
      <Text>Sair</Text>
    </Container>
  );
}
