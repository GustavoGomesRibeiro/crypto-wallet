import styled from 'styled-components/native';
import { GlobalStyle } from '../../styles/variables';

export const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text``;

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView``;

export const Main = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const WalletContent = styled.TouchableOpacity`
  width: 300px;
  border-radius: 10px;
  background: ${props => props.theme.colors.primary};
  padding: 20px;
  margin-bottom: 25px;
`;

export const Icons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Delete = styled.TouchableOpacity``;

export const Details = styled.View`
  margin-top: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: ${GlobalStyle.fonts.poppinsBold};
  color: ${props => props.theme.colors.color};
`;

export const Name = styled.Text`
  font-size: 14px;
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: ${GlobalStyle.fonts.poppinsRegular};
  color: ${props => props.theme.colors.color};
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
