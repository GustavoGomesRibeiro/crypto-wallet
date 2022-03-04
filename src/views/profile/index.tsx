import React, { useState, useContext, useEffect } from 'react';
import MenuHeader from '../../components/MenuHeader/index';
import BiometricAuth from '../../utils/authenticationId';
import { ContextApi } from '../../hooks/authContext';

import {
  Container,
  Header,
  ScrollView,
  Main,
  Label,
  Items,
  Details,
  Title,
  Switch,
} from './style';

export default function Profile() {
  const { theme, setTheme } = useContext(ContextApi);

  const [faceId, setFaceId] = useState();

  function ActivatedAuthentication() {
    setFaceId(() => BiometricAuth());
  }

  async function ThemeMode() {
    if (theme === false) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }
  return (
    <Container>
      <MenuHeader title="Perfil" theme={theme} />
      <ScrollView>
        <Header>
          <Details>
            <Title>Email</Title>
          </Details>
        </Header>
        <Main>
          <Label>App </Label>
          <Items>
            <Details>
              <Title>Aparência</Title>
              <Switch
                thumbColor="#fff"
                trackColor={{ false: '#ccc', true: '#39CC83' }}
                value={theme}
                onValueChange={ThemeMode}
              />
            </Details>
          </Items>
          <Label>Segurança </Label>
          <Items>
            <Details>
              <Title>FaceID</Title>
              <Switch
                thumbColor="#fff"
                trackColor={{ false: '#ccc', true: '#39CC83' }}
                value={faceId}
                onValueChange={ActivatedAuthentication}
              />
            </Details>
          </Items>
          <Items>
            <Details>
              <Title>Mudar Senha</Title>
            </Details>
          </Items>
        </Main>
      </ScrollView>
    </Container>
  );
}
