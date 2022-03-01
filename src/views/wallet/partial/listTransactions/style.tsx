import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView``;
export const Text = styled.Text`
  color: ${props => props.theme.colors.color};
`;
