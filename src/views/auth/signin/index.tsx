import React, { useState, useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootParamsRouteList from '../../../routes/rootParamsRouteList/ParamsRoutesList';
import { ContextApi } from '../../../hooks/authContext';

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
  TokenContent,
  IconKey,
  LabelToken,
  TextToken,
  IconArrowUp,
} from './style';

export default function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState(true);

  type ReciveScreens = NativeStackNavigationProp<RootParamsRouteList, 'Signup'>;
  const navigation = useNavigation<ReciveScreens>();
  const { signIn } = useContext(ContextApi);

  function handleLogin() {
    signIn({
      email,
      password,
    });
  }

  const enableVision = () => {
    setVisible(event => !event);
  };

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
          name="email"
          icon="user"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          name="password"
          icon="lock"
          icon_eyes_opened="eye"
          icon_eyes_closed="eye-off"
          placeholder="Senha"
          secureTextEntry={!!visible}
          onPress={enableVision}
          value={password}
          value_eye={visible}
          onChangeText={setPassword}
        />
        <Button onPress={handleLogin}>Entrar</Button>
        <Footer>
          <Register onPress={() => navigation.navigate('Signup')}>
            <Text>Crie sua conta</Text>
          </Register>
        </Footer>
      </Main>
      <Separator />
      <TokenContent onPress={() => navigation.navigate('Token')}>
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
      </TokenContent>
    </Container>
  );
}
