import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;
export const ScrollView = styled.ScrollView``;

export const Header = styled.View`
  padding: 0px 30px;
`;

export const Main = styled.View``;

export const Items = styled.View`
  margin-top: 10px;
  background: ${props => props.theme.colors.primary};
  padding: 0px 30px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: #ababaf;
  margin-top: 15px;
  padding: 0px 30px;
`;

export const Details = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* margin-top: 20px; */
`;

export const Button = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: ${props => props.theme.colors.color};
`;

export const Switch = styled.Switch``;
