import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Success, Error, Icon, Text } from './style';

const AlertToastSuccess = ({ children, name, icon }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <Success
      style={{
        marginTop: 50,
        opacity,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            }),
          },
        ],
      }}
    >
      <Icon name={icon} size={40} color="#fff" />
      <Text>{children}</Text>
    </Success>
  );
};

const AlertToastError = ({ children, name, icon }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Error
      style={{
        marginTop: 50,
        opacity,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            }),
          },
        ],
      }}
    >
      <Icon name={icon} size={40} color="#fff" />
      <Text>{children}</Text>
    </Error>
  );
};

export { AlertToastSuccess, AlertToastError };
