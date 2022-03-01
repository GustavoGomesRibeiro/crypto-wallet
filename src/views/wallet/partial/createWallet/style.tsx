import styled from 'styled-components/native';
import { GlobalStyle } from '../../../../styles/variables';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Main = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const Label = styled.View`
  margin-top: 15px;
  width: 300px;
`;

export const LabelWallet = styled.Text`
  color: ${props => props.theme.colors.color};
  font-family: ${GlobalStyle.fonts.poppinsBold};
  font-size: 14px;
`;

export const Register = styled.View`
  margin-top: 15px;
`;

export const Button = styled.Text``;

export const Text = styled.Text``;
