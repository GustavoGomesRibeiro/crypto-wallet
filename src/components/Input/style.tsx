import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  margin-top: 8px;
  background: #232129;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity``;
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
  margin-left: 10px;
`;
