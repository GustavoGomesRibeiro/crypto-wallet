import React, { useState, useContext } from 'react';
import MenuHeader from '../../components/MenuHeader/index';
import Button from '../../components/Button/index';
import BiometricAuth from '../../utils/authenticationId';
import { ContextApi } from '../../hooks/authContext';

import {
  Container,
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

  function ThemeMode() {
    if (theme === false) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }

  return (
    <Container>
      <MenuHeader title="Perfil" />
      <ScrollView>
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
          {/* <Label> Profile </Label> */}
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
          {/* <Button onPress={BiometricAuth}>Teste</Button> */}
        </Main>
      </ScrollView>
    </Container>
  );
}
