import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Main = styled.View`
  flex: 1
  justify-content: center;
  align-items: center;
`;

export const WalletContent = styled.TouchableOpacity`
  width: 300px;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  margin-bottom: 25px;
`;

export const Icons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Delete = styled.TouchableOpacity``;

export const Details = styled.View`
  margin-top: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: Poppins_700Bold;
  color: #000;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: #000;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: Poppins_400Regular;
  color: #000;
`;
