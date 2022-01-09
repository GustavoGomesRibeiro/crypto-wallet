import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';

import Button from '../../../components/Button/index';
import Input from '../../../components/Input/index';

import {
  Container,
  Text,
  Header,
  Icon,
  Main,
  Footer,
  Register,
  Separator,
  Token,
  IconKey,
  LabelToken,
  TextToken,
  IconArrowUp,
} from './style';

export default function Signin() {
  type ReciveScreens = NativeStackNavigationProp<
    RootParamsRouteList,
    'Initial'
  >;
  const navigation = useNavigation<ReciveScreens>();

  return (
    <Container>
      <Header>
        <Text></Text>
      </Header>
      <Icon onPress={() => navigation.navigate('Initial')}>
        <AntDesign name="arrowleft" size={20} color="#000" />
      </Icon>
      <Main>
        <Input
          name="login"
          icon="user"
          placeholder="Login"
          autoCapitalize="none"
        />
        <Input
          name="senha"
          icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
        />
        <Button>Entrar</Button>
        <Footer>
          <Register onPress={() => navigation.navigate('Signup')}>
            <Text>Signup</Text>
          </Register>
        </Footer>
      </Main>
      <Separator />
      <Token>
        <IconKey>
          <MaterialCommunityIcons name="key" size={18} color="#000" />
        </IconKey>

        <LabelToken>
          <TextToken>Token</TextToken>
        </LabelToken>

        <IconArrowUp>
          <MaterialCommunityIcons
            name="apple-keyboard-control"
            size={18}
            color="#000"
          />
        </IconArrowUp>
      </Token>
    </Container>
  );
}
