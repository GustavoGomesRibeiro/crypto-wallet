import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';

import { ReceiveScreen } from '../../../../utils/navigationRoutes';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { ContextApi } from '../../../../hooks/authContext';
import {
  AlertToastError,
  AlertToastSuccess,
} from '../../../../components/Toast/index';
import MenuHeader from '../../../../components/MenuHeader/index';
import Input from '../../../../components/Input/index';
import InputMask from '../../../../components/InputMask/index';
import RNPickerSelect from '../../../../components/Picker/index';
import Button from '../../../../components/Button/index';
import api from '../../../../services/api';

import { CreateTransition } from '../../interfaces/index';
import {
  Container,
  Content,
  Main,
  InputContainer,
  PickerContainer,
  Label,
} from './style';

export default function Transaction() {
  const { token, theme } = useContext(ContextApi);
  const formRef = useRef<FormHandles>();

  const navigation = useNavigation<ReceiveScreen>();

  const [wallets, setWallets] = useState<CreateTransition[]>([]);
  const abbreviationInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const feesInputRef = useRef<TextInput>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/wallets', { headers: { Authorization: token } })
      .then(response => {
        setWallets(response.data);
      });
  }, []);

  const registerTransaction = useCallback(async (data: CreateTransition) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigat??rio'),
        abbreviation: Yup.string().required('Abrevia????o do ativo obrigat??ria'),
        quantity: Yup.number()
          .typeError('Quantidade ?? obrigat??ria')
          .min(0, 'Min value 1.')
          .max(30, 'Max value 30.')
          .required('Quantidade ?? obrigat??ria'),
        price: Yup.string().required('Pre??o ?? obrigat??rio'),
        fees: Yup.string().required('Taxa ?? obrigat??ria'),
        typeId: Yup.number().required('Tipo ?? obrigat??ria'),
        walletId: Yup.number().required('Carteira ?? obrigat??ria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, abbreviation, quantity, typeId, walletId, price, fees } =
        data;

      const dataProcessed = {
        name,
        abbreviation,
        quantity: parseFloat(quantity),
        price,
        fees,
        typeId,
        walletId,
      };

      await api.post('/cryptos', dataProcessed, {
        headers: { Authorization: token },
      });

      setSuccess(!success);
      setTimeout(() => {
        navigation.navigate('Wallet');
      }, 2000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
      setError('error');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, []);

  const pickerTypes = [
    { label: 'Criptmoedas', value: 1 },
    { label: 'A????es', value: 2 },
    { label: 'Fundos Imobili??rios', value: 3 },
  ];

  const pickerWallets = wallets.map(wallet => {
    return { label: wallet.name, value: wallet.id };
  });

  return (
    <Container>
      <MenuHeader title="Crie suas transa????es" theme={theme} />
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Main>
            <Form ref={formRef} onSubmit={registerTransaction}>
              <InputContainer>
                <Label>Ativo</Label>
                <Input
                  name="name"
                  placeholder="ex. T??tulo, Bitcoin "
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    abbreviationInputRef.current?.focus();
                  }}
                />
                <Label>Abrevia????o do ativo</Label>
                <Input
                  ref={abbreviationInputRef}
                  name="abbreviation"
                  placeholder="ex. ABCD11, btc"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    quantityInputRef.current?.focus();
                  }}
                />
                <Label>Quantidade</Label>
                <Input
                  ref={quantityInputRef}
                  name="quantity"
                  keyboardType="numeric"
                  placeholder="ex. 1234"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    priceInputRef.current?.focus();
                  }}
                />
                <Label>Pre??o</Label>
                <InputMask
                  ref={priceInputRef}
                  name="price"
                  keyboardType="numeric"
                  placeholder="ex. R$0.00"
                  returnKeyType="next"
                  type="money"
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                    suffixUnit: '',
                  }}
                  onSubmitEditing={() => {
                    feesInputRef.current?.focus();
                  }}
                />
                <Label>Taxas</Label>
                <InputMask
                  ref={feesInputRef}
                  name="fees"
                  placeholder="ex. R$0.00"
                  keyboardType="numeric"
                  returnKeyType="next"
                  type="money"
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                    suffixUnit: '',
                  }}
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </InputContainer>

              <PickerContainer>
                <Label>Investimentos</Label>
                <RNPickerSelect
                  placeholder={{
                    label: 'Selecione o tipo de investimento.',
                    value: null,
                    color: '#000',
                  }}
                  style={{
                    inputAndroid: {
                      backgroundColor: 'transparent',
                      color: '#000',
                    },
                    iconContainer: {
                      top: 5,
                      right: 15,
                    },
                  }}
                  name="typeId"
                  items={pickerTypes}
                />
              </PickerContainer>

              <PickerContainer>
                <Label>Carteiras</Label>
                <RNPickerSelect
                  placeholder={{
                    label: 'Selecione sua carteira',
                    value: null,
                    color: '#000',
                  }}
                  style={{
                    inputAndroid: {
                      backgroundColor: 'transparent',
                      color: '#000',
                    },
                    iconContainer: {
                      top: 5,
                      right: 15,
                    },
                  }}
                  name="walletId"
                  items={pickerWallets}
                />
              </PickerContainer>

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar transa????o
              </Button>

              {success ? (
                <AlertToastSuccess name="check" icon="check-circle-outline">
                  Transa????o cadastrada com sucesso!
                </AlertToastSuccess>
              ) : (
                <></>
              )}

              {error === 'error' ? (
                <AlertToastError name="error" icon="error">
                  Os campos n??o devem ser vazios.
                </AlertToastError>
              ) : (
                <></>
              )}
            </Form>
          </Main>
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
}
