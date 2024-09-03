import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PostItem = ({ postID, title, thumbnail, description }) => {
    const navigation = useNavigation();

    // Resuma a descrição se ela for muito longa
    const shortDescription = description.length > 140 ? description.substr(0, 140) + '...' : description;
    // Resuma o título se ele for muito longo
    const shortPostTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
            />
            <View style={styles.cardBody}>
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail/:id', { id: postID })}>
                    <Text style={styles.title}>{shortPostTitle}</Text>
                </TouchableOpacity>
                <Text style={styles.description}>{shortDescription}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#fff',
        width: width * 0.9, // Ajusta a largura conforme o tamanho da tela
    },
    thumbnail: {
        height: 150,
        width: '100%',
    },
    cardBody: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#333',
    },
});

export default PostItem;
