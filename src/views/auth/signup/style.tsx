import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const Text = styled.Text``;

export const Main = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export const Label = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 50px;
  align-self: flex-start;
`;

export const LabelRequired = styled.View`
  flex-direction: row;
  margin-left: 50px;
  align-self: flex-start;
`;

export const ContentRequired = styled.View`
  /* margin-left: 10px; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RequiredText = styled.Text`
  color: #c42323;
  font-family: Archivo_400Regular;
  font-size: 14px;
  margin-right: 5px;
`;

export const RequiredField = styled.Text`
  font-family: Archivo_700Bold;
`;

export const Icon = styled.TouchableOpacity`
  margin-bottom: 100px;
  margin-left: 45px;
`;
