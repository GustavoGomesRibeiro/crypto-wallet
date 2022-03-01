import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../../utils/navigationRoutes';
import MenuHeader from '../../../../components/MenuHeader/index';
import { ContextApi } from '../../../../hooks/authContext';

import { Container, Content, Text } from './style';

export default function ListTransactions() {
  const { theme } = useContext(ContextApi);
  const navigation = useNavigation<ReceiveScreen>();

  return (
    <Container>
      <MenuHeader
        onPress={() => navigation.navigate('Transaction')}
        title="Suas Transações"
        icon="plus"
        theme={theme}
      />
      <Content>
        <Text>Lista transações</Text>
      </Content>
    </Container>
  );
}
