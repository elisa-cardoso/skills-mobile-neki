import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeSkills } from '../services/SkillServices';
import { showMessage } from 'react-native-flash-message'; // Importação atualizada
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importar ícone de fechar

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
    });
    const navigation = useNavigation();

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.image || !formData.description) {
            showMessage({
                message: 'Todos os campos são obrigatórios.',
                type: 'danger', // Tipo 'danger' para mensagens de erro
            });
            return;
        }

        try {
            await storeSkills(formData);
            showMessage({
                message: 'Skill criada com sucesso!',
                type: 'success', // Tipo 'success' para mensagens de sucesso
            });
            // Limpar o formulário após o sucesso
            setFormData({
                title: '',
                image: '',
                description: '',
            });
            navigation.navigate('Home');
        } catch (err) {
            console.error('Erro ao criar a skill:', err);
            showMessage({
                message: 'Erro ao criar skill. Tente novamente.',
                type: 'danger',
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Crie uma nova <Text style={styles.highlight}>Skill</Text>
                </Text>
                <Text style={styles.subtitle}>
                    Compartilhe seus conhecimentos e enriqueça a nossa comunidade! o( ❛ᴗ❛ )o
                </Text>
            </View>
            <TextInput
                placeholder="Título"
                value={formData.title}
                onChangeText={(value) => handleChange('title', value)}
                style={styles.input}
            />
            <TextInput
                placeholder="URL da imagem"
                value={formData.image}
                onChangeText={(value) => handleChange('image', value)}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={formData.description}
                onChangeText={(value) => handleChange('description', value)}
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Criar Skill</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#f8f9fa',
    },
    
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    highlight: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#59CE72',
    },
    subtitle: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#555',
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
        textAlignVertical: 'top',
        paddingTop: 15,
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

export default CreatePost;
