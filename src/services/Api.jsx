import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração global do Axios para incluir o token JWT
const api = axios.create({
    baseURL: 'http://192.168.0.71:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Erro ao obter o token do AsyncStorage:', error);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Token expirado ou não autorizado
            // Redirecionar para a página de login ou mostrar uma mensagem de erro
            // Note: O redirecionamento pode ser feito através de um método específico do React Navigation se necessário
            console.error('Token expirado ou não autorizado. Redirecionando para o login...');
            navigation.navigate('Login');
        }
        return Promise.reject(error);
    }
);

export default api;
