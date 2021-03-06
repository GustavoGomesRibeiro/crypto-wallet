import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ContextApi } from '../hooks/authContext';
import AuthRouter from './auth.routes';
import BasicRouter from './basic.routes';
import PremiumRouter from './premium.routes';

const Router = () => {
  const { loading, role } = useContext(ContextApi);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return role === 'BASIC' ? (
    <BasicRouter />
  ) : role === 'PREMIUM' ? (
    <PremiumRouter />
  ) : (
    <AuthRouter />
  );
};

export default Router;
