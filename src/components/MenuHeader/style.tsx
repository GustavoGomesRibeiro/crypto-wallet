import styled from 'styled-components/native';

export const Header = styled.View`
  padding: 24px;
  background: ${props => props.theme.colors.menu};
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.menu};
  padding-top: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 150px;
`;

export const Text = styled.Text`
  font-family: 'Poppins_700Bold';
  color: ${props => props.theme.colors.color};
  font-size: 20px;
`;
