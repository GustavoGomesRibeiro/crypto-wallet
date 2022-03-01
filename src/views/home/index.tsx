import React, { useState, useContext, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
} from 'react-native-vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../utils/navigationRoutes';

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
  ContentTitle,
  Title,
  ContentActions,
  Actions,
  AddTransaction,
  LabelTransaction,
  MyWallet,
  LabelWallet,
} from './style';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home() {
  const { signOut, name, theme } = useContext(ContextApi);
  const navigation = useNavigation<ReceiveScreen>();

  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const enableVision = () => {
    setVisible(event => !event);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Container>
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
              <FontAwesome
                name="sign-out"
                size={20}
                color={theme ? '#fff' : '#000'}
              />
            </SignOut>
          </Exit>
        </InfoUser>
      </Header>

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                <MaterialIcons
                  name="swap-vert"
                  size={20}
                  color={theme ? '#fff' : '#000'}
                />
                <TextInvestments>Investimentos </TextInvestments>
                <Label>Patrimônio</Label>
                <Patrimony>R${visible ? '5.000,00' : ' ****'}</Patrimony>
              </Details>
              <Hide onPress={enableVision}>
                <Feather
                  name={visible ? 'eye' : 'eye-off'}
                  size={20}
                  color={theme ? '#fff' : '#000'}
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
        <Footer>
          <ContentTitle>
            <Title> O que deseja fazer? </Title>
          </ContentTitle>
          <ContentActions>
            <Actions
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
              <AddTransaction
                onPress={() => navigation.navigate('Transaction')}
              >
                <MaterialIcons
                  name="library-add"
                  size={20}
                  color={theme ? '#fff' : '#000'}
                />
                <LabelTransaction>Adicionar transações</LabelTransaction>
                <Label>
                  Adicione transações, criptomoedas, ações e fundos
                  imobiliários.
                </Label>
              </AddTransaction>
            </Actions>
            <Actions
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
              <MyWallet onPress={() => navigation.navigate('CreateWallet')}>
                <Ionicons
                  name="wallet"
                  size={20}
                  color={theme ? '#fff' : '#000'}
                />
                <LabelWallet>Criar uma carteira</LabelWallet>
                <Label>
                  Crie e personalize sua carteira com seus investimentos
                </Label>
              </MyWallet>
            </Actions>
          </ContentActions>
        </Footer>
      </Content>
    </Container>
  );
}
