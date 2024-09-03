import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { getUserSkills, updateUserSkill, deleteUserSkill } from '../services/UserSkillServices';
import UserPostItem from '../components/UserPostItem';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const AuthorPost = ({ navigation }) => {
  const [userSkills, setUserSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      const skillsData = await getUserSkills();
      setUserSkills(skillsData);
      setFilteredSkills(skillsData);
    } catch (err) {
      setError('Failed to load user skills.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a lista ao focar na página
  useFocusEffect(
    useCallback(() => {
      fetchSkills();
    }, [])
  );

  useEffect(() => {
    setFilteredSkills(
      userSkills.filter((skill) =>
        skill.skillName.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    );
  }, [searchQuery, userSkills]);

  const handleRateChange = async (id, newLevel) => {
    try {
      await updateUserSkill(id, { level: newLevel });
      setUserSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === id ? { ...skill, level: newLevel } : skill
        )
      );
      showMessage({
        message: "Nível da skill atualizado com sucesso!",
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: "Erro ao atualizar nível da skill.",
        type: "danger",
      });
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir essa skill da sua biblioteca?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteUserSkill(id);
              setUserSkills((prevSkills) =>
                prevSkills.filter((skill) => skill.id !== id)
              );
              showMessage({
                message: "Skill deletada com sucesso!",
                type: "success",
              });
            } catch (err) {
              showMessage({
                message: "Erro ao deletar skill.",
                type: "danger",
              });
            }
          },
        },
      ]
    );
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Minha Biblioteca de <Text style={styles.headerBold}>Skills</Text>
        </Text>
        <View style={styles.addButtonContainer}>
          <Text style={styles.infoText}>Quais skills você domina? Dê uma nota!</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateSkill')}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Pesquisar habilidades..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
        <FlatList
          data={filteredSkills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                  alt={item.skillName}
                />
              )}
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.skillName}</Text>
                <Text style={styles.cardSubtitle}>{item.userLogin}</Text>
                <UserPostItem
                  skillId={item.skillId}
                  level={item.level}
                  userSkillId={item.id}
                  description={item.description}
                  onRate={handleRateChange}
                />
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.levelText}>Level: {item.level}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma skill encontrada</Text>}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: '#343a40',
    marginTop: 60
  },
  headerBold: {
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: '#59CE72'
  },
  addButtonContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 12,
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
  },
  addButton: {
    width: '85%',
    backgroundColor: '#59CE72',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  searchInput: {
    height: 48,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 30,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    backgroundColor: '#f1f3f5',
  },
  levelText: {
    fontSize: 14,
    color: '#495057',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: '#6c757d',
  },
});

export default AuthorPost;
