import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: viewportWidth } = Dimensions.get('window');

const CardHome = ({ cards, onCardButtonPress }) => {
  // Renderiza um item do carrossel
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Icon name={item.icon} size={24} color="#333333" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.cardText}>{item.text}</Text>
        <TouchableOpacity
          onPress={() => onCardButtonPress(item.link)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  carousel: {
    alignItems: 'center', // Centraliza os itens dentro do carrossel
  },
  card: {
    width: viewportWidth * 0.85, // Largura dos cartões ajustada para o carrossel
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor do título
  },
  cardText: {
    fontSize: 14,
    color: '#666', // Cor do texto
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#59CE72', // Cor do botão
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20, // Bordas arredondadas do botão
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardHome;
