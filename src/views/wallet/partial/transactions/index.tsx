import React from 'react';
import MenuHeader from '../../../../components/MenuHeader/index';
import { Container, Text } from './style';

export default function Transaction() {
  return (
    <Container>
      <MenuHeader title="Crie suas transações" />
      <Text>Criar transações</Text>
    </Container>
  );
}
