import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const UserPostItem = ({ skillId, userSkillId, title, level, description, onRate }) => {
  const navigation = useNavigation();

  const shortDescription = description.length > 140 ? description.substr(0, 140) + '...' : description;

  return (
    <View style={styles.post}>
      <TouchableOpacity onPress={() => navigation.navigate('PostsDetail/:id', { id: skillId })}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{shortDescription}</Text>
          <View style={styles.starRating}>
            <Rating
              imageSize={20}
              startingValue={level}
              onFinishRating={(newLevel) => onRate(userSkillId, newLevel)}
              style={styles.rating}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    borderBottomColor: '#ddd',
  
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
   
  },
  starRating: {
    alignItems: 'flex-start',
  },
  rating: {
    marginVertical: 10,
  },
});

export default UserPostItem;
