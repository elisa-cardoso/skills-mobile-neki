import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import api from '../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../context/SecurityContext';

const Login = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsLogged } = useContext(Context);

    useEffect(() => {
        const loadSavedCredentials = async () => {
            try {
                const savedLogin = await AsyncStorage.getItem('savedLogin');
                const savedPassword = await AsyncStorage.getItem('savedPassword');
                if (savedLogin && savedPassword) {
                    setLogin(savedLogin);
                    setPassword(savedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Failed to load saved credentials', error);
            }
        };

        loadSavedCredentials();
    }, []);

    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
        } catch (error) {
            console.error('Failed to clear token', error);
        }
    };

    const handleLogin = async () => {
        if (!login || !password) {
            Toast.show({
                type: 'error',
                text1: 'Todos os campos são obrigatórios!',
            });
            return;
        }

        setLoading(true);
        await clearToken(); // Limpa o token antes de realizar o login
        try {
            const response = await api.post('/auth/login', { login, password });
            const { token } = response.data;
            await AsyncStorage.setItem('jwtToken', token);

            if (rememberMe) {
                await AsyncStorage.setItem('savedLogin', login);
                await AsyncStorage.setItem('savedPassword', password);
            } else {
                await AsyncStorage.removeItem('savedLogin');
                await AsyncStorage.removeItem('savedPassword');
            }

            setIsLogged();

            Toast.show({
                type: 'success',
                text1: 'Login feito com sucesso!',
            });
            navigation.navigate('RouteTabPrivate');
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Credenciais inválidas. Tente novamente.',
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const registerRedirect = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.header}>Login</Text>
                <TextInput
                    placeholder="Login"
                    value={login}
                    onChangeText={setLogin}
                    style={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
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
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleRememberMeChange} style={styles.checkbox}>
                        <View style={[styles.checkboxBox, rememberMe && styles.checkboxChecked]} />
                        <Text style={styles.checkboxLabel}>Lembre-me</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerRedirect} style={styles.linkButton}>
                    <Text style={styles.linkText}>Não possui uma conta? Cadastre-se agora!</Text>
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
        flexDirection: 'row'
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
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    passwordContainer: {
        position: 'relative',
    },
    iconButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    checkboxContainer: {
        marginVertical: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#59CE72',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#59CE72',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
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

export default Login;
