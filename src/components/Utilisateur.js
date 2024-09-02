import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { addUtilisateur, getAllUtilisateurs, deleteUtilisateur } from '../services/UtilisateurService';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Utilisateur = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [naissance, setNaissance] = useState('');
  const [email, setEmail] = useState('');
  const [numerotel, setNumerotel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('UTILISATEUR');
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadUtilisateurs();
  }, []);

  const loadUtilisateurs = async () => {
    try {
      const data = await getAllUtilisateurs();
      setUtilisateurs(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const openModal = (userId = null) => {
    setEditUserId(userId);
    setShowModal(true);
    resetForm(userId);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = (userId = null) => {
    if (userId) {
      const user = utilisateurs.find(u => u.id === userId);
      if (user) {
        setUsername(user.username);
        setPrenom(user.prenom);
        setEmail(user.naissance);
        setEmail(user.email);
        setNumerotel(user.numerotel);
        setAdresse(user.adresse);
        setPassword('');  // On vide le mot de passe pour la sécurité
        setRole(user.role);
      }
    } else {
      setUsername('');
      setPrenom('');
      setNaissance('');
      setEmail('');
      setNumerotel('');
      setAdresse('');
      setPassword('');
      setRole('UTILISATEUR');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !prenom || !naissance || !email || !numerotel || !adresse || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const utilisateurDTO = {
      username,
      prenom,
      naissance,
      email,
      numerotel,
      adresse,
      password,
      role,
    };

    try {
      if (editUserId) {
        // Mise à jour de l'utilisateur
        await addUtilisateur({ ...utilisateurDTO, id: editUserId });
      } else {
        // Ajout d'un nouvel utilisateur
        await addUtilisateur(utilisateurDTO);
      }
      await loadUtilisateurs();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      setError('Erreur lors de l\'ajout de l\'utilisateur.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = utilisateurs.filter(utilisateur =>
    utilisateur && utilisateur.username && utilisateur.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigationBack = () => {
    navigate('/home');
  };

  const handleNumerotelChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, '');

    if (cleaned.length > 10) {
        setPhoneError('Le numéro de téléphone ne doit pas dépasser 10 chiffres.');
    } else if (cleaned.length < 10 && cleaned.length > 0) {
        setPhoneError('Le numéro de téléphone doit contenir exactement 10 chiffres.');
    } else {
        setPhoneError('');
    }

    setNumerotel(cleaned);
  };

  const handleDeleteUser = (userId) => {
    openDeleteConfirmationModal(userId);
  };

  const openDeleteConfirmationModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setUserToDelete(null);
    setShowDeleteConfirmationModal(false);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUtilisateur(userToDelete);
        await loadUtilisateurs();
        closeDeleteConfirmationModal();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      }
    }
  };


  const handleViewUser = (userId) => {
    navigate(`/moncompte/${userId}`);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <nav className="flex mt-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="ml-4 inline-flex items-center">
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <button
              onClick={handleNavigationBack}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FF9119] dark:text-gray-400 dark:hover:text-[#FF9119]"
            >
              Accueil
            </button>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gestion des Utilisateurs</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center mb-2">
          <div className="relative w-56">
            <input
              type="search"
              name="search"
              placeholder="Rechercher.."
              className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="6"></circle>
                <line x1="19" y1="19" x2="14.65" y2="14.65"></line>
              </svg>
            </div>
          </div>

          <button
            onClick={() => openModal()}
            className="text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
          >
            Ajouter un utilisateur
          </button>
        </div>

        <div className="overflow-y-auto max-h-80 mt-5 shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-2">Nom d'utilisateur</th>
                <th scope="col" className="px-3 py-2">Prénom</th>
                <th scope="col" className="px-3 py-2">Email</th>
                <th scope="col" className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
              {filteredUsers.map((utilisateur) => (
                <tr key={utilisateur.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-3 py-2">{utilisateur.username}</td>
                  <td className="px-3 py-2">{utilisateur.prenom}</td>
                  <td className="px-3 py-2">{utilisateur.email}</td>
                  <td className="px-3 py-2">{utilisateur.role}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                      <>
                        <button
                          onClick={() => handleViewUser(utilisateur.id)}
                          className="text-[#FF9119] hover:text-[#FF9119]/80 mx-2 ">
                          <FaEye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(utilisateur.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-xs p-1 rounded"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleBackgroundClick}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 absolute top-3 right-3"
                onClick={closeModal}
              >
                <AiOutlineClose size={16} />
              </button>
            
              <form onSubmit={handleSubmit}>
                {error && <div className="mb-4 text-red-600">{error}</div>}
               
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                      />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                      />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-4">  
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                    />
                </div>
                <div className="mb-4">  
                   <label htmlFor="naissance" className="block text-sm font-medium text-gray-700">Naissance</label>
                  <input
                    type="date"
                    id="naissance"
                    value={naissance}
                    onChange={(e) => setNaissance(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                    />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="mb-4">
                <label htmlFor="numerotel" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                <input
                  type="text"
                  id="numerotel"
                  value={numerotel}
                  onChange={handleNumerotelChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
                {phoneError && <div className="text-red-500 text-sm">{phoneError}</div>}
              </div>

                  <div className="mb-4">
                    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                      type="text"
                      id="adresse"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                      />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  >
                    <option value="UTILISATEUR">Utilisateur</option>
                    <option value="ADMIN_BO">Admin BO</option>
                    <option value="ADMIN_CENTRAL">Admin Central</option>
                    <option value="ADMIN_SI">Admin SI</option>
                    <option value="ADMIN_HAB">Admin HAB</option>
                  </select>
                </div>
                
                <hr className="my-4" />

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
                  > Annuler </button>
                  <button
                    type="submit"
                    className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
                  >
                    {editUserId ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


{showDeleteConfirmationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={handleBackgroundClick}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Confirmation de suppression</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeleteConfirmationModal}
                className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
                >
                Annuler
              </button>
              <button
                onClick={confirmDeleteUser}
                className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
                >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Utilisateur;