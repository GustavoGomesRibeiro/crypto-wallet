import styled from 'styled-components/native';
import { GlobalStyle } from '../../styles/variables';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;
export const Content = styled.ScrollView``;

export const Header = styled.View`
  justify-content: center;
  height: 150px;
  background: ${props => props.theme.colors.menu};
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
  font-family: ${GlobalStyle.fonts.poppinsBold};
  color: ${props => props.theme.colors.color};
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
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
`;

export const Main = styled.View`
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const Investments = styled.TouchableOpacity`
  width: 300px;
  border-radius: 10px;
  background: ${props => props.theme.colors.primary};
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
  font-family: ${GlobalStyle.fonts.poppinsBold};
  margin-top: 15px;
  color: ${props => props.theme.colors.color};
`;

export const Label = styled.Text`
  font-size: 12px;
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
  margin-top: 20px;
`;

export const Patrimony = styled.Text`
  font-family: ${GlobalStyle.fonts.poppinsBold};
  color: ${props => props.theme.colors.color}
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
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: #797979;
  margin-top: 20px;
`;

export const TextAssets = styled.Text`
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
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
  font-family: ${GlobalStyle.fonts.poppinsBold};
  color: ${props => props.theme.colors.color};
  font-size: 16px;
`;

export const ContentActions = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Actions = styled.View`
  width: 300px;
  border-radius: 10px;
  background: ${props => props.theme.colors.primary};
  padding: 20px;
  margin-bottom: 25px;
`;

export const AddTransaction = styled.TouchableOpacity``;

export const LabelTransaction = styled.Text`
  font-size: 14px;
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
  margin-top: 15px;
`;

export const LabelWallet = styled.Text`
  font-size: 14px;
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
  margin-top: 15px;
`;

export const MyWallet = styled.TouchableOpacity``;
