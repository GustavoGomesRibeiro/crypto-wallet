import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.background};
`;
export const Content = styled.ScrollView``;

export const Header = styled.View`
  justify-content: center;
  height: 150px;
  background: #fff;
  padding: 25px;
`;

export const InfoUser = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AreaUser = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Exit = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignOut = styled.TouchableOpacity`
  flex-direction: row;
`;

export const TextSignOut = styled.Text`
  margin: 0 10px;
  font-family: Poppins_700Bold;
`;

export const User = styled.View`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #eee7e7;
`;

export const Name = styled.Text`
  margin-left: 10px;
  font-family: Poppins_400Regular;
  color: #000;
`;

export const Main = styled.View`
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const Investments = styled.TouchableOpacity`
  width: 300px;
  border-radius: 10px;
  background: #fff;
  /* background: ${props => props.theme.background}; */
  padding: 20px;
`;
export const ContentInvestiments = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Details = styled.View`
  margin-top: 10px;
`;
export const Hide = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const TextInvestments = styled.Text`
  font-size: 16px;
  font-family: Poppins_700Bold;
  color: #000;
  margin-top: 15px;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-family: Poppins_400Regular;
  color: #797979;
  margin-top: 20px;
`;

export const Patrimony = styled.Text`
  font-family: Poppins_700Bold;
  font-size: 16px;
`;

export const Assets = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Crypto = styled.View``;

export const Stock = styled.View``;

export const Funds = styled.View``;

export const LabelAssets = styled.Text`
  margin-right: 10px;
  font-size: 12px;
  font-family: Poppins_400Regular;
  color: #797979;
  margin-top: 20px;
`;

export const TextAssets = styled.Text`
  font-family: Poppins_400Regular;
  color: #000;
  font-size: 14px;
`;

export const Footer = styled.View``;

export const ContentTitle = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  width: 300px;
  border-radius: 10px;
  margin-bottom: 25px;
  font-family: Poppins_700Bold;
  font-size: 16px;
`;

export const ContentActions = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Actions = styled.View`
  width: 300px;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  margin-bottom: 25px;
`;

export const AddTransaction = styled.TouchableOpacity``;

export const LabelTransaction = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: #000;
  margin-top: 15px;
`;

export const LabelWallet = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: #000;
  margin-top: 15px;
`;

export const MyWallet = styled.TouchableOpacity``;
