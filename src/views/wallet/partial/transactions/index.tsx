import React, { useState, useEffect, useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReceiveScreen } from '../../../../utils/navigationRoutes';
import MenuHeader from '../../../../components/MenuHeader/index';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';
import api from '../../../../services/api';
import { ContextApi } from '../../../../hooks/authContext';
import { maskCurrency } from '../../../../utils/masks';

import {
  Container,
  Content,
  Main,
  InputContainer,
  PickerContainer,
  Label,
} from './style';

interface Wallets {
  name: string;
  abbreviation: string;
  quantity: number;
  price: string;
  fee?: string;
  typeId: number;
  walletId: number;
}

export default function Transaction() {
  const { token } = useContext(ContextApi);

  const navigation = useNavigation<ReceiveScreen>();

  const [wallets, setWallets] = useState<Wallets[]>([]);
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [fees, setFees] = useState('');
  const [walletId, setWalletId] = useState('');
  const [typeId, setTypeId] = useState('');

  useEffect(() => {
    api
      .get('/wallets', { headers: { Authorization: token } })
      .then(response => {
        setWallets(response.data);
      });
  }, []);

  const data = {
    name,
    abbreviation,
    quantity: parseFloat(quantity),
    price: price.replace(/\D/g, ''),
    fees: fees.replace(/\D/g, ''),
    typeId: parseInt(typeId),
    walletId,
  };

  const registerTransaction = async () => {
    if (!name || !abbreviation || !quantity || !price || !typeId || !walletId) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.post('/cryptos', data, {
          headers: { Authorization: token },
        });
        Alert.alert(
          'Transação criada',
          'Sua transação foi criado com sucesso!',
        );
        navigation.navigate('Wallet');
      } catch (error) {
        Alert.alert('Ops!', 'Verifique os campos preenchidos.');
      }
    }
  };

  function priceFormatted(text) {
    const value = maskCurrency(text);
    setPrice(`R$${value}`);
  }
  function feesFormatted(text) {
    const value = maskCurrency(text);
    setFees(`R$${value}`);
  }

  return (
    <Container>
      <MenuHeader title="Crie suas transações" />
      <Content>
        <Main>
          <InputContainer>
            <Label>Ativo</Label>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="ex. Título, Bitcoin "
            />
            <Label>Abreviação do ativo</Label>
            <Input
              value={abbreviation}
              onChangeText={setAbbreviation}
              placeholder="ex. ABCD11, btc"
            />
            <Label>Quantidade</Label>
            <Input
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="ex. 1234"
            />
            <Label>Preço</Label>
            <Input
              value={price}
              onChangeText={priceFormatted}
              keyboardType="numeric"
              placeholder="ex. R$0.00"
            />
            <Label>Taxas</Label>
            <Input
              value={fees}
              onChangeText={feesFormatted}
              placeholder="ex. R$0.00"
              keyboardType="numeric"
            />
          </InputContainer>

          <PickerContainer>
            <Label>Investimentos</Label>
            <Picker
              selectedValue={typeId}
              onValueChange={setTypeId}
              style={{ width: 300 }}
            >
              <Picker.Item label="Escolha o tipo de investimento" value="" />
              <Picker.Item label="Criptmoedas" value="1" />
              <Picker.Item label="Ações" value="2" />
              <Picker.Item label="Fundos Imobiliários" value="3" />
            </Picker>
          </PickerContainer>

          <PickerContainer>
            <Label>Carteiras</Label>
            <Picker
              selectedValue={walletId}
              onValueChange={setWalletId}
              style={{ width: 300 }}
            >
              {wallets.map(wallet => {
                return (
                  <Picker.Item
                    key={wallet.id}
                    label={wallet.name}
                    value={wallet.id}
                  />
                );
              })}
            </Picker>
          </PickerContainer>

          <Button onPress={registerTransaction}>Cadastrar transação</Button>
        </Main>
      </Content>
    </Container>
  );
}
