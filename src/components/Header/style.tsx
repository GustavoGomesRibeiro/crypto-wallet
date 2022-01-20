import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  height: 150px;
`;
export const ContentHeader = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 80px;
  padding: 0px 30px;
`;
export const ContainerInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.TouchableOpacity``;

export const Input = styled.TextInput`
  margin-right: 10px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  background: #eee7e7;
  padding-left: 5px;
`;

export const Signin = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  margin-right: 10px;
  font-family: Archivo_700Bold;
  font-size: 16px;
`;
