import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Routes from './src/appRoutes';
import { SecurityContext } from './src/context/SecurityContext';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <SecurityContext>
      <View style={styles.container}>
        <Routes />
        <FlashMessage position="top" />
      </View>
    </SecurityContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 10
  },
});
