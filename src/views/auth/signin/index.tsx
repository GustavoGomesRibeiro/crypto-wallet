import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';

import {
  Container,
  Text,
  Header,
  Icon,
  Main,
  Input,
  Button,
  Enter,
  Footer,
  Register,
  Separator,
  Token,
  IconKey,
  LabelToken,
  TextToken,
  IconArrowUp,
} from './style';

export default function Singin() {
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
        <Input placeholder="Login" placeholderTextColor="#fff" />
        <Input placeholder="Senha" placeholderTextColor="#fff" />
        <Button>
          <Enter>Entrar</Enter>
        </Button>
        <Footer>
          <Register>
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
