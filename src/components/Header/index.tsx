import React from 'react';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../utils/navigationRoutes';

import {
  Container,
  ContentHeader,
  ContainerInput,
  Icon,
  Input,
  Signin,
  Text,
} from './style';

const Header = ({ value, onChangeText, onPress, ...rest }) => {
  const navigation = useNavigation<ReceiveScreen>();

  return (
    <Container>
      <ContentHeader>
        <ContainerInput>
          <Input
            placeholder="Pesquisar"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
          <Icon onPress={() => onPress()}>
            <MaterialIcons name="search" size={20} color="#000" />
          </Icon>
        </ContainerInput>
        <Signin onPress={() => navigation.navigate('Signin')}>
          <Text>Login</Text>
          <FontAwesome name="sign-in" size={20} color="#000" />
        </Signin>
      </ContentHeader>
    </Container>
  );
};

export default Header;
