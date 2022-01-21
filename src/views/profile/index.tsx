import React from 'react';
import MenuHeader from '../../components/MenuHeader/index';

import { Container, Text } from './style';

export default function Profile() {
  return (
    <Container>
      <MenuHeader title="Perfil" />
      <Text> Profile </Text>
    </Container>
  );
}
