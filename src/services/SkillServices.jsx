import api from "./Api";



export const storeSkills = async (skillData) => {
    try {
        const response = await api.post('/skill', skillData);
        console.log(response.data.name);
    } catch (err) {
        console.error('Erro ao armazenar skill:', err);
    }
};

export const getAllSkills = async () => {
    try {
        const response = await api.get('/skill');
        return response.data.map((skill, index) => ({
            ...skill,
            id: skill.id || index, // Garante que cada skill tem um ID (ou usa o índice como fallback)
        }));
    } catch (err) {
        console.error('Erro ao obter skills:', err);
        return []; // Retorna um array vazio em caso de erro
    }
};

export const updateSkills = async (id, item) => {
    try {
        const response = await api.put(`/skill/${id}`, item);
        console.log('Skill atualizada:', response.data);
    } catch (err) {
        console.error('Erro ao atualizar skill:', err);
        throw err;
    }
};

// Método para deletar uma skill
export const deleteSkills = async (id) => {
    try {
        const response = await api.delete(`/skill/${id}`);
        console.log('Skill deletada:', response.data);
    } catch (err) {
        console.error('Erro ao deletar skill:', err);
    }
};
