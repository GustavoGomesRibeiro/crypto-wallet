import React from 'react';
import { Container, Icon, TextInput } from './style';

const Input = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#fff" />
    <TextInput placeholderTextColor="#fff" {...rest} />
  </Container>
);

export default Input;
