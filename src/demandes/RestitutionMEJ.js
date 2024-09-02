import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaFileExport } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from "../auths/AuthContext";

const RestitutionMEJ = () => {
  const [showModal, setShowModal] = useState(false);

  const [idCredit, setIdCredit] = useState('');
  const [montantRest, setMontantRest] = useState('');
  const [dateRestitution, setDateRestitution] = useState('');
  const [refRestitution, setRefRestitution] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestitutionMEJ, setSelectedRestitutionMEJ] = useState(null);
  const [restitutionMEJs, setRestitutionMEJs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { AuthenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    loadRestitutionMEJ();
  }, []);

  const loadRestitutionMEJ = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllRestitutionMEJ');
      const formattedData = response.data.map(restitutionMEJ => ({
        ...restitutionMEJ,
        dateRestitution: new Date(restitutionMEJ.dateRestitution).toISOString().split('T')[0] // Format ISO "yyyy-MM-dd"
      }));
      setRestitutionMEJs(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
      // Gérer l'erreur de chargement des données ici
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setIdCredit('');
    setMontantRest('');
    setDateRestitution('');
    setRefRestitution('');
    setSelectedRestitutionMEJ(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restitutionMejDTO = {
      idCredit,
     montantRest,
     dateRestitution,
     refRestitution,
    };

    try {
      if (selectedRestitutionMEJ) {
        await axios.put(`http://localhost:8084/annexes/updateRestitutionMEJ/${selectedRestitutionMEJ.id}`, restitutionMejDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addRestitutionMEJ', restitutionMejDTO);
      }
      await loadRestitutionMEJ();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de RestitutionMEJ  :', error);
    }
  };

  const handleEditClick = (restitutionMEJ) => {
    setSelectedRestitutionMEJ(restitutionMEJ);
    setIdCredit(restitutionMEJ.idCredit);
    setMontantRest(restitutionMEJ.montantRest);
    setDateRestitution(new Date(restitutionMEJ.dateRestitution).toISOString().split('T')[0]);
    setRefRestitution(restitutionMEJ.refRestitution);

    openModal();
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateRestitutionMEJ`);
      }
      setRestitutionMEJs(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage(' Réstitution MEJ mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la Réstitution MEJ   :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateRestitutionMEJReport', {
        responseType: 'text',
      });
      setSuccessMessage(response.data);
    } catch (error) {
      console.error('Erreur lors du lancement du job :', error);
      setError(`Erreur lors du lancement du job : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRestitutionMEJ = restitutionMEJs.filter(restitutionMEJ =>
    restitutionMEJ.idCredit.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate('/demandeEntreprise'); 
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100">
<Navbar/>
      <nav className="flex mt-12" aria-label="Breadcrumb"> 
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="ml-4 inline-flex items-center">
  <button
    onClick={() => navigate('/demande')} 
    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FF8C00] dark:text-gray-400 dark:hover:text-[#FF8C00]"
  >
    Demandes de Crédits
  </button>
       </li>
          <li className="inline-flex items-center">
            <button
              onClick={handleNavigationBack}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FF9119] dark:text-gray-400 dark:hover:text-[#FF9119]"
            >
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
              Demande Entreprise 
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400"> Restitution MEJ  </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center mb-2 space-x-4">
          <div className="relative w-56">
            <input
              type="search"
              name="search"
              placeholder="Rechercher par ID Crédit"
              className="block pl-9 pr-1 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
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

     <div className="flex items-center space-x-4">
     {AuthenticatedUser && AuthenticatedUser.role === "UTILISATEUR" &&

    <button
  onClick={() => openModal(false)}
  className=" text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
> Ajouter une réstitution MEJ </button> }
            <button
              onClick={handleRunJobClick}
              disabled={loading}
              className="flex items-center space-x-2 text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
            >
              <FaFileExport className="text-md" />
              <span>{loading ? 'Exécution en cours...' : 'Générer'}</span>
            </button>
          </div>
     </div>

     {error && (
          <div className="text-red-500 mb-4">
            <p>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">
            <p>{successMessage}</p>
          </div>
        )}

<div className="overflow-y-auto max-h-80 mt-5 shadow-md rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="sticky top-0 border-b border-gray-200 bg-gray-50 dark:bg-gray-700">
                <th scope="col" className="px-3 py-2">  ID Crédit  </th>
                <th scope="col" className="px-3 py-2"> Date de Restitution  </th>
                <th scope="col" className="px-3 py-2">  Montant Restitution  </th>
                <th scope="col" className="px-3 py-2"> Référence Restitution  </th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>

            <tbody>
                {filteredRestitutionMEJ.map((restitutionMEJ, index) => (
                  <tr
                    key={index}
                    className={`border-b dark:border-gray-700 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                    }`} >
                  <td className="px-6 py-4">{restitutionMEJ.idCredit}</td>
                  <td className="px-6 py-4">{restitutionMEJ.dateRestitution}</td>
                  <td className="px-6 py-4">{restitutionMEJ.montantRest}</td>
                  <td className="px-6 py-4">{restitutionMEJ.refRestitution}</td>
                  <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={restitutionMEJ.isActive}
                        onChange={() => handleSwitchChange(restitutionMEJ.id, restitutionMEJ.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${restitutionMEJ.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${restitutionMEJ.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{restitutionMEJ.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>

                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(restitutionMEJ)}
                      disabled={!restitutionMEJ.isActive}
                      className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!restitutionMEJ.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleBackgroundClick} >  
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
               <button
                 type="button"
                 className="text-gray-400 hover:text-gray-600 absolute top-3 right-3"
                 onClick={closeModal}
               >
                 <AiOutlineClose size={16} />
               </button> 

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="idCredit" className="block text-sm font-medium text-gray-700">
                    ID Crédit
                  </label>
                  <input
                    type="text"
                    id="idCredit"
                    name="idCredit"
                    value={idCredit}
                    onChange={(e) => setIdCredit(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                     <div className="mb-4"> 
                      <label htmlFor="montantRest" className="block text-sm font-medium text-gray-700">
                    Montant Restitution
                  </label>
                  <input
                    type="number"
                    name="montantRest"
                    value={montantRest}
                    onChange={(e) => setMontantRest(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dateRestitution" className="block text-sm font-medium text-gray-700">
                    Date de Restitution
                  </label>
                  <input
                    type="date"
                    id="dateRestitution"
                    name="dateRestitution"
                    value={dateRestitution}
                    onChange={(e) => setDateRestitution(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="refRestitution" className="block text-sm font-medium text-gray-700">
                    Référence Restitution
                  </label>
                  <input
                    type="text"
                    id="refRestitution"
                    name="refRestitution"
                    value={refRestitution}
                    onChange={(e) => setRefRestitution(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <hr className="my-4" />

            <div className="flex justify-end space-x-4 mt-4">
           <button type="button"
            onClick={closeModal}
             className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
             > Annuler </button>
          <button type="submit"
            className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
          > {selectedRestitutionMEJ ? 'Modifier' : 'Ajouter'}
          </button>
             </div>
 
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestitutionMEJ;