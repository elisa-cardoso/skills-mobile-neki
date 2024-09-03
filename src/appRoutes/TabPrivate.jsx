import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthorPost from '../pages/AuthorPosts';
import CreatePost from '../pages/CreatePost';
import Home from '../pages/Home';

const Tab = createBottomTabNavigator();

export const TabPrivate = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Minha biblioteca') {
            iconName = focused ? 'book-variant-multiple' : 'book-variant-multiple';
          } else if (route.name === 'Adicionar skill') {
            iconName = focused ? 'plus-circle' : 'plus-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#59CE72', // Cor para o ícone ativo
        tabBarInactiveTintColor: '#333333',  // Cor para o ícone inativo
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Minha biblioteca" component={AuthorPost} options={{ headerShown: false }}/>
      <Tab.Screen name="Adicionar skill" component={CreatePost} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
