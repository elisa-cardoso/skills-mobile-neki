import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message'; // Importação atualizada
import { getAllSkills, updateSkills } from '../services/SkillServices';

const EditPost = () => {
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();
    const [skill, setSkill] = useState({
        title: '',
        image: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const skillsData = await getAllSkills();
                const skill = skillsData.find(skill => skill.id === parseInt(id));
                setSkill(skill || {
                    title: '',
                    image: '',
                    description: ''
                });
            } catch (error) {
                console.error('Error fetching skill:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkill();
    }, [id]);

    const handleChange = (name, value) => {
        setSkill(prevSkill => ({ ...prevSkill, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!skill.title || !skill.image || !skill.description) {
            showMessage({
                message: 'Todos os campos são obrigatórios.',
                type: 'danger', // Tipo 'danger' para mensagens de erro
            });
            return;
        }

        try {
            await updateSkills(id, skill);
            showMessage({
                message: 'Skill atualizada com sucesso!',
                type: 'success', // Tipo 'success' para mensagens de sucesso
            });
            navigation.navigate('RouteTabPrivate');
        } catch (err) {
            console.error('Erro ao atualizar o post:', err);
            showMessage({
                message: 'Erro ao atualizar skill. Tente novamente.',
                type: 'danger',
            });
        }
    };

    const handleClose = () => {
        navigation.navigate('RouteTabPrivate');
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Icon name="close" size={30} color="#333" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.title}>Edite a <Text style={styles.highlight}>Skill</Text></Text>
                <Text style={styles.subtitle}>Ajude a manter a biblioteca sempre atualizada! (ﾉ◕ヮ◕)ﾉ</Text>
            </View>
            <View>
                <Text style={styles.label}>Título:</Text>
                <TextInput
                    value={skill.title}
                    onChangeText={(value) => handleChange('title', value)}
                    style={styles.input}
                />
                <Text style={styles.label}>URL da imagem:</Text>
                <TextInput
                    value={skill.image}
                    onChangeText={(value) => handleChange('image', value)}
                    style={styles.input}
                />
                <Text style={styles.label}>Descrição:</Text>
                <TextInput
                    value={skill.description}
                    onChangeText={(value) => handleChange('description', value)}
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Atualizar Skill</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flexGrow: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    highlight: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#59CE72',
    },
    subtitle: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        color: '#555',
    },
    
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 250,
        paddingTop: 15,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#59CE72',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditPost;
