import React from 'react';
import { Container, ButtonText } from './style';

const Button = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
