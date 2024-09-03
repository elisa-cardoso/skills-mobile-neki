import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import api from '../services/Api';

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!login || !password || !confirmPassword) {
            Toast.show({
              type: 'error',
              text1: 'Todos os campos são obrigatórios!',
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
              type: 'error',
              text1: 'As senhas não coincidem!',
            });
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', { login, password });
            Toast.show({
              type: 'success',
              text1: 'Registro realizado com sucesso!',
            });
            navigation.navigate('Login');
        } catch (err) {
            console.error(err);
            Toast.show({
              type: 'error',
              text1: 'Erro ao realizar o registro.',
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.header}>Cadastro</Text>
                <TextInput
                    placeholder="Login"
                    value={login}
                    onChangeText={setLogin}
                    style={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Digite sua senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
                        <Icon
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Confirme sua senha"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconButton}>
                        <Icon
                            name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Cadastre-se</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
                    <Text style={styles.linkText}>Já tem uma conta? Entre!</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" color="#007BFF" />}
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        fontSize: 34,
        textAlign: 'center',
        fontFamily: 'serif',
        fontWeight: 'bold',
        marginBottom: 60,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    passwordContainer: {
        position: 'relative',
        
    },
    iconButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    registerButton: {
        backgroundColor: '#59CE72',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
    },
    linkText: {
        color: '#59CE72',
        textAlign: 'center',
    },
});

export default Register;
