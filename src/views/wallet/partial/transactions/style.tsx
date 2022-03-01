import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView``;

export const Main = styled.View`
  justify-content: center;
  align-items: center;
  margin: 50px 0px;
`;

export const InputContainer = styled.View``;

export const PickerContainer = styled.View``;

export const Label = styled.Text`
  color: ${props => props.theme.colors.color};
  font-family: 'Poppins_700Bold';
  margin-top: 15px;
`;

export const Text = styled.Text``;
