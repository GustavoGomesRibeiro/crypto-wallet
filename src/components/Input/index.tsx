import React from 'react';
import { Container, Icon, Button, TextInput } from './style';

const Input = ({
  value,
  value_eye,
  onChangeText,
  onPress,
  name,
  icon,
  icon_eyes_open,
  icon_eyes_opened,
  icon_eyes_closed,
  ...rest
}) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#fff" />
      <TextInput
        placeholderTextColor="#fff"
        {...rest}
        value={value}
        onChangeText={onChangeText}
      />
      <Button onPress={onPress}>
        <Icon
          name={value_eye ? icon_eyes_opened : icon_eyes_closed}
          size={20}
          color="#fff"
        />
      </Button>
    </Container>
  );
};

export default Input;
