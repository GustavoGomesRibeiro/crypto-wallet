import React, { useState, useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ContextApi } from '../../hooks/authContext';

import {
  Container,
  Content,
  Header,
  InfoUser,
  AreaUser,
  Exit,
  SignOut,
  TextSignOut,
  User,
  Name,
  Main,
  Investments,
  Details,
  Hide,
  TextInvestments,
  ContentInvestiments,
  Label,
  Patrimony,
  Assets,
  Crypto,
  Stock,
  Funds,
  LabelAssets,
  TextAssets,
  Footer,
} from './style';

export default function Home() {
  const [visible, setVisible] = useState(true);
  const { signOut, name, token, last_name, role } = useContext(ContextApi);

  // console.log({
  //   name,
  //   token,
  //   last_name,
  //   role,
  // });

  const enableVision = () => {
    setVisible(event => !event);
  };

  return (
    <Container>
      <Content>
        <Header>
          <InfoUser>
            <AreaUser>
              <User>
                <Feather name="user" size={20} color="#000" />
              </User>
              <Name>Olá, {name}</Name>
            </AreaUser>
            <Exit>
              <SignOut onPress={signOut}>
                <TextSignOut>Sair</TextSignOut>
                <FontAwesome name="sign-out" size={20} color="#000" />
              </SignOut>
            </Exit>
          </InfoUser>
        </Header>
        <Main>
          <Investments
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <ContentInvestiments>
              <Details>
                <MaterialIcons name="swap-vert" size={20} color="#000" />
                <TextInvestments> Investimentos </TextInvestments>
                <Label> Patrimônio</Label>
                <Patrimony>R${visible ? '5.000,00' : ' ****'}</Patrimony>
              </Details>
              <Hide onPress={enableVision}>
                <Feather
                  name={visible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#000"
                />
              </Hide>
            </ContentInvestiments>
            <Assets>
              <Crypto>
                <LabelAssets>Criptomoedas</LabelAssets>
                <TextAssets>R${visible ? '2.000,00' : ' ****'}</TextAssets>
              </Crypto>
              <Stock>
                <LabelAssets>Ações</LabelAssets>
                <TextAssets>R${visible ? '1.000,00' : ' ****'}</TextAssets>
              </Stock>
              <Funds>
                <LabelAssets>FIIS</LabelAssets>
                <TextAssets>R${visible ? '2.000,00' : ' ****'}</TextAssets>
              </Funds>
            </Assets>
          </Investments>
        </Main>
        <Footer></Footer>
      </Content>
    </Container>
  );
}
