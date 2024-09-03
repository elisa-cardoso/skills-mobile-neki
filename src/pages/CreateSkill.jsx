import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message'; // Importação atualizada
import { getAllSkills } from '../services/SkillServices';
import { associateSkillToUser } from '../services/UserSkillServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const CreateSkill = () => {
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [level, setLevel] = useState(0);
    const [userLogin, setUserLogin] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skillList = await getAllSkills();
                setSkills(skillList);
            } catch (err) {
                console.error('Erro ao carregar habilidades:', err);
            }
        };

        const getAuthenticatedUserLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        const login = decodedToken.sub || decodedToken.login;
                        setUserLogin(login);
                    } catch (err) {
                        console.error('Erro ao decodificar o token:', err);
                    }
                }
            } catch (error) {
                console.error('Erro ao obter o token:', error);
            }
        };

        fetchSkills();
        getAuthenticatedUserLogin();
    }, []);

    const handleSubmit = async () => {
        if (!selectedSkill) {
            showMessage({
                message: 'Selecione uma habilidade.',
                type: 'danger', // Tipo 'danger' para mensagens de erro
            });
            return;
        }

        if (level <= 0) {
            showMessage({
                message: 'Defina um nível válido.',
                type: 'danger',
            });
            return;
        }

        try {
            await associateSkillToUser(selectedSkill, userLogin, level);
            showMessage({
                message: 'Habilidade associada com sucesso!',
                type: 'success', // Tipo 'success' para mensagens de sucesso
            });
            setSelectedSkill('');
            setLevel(0);
            navigation.navigate('RouteTabPrivate');
        } catch (err) {
            showMessage({
                message: 'Erro ao associar habilidade.',
                type: 'danger',
            });
            setError('Erro ao associar habilidade.');
        }
    };

    const handleClose = () => {
        navigation.navigate('RouteTabPrivate');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Icon name="close" size={30} color="#333" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>
                    Aumente sua <Text style={styles.highlight}>Biblioteca</Text>
                </Text>
                <Text style={styles.subtitle}>
                    Classifique e colecione as habilidades que você domina! ٩(◕‿◕｡)۶
                </Text>
            </View>

            <Text style={styles.label}>Selecione sua nova skill:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedSkill}
                    onValueChange={(itemValue) => setSelectedSkill(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecionar..." value="" />
                    {skills.map((skill) => (
                        <Picker.Item key={skill.id} label={skill.title} value={skill.id} />
                    ))}
                </Picker>
            </View>

            <Text style={[styles.label, { marginTop: 20 }]}>O quanto você domina essa skill?</Text>
            <Rating
                ratingCount={5}
                imageSize={30}
                startingValue={level}
                onFinishRating={setLevel}
                style={styles.rating}
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Login do Usuário:</Text>
            <TextInput
                value={userLogin}
                editable={false}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Associar Skill</Text>
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}
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
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
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
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
    },
    pickerContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    rating: {
        alignItems: 'flex-start'
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
    errorText: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
    },
});

export default CreateSkill;
