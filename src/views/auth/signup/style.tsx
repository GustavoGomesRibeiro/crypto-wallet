import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const Text = styled.Text``;

export const Main = styled.View`
  align-items: center;
  margin: 50px 0px;
`;

export const Label = styled.View`
  flex-direction: row;
  margin-top: 15px;
  width: 300px;
`;

export const RequiredField = styled.Text`
  font-family: Archivo_700Bold;
`;

export const LabelRequired = styled.View`
  flex-direction: row;
  width: 300px;
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

export const Icon = styled.TouchableOpacity`
  margin-bottom: 100px;
  margin-left: 45px;
`;
