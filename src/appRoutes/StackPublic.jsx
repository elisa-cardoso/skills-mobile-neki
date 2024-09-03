import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../pages/SplashScreen';
import Register from '../pages/Register';
import Login from '../pages/Login';

const { Navigator, Screen } = createStackNavigator();

export const StackPublic = () => (
  <Navigator>
    <Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    <Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Screen name="Register" component={Register} options={{ headerShown: false }} />
  </Navigator>
);
