import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated } from 'react-native';

export const Success = styled(Animated.View)`
  padding: 15px;
  height: 100px;
  background: #54a634;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Error = styled(Animated.View)`
  padding: 15px;
  height: 100px;
  background: #fe0101;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Icon = styled(Ionicons)``;

export const Text = styled.Text`
  color: #fff;
  font-family: Poppins_400Regular;
`;
