import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { MaterialIcons } from 'react-native-vector-icons';
import { useField } from '@unform/core';
import { InputProps, InputRef, InputValueReference } from './interfaces/index';

import {
  Container,
  Icon,
  Button,
  TextInput,
  ContentRequired,
  Error,
} from './style';

const Input: React.ForwardRefRenderFunction<InputProps, InputRef> = (
  {
    containerStyle,
    // value,
    rawText,
    value_eye,
    onChangeText,
    onPress,
    name,
    icon,
    icon_eyes_open,
    icon_eyes_opened,
    icon_eyes_closed,
    ...rest
  },
  ref,
) => {
  const inputRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      getValue() {
        if (rawText) return rawText;
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
      // path: 'value',
    });
  }, [fieldName, rawText, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;

      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  return (
    <>
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}
      >
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />
        <TextInput
          color={isFocused || isFilled ? '#fff' : '#666360'}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholderTextColor={isFocused || isFilled ? '#ff9000' : '#666360'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          {...rest}
        />
        <Button onPress={onPress}>
          <Icon
            name={value_eye ? icon_eyes_opened : icon_eyes_closed}
            size={20}
            color={isFocused || isFilled ? '#ff9000' : '#666360'}
          />
        </Button>
      </Container>

      {error?.length ? (
        <ContentRequired>
          <Error>{error}</Error>
          <MaterialIcons name="error" size={20} color="#c42323" />
        </ContentRequired>
      ) : (
        <></>
      )}
    </>
  );
};

export default forwardRef(Input);
