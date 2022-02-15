import { Alert } from 'react-native';
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from 'expo-local-authentication';

const BiometricAuth = async () => {
  const compatible = await hasHardwareAsync();

  if (!compatible)
    throw Error(
      'Seu aparelho não é compativel com a autenticação via biometria',
    );

  const enrolled = await isEnrolledAsync();

  if (!enrolled)
    return Alert.alert('Ops!', 'Este dispositivo não possui biometria');

  const result = await authenticateAsync();
  if (!result.success)
    throw Error(`${result.error} - Authentication unsuccessful`);
};

export default BiometricAuth;
