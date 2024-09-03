import React, { useContext } from 'react';
import { StackPublic } from './StackPublic';
import { StackPrivate } from './StackPrivate';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from '../context/SecurityContext';
import Toast from 'react-native-toast-message';

const Routes = () => {
  const { logged } = useContext(Context);

  return (
    <NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      {logged ? <StackPrivate /> : <StackPublic />}
    </NavigationContainer>
  );
};

export default Routes;
