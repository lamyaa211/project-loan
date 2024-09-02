import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084/users'; 

// Fonction pour récupérer tous les utilisateurs
export const getAllUtilisateurs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        throw error;
    }
};

// Fonction pour récupérer un utilisateur par ID
export const getUtilisateurById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/userById/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}:`, error);
        throw error;
    }
};

// Fonction pour récupérer un utilisateur par nom d'utilisateur
export const getUtilisateurByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/userByUsername/${username}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'utilisateur avec le nom d'utilisateur ${username}:`, error);
        throw error;
    }
};

// Fonction pour ajouter un nouvel utilisateur
export const addUtilisateur = async (utilisateurDTO) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addUser`, utilisateurDTO);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        throw error;
    }
};

// Fonction pour mettre à jour un utilisateur existant
export const updateUtilisateur = async (id, utilisateurDTO) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateUser/${id}`, utilisateurDTO);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id}:`, error);
        throw error;
    }
};

// Fonction pour supprimer un utilisateur par ID
export const deleteUtilisateur = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteUser/${id}`);
        return { message: "Utilisateur supprimé avec succès." };
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error);
        throw error;
    }
};
