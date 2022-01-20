import React, { useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AntDesign, Feather } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header, Text, View } from './style';

export default function MenuHeader({ title, ...rest }) {
  const navigation = useNavigation();

  return (
    <Header>
      <BorderlessButton onPress={navigation.goBack}>
        <AntDesign name="arrowleft" size={20} color="#000" />
      </BorderlessButton>

      <Text> {title} </Text>
      <BorderlessButton>
        <Feather name="x" size={24} color="#fff" />
      </BorderlessButton>
    </Header>
  );
}
