import React from 'react';
import { Container, Icon, TextInput } from './style';

const Input = ({ value, onChangeText, name, icon, ...rest }) => {
  return (
    <Container
      style={
        !value ? { borderColor: 'red', borderWidth: 2, borderRadius: 10 } : {}
      }
    >
      <Icon name={icon} size={20} color="#fff" />
      <TextInput
        placeholderTextColor="#fff"
        {...rest}
        value={value}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Input;
