import styled from 'styled-components/native';

export const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View``;

export const Text = styled.Text``;

export const Main = styled.ScrollView`
  /* margin: 20px 0px; */
  margin-bottom: 150px;
`;

export const Filtered = styled.TouchableOpacity``;

export const Coins = styled.TouchableOpacity``;

export const ViewName = styled.View`
  width: 100px;
  flex-direction: row;
`;

export const Thumb = styled.Image`
  width: 20px;
  height: 20px;
`;

export const Label = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 25px;
  margin: 20px 0px;
`;

export const LabelCoin = styled.Text`
  font-family: Archivo_700Bold;
  font-size: 12px;
`;

export const LabelPrice = styled.Text`
  font-family: Archivo_700Bold;
  font-size: 12px;
  margin-left: 100px;
`;

export const LabelVariation = styled.Text`
  font-family: Archivo_700Bold;
  font-size: 12px;
`;

export const Details = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 25px;
  margin-bottom: 10px;
`;

export const NameCoin = styled.Text`
  font-family: Archivo_700Bold;
  margin-left: 10px;
`;

export const CurrentPrice = styled.Text`
  font-family: Archivo_700Bold;
  margin-left: 30px;
`;

export const Variation = styled.View`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background: #2ebc85;
`;
export const NegativeVariation = styled.View`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background: #f3465b;
`;

export const Number = styled.Text`
  font-family: Archivo_700Bold;
`;
