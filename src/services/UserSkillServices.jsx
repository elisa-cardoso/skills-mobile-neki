import api from "./Api";


export const associateSkillToUser = async (skillId, userLogin, level) => {
  try {
    console.log(level)
    // Montar o objeto com os dados corretos
    const requestData = {
      skillId: Number(skillId),  
      userLogin: String(userLogin),
      level: Number(level)
    };


    // Enviar a requisição POST
    const response = await api.post('/user_skills', requestData);
    
    console.log('Habilidade associada ao usuário:', response.data);
    return response.data;
  } catch (err) {
    console.error('Erro ao associar habilidade ao usuário:', err);
    throw err;
  }
};


// Função para obter todas as habilidades do usuário
export const getUserSkills = async () => {
  try {
    const response = await api.get('/user_skills');
    return response.data;
  } catch (err) {
    console.error('Erro ao obter habilidades do usuário:', err);
    return [];
  }
};

// Função para obter uma habilidade específica do usuário por ID
export const getUserSkillById = async (id) => {
  try {
    const response = await api.get(`/user_skills/${id}`);
    return response.data;
  } catch (err) {
    console.error('Erro ao obter habilidade por ID:', err);
    throw err;
  }
};

// Função para atualizar uma habilidade do usuário
export const updateUserSkill = async (id, updatedData) => {
  try {
    const response = await api.put(`/user_skills/${id}`, updatedData);
    return response.data;
  } catch (err) {
    console.error('Erro ao atualizar habilidade do usuário:', err);
    throw err;
  }
};

// Função para deletar uma habilidade do usuário
export const deleteUserSkill = async (id) => {
  try {
    const response = await api.delete(`/user_skills/${id}`);
    console.log('Habilidade deletada com sucesso:', response.data);
  } catch (err) {
    console.error('Erro ao deletar habilidade:', err);
    throw err;
  }
};
