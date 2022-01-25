import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../../utils/navigationRoutes';
import MenuHeader from '../../../../components/MenuHeader/index';

import { Container, Content, Text } from './style';

export default function ListTransactions() {
  const navigation = useNavigation<ReceiveScreen>();

  return (
    <Container>
      <MenuHeader
        onPress={() => navigation.navigate('Transaction')}
        title="Suas Transações"
        icon="plus"
      />
      <Content>
        <Text>Lista transações</Text>
      </Content>
    </Container>
  );
}
