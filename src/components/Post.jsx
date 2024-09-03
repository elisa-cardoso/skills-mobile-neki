import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllSkills } from '../services/SkillServices';
import PostItem from './PostItem';
import { useFocusEffect } from '@react-navigation/native';

const Posts = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Função para buscar as habilidades
  const fetchSkills = async () => {
    try {
      const skillsData = await getAllSkills();
      setSkills(skillsData);
    } catch (err) {
      setError('Failed to load skills.');
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

  const filteredSkills = skills.filter(skill =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Calcula o índice do primeiro e último post na página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredSkills.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reseta para a primeira página ao buscar
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSkills.length / postsPerPage);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Nossa biblioteca de <Text style={styles.highlight}>Skills</Text>
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar skills..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      {currentPosts.length > 0 ? (
        <>
          <FlatList
            data={currentPosts}
            renderItem={({ item }) => (
              <PostItem
                postID={item.id}
                title={item.title}
                thumbnail={item.image}
                description={item.description}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          {/* Controles de Paginação */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.disabled]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>{'<'}</Text>
            </TouchableOpacity>
            {Array.from({ length: totalPages }, (_, index) => (
              <TouchableOpacity
                key={index + 1}
                style={[styles.pageButton, currentPage === index + 1 && styles.active]}
                onPress={() => handlePageChange(index + 1)}
              >
                <Text style={styles.pageButtonText}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.noResults}>Nenhuma skill encontrada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  highlight: {
    color: '#59CE72',
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  searchBar: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d9534f',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#d3d3d3',
    borderRadius: 30,
    marginBottom: 30,
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  active: {
    backgroundColor: '#333333',
  },
  disabled: {
    backgroundColor: '#ddd',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginVertical: 20,
  },
});

export default Posts;
