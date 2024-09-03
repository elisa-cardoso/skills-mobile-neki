import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardHome from '../components/CardHome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Posts from '../components/Post';
import { Context } from '../context/SecurityContext';

const cardsData = [
  {
    icon: 'wechat',
    title: 'Compartilhe Conhecimento!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: 'CreatePost',
    buttonText: 'Crie uma skill',
  },
  {
    icon: 'bookshelf',
    title: 'Comece sua biblioteca!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: 'CreateSkill',
    buttonText: 'Associe-se com uma skill',
  }
];

const Home = ({ navigation }) => {
  const { setNotLogged } = useContext(Context);
  

  const handleLogout = () => {
    setNotLogged();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Função para lidar com a navegação ao pressionar o botão
  const handleCardButtonPress = (link) => {
    navigation.navigate(link);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bem-vindo!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#fff" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <CardHome cards={cardsData} onCardButtonPress={handleCardButtonPress} />
      </View>
      <Posts />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
    marginHorizontal: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 200,
  },
  
  cardContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});

export default Home;
