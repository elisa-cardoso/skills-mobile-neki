import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllSkills } from '../services/SkillServices';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ícone de edição
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Ícone de fechamento

const PostDetail = () => {
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const skillsData = await getAllSkills();
                const skill = skillsData.find(skill => skill.id === parseInt(id));
                setSkill(skill);
            } catch (error) {
                console.error('Error fetching skill:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkill();
    }, [id]);

    const handleEdit = () => {
        navigation.navigate('EditPost/:id', { id }); // Redireciona para a página de edição com o ID
    };

    const handleClose = () => {
        navigation.navigate('RouteTabPrivate'); // Redireciona para a tela principal
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!skill) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Post não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={30} color="#000" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>{skill.title}</Text>
                <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                    <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {skill.image && (
                <Image
                    source={{ uri: skill.image }}
                    style={styles.image}
                />
            )}

            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{skill.description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        marginTop: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    editButton: {
        padding: 10,
        backgroundColor: '#59CE72',
        borderRadius: 300,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 20,
    },
    descriptionContainer: {
        marginTop: 10,
        marginBottom: 40,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default PostDetail;
