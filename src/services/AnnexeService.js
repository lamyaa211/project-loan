import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084';

// Récupérer tous les annexes
export const getAllAnnexe = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllAnnexe`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des annexes :', error);
    throw error;
  }
};

// Ajouter une annexe
export const addAnnexe = async (annexeDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addAnnexe`, annexeDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'annexe :', error);
    throw error;
  }
};

// Mettre à jour une annexe
export const updateAnnexe = async (id, annexeDTO) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateAnnexe/${id}`, annexeDTO);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'annexe :', error);
    throw error;
  }
};
