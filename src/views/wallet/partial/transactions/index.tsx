import React, { useState, useEffect, useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import MenuHeader from '../../../../components/MenuHeader/index';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';
import api from '../../../../services/api';
import { ContextApi } from '../../../../hooks/authContext';
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
  fee: string;
  typeId: number;
  walletId: number;
}

export default function Transaction() {
  const { token } = useContext(ContextApi);

  const [wallets, setWallets] = useState<Wallets[]>([]);
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [fees, setFees] = useState('');
  const [selectWallet, setSelectWallet] = useState('');
  const [types, setTypes] = useState('');

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
    quantity,
    price,
    fees,
    types,
    selectWallet,
  };

  const registerTransaction = async () => {
    if (
      !name ||
      !abbreviation ||
      !quantity ||
      !price ||
      !types ||
      !selectWallet
    ) {
      Alert.alert('Informações invalidas', 'Os campos não podem ficar vazios!');
    } else {
      try {
        const response = await api.post('/cryptos', data, {
          headers: { Authorization: token },
        });
      } catch (error) {
        Alert.alert('Ops!', 'Verifique os campos preenchidos.');
      }
    }
  };

  function maskCurrency(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    setPrice(value);
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
              onChangeText={maskCurrency}
              keyboardType="numeric"
              placeholder="ex. R$0.00"
            />
            <Label>Taxas</Label>
            <Input
              value={fees}
              onChangeText={setFees}
              placeholder="ex. R$0.00"
              keyboardType="numeric"
            />
          </InputContainer>

          <PickerContainer>
            <Label>Investimentos</Label>
            <Picker
              selectedValue={types}
              onValueChange={setTypes}
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
              selectedValue={selectWallet}
              onValueChange={setSelectWallet}
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
