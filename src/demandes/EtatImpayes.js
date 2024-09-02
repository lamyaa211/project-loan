import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEdit, FaFileExport } from 'react-icons/fa';
import { AuthContext } from "../auths/AuthContext";

const EtatImpayes = () => {
  const [showModal, setShowModal] = useState(false);
  const [numCIN, setNumCIN] = useState('');
  const [numCredit, setNumCredit] = useState('');
  const [dateImpaye, setDateImpaye] = useState('');
  const [principalImpaye, setPrincipalImpaye] = useState('');
  const [etatImpayes, setEtatImpayes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEtatImpayes, setSelectedEtatImpayes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { AuthenticatedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    loadEtatImpayes();
  }, []);

  const loadEtatImpayes = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllEtatImpayes');
      const formattedData = response.data.map(etatImpaye => ({
        ...etatImpaye,
        dateImpaye: new Date(etatImpaye.dateImpaye).toISOString().split('T')[0]
      }));
      setEtatImpayes(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des EtatImpayes:', error);
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setNumCIN('');
    setNumCredit('');
    setDateImpaye('');
    setPrincipalImpaye('');
    setSelectedEtatImpayes(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const etatImpayesDTO = {
      numCIN,
      numCredit,
      dateImpaye: new Date(dateImpaye).toISOString().split('T')[0],
      principalImpaye,
    };

    try {
      if (selectedEtatImpayes) {
        await axios.put(`http://localhost:8084/annexes/updateEtatImpayes/${selectedEtatImpayes.id}`, etatImpayesDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addEtatImpayes', etatImpayesDTO);
      }
      await loadEtatImpayes();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout du EtatImpayes :', error);
      setError('Erreur lors de l\'ajout ou de la mise à jour.');
    }
  };

  const handleEditClick = (etatImpaye) => {
    if (!etatImpaye.isActive) return; // Ignore click if inactive
  
    setSelectedEtatImpayes(etatImpaye);
    setNumCIN(etatImpaye.numCIN);
    setNumCredit(etatImpaye.numCredit);
    setDateImpaye(new Date(etatImpaye.dateImpaye).toISOString().split('T')[0]);
    setPrincipalImpaye(etatImpaye.principalImpaye);
    openModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateEtatImpayes`);
      }
      setEtatImpayes(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('État d\'impayé mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état d'impayé :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateEtatImpayesReport', {
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

  const filteredEtatImpayes = etatImpayes.filter(item =>
    item.numCIN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigationBack = () => {
    navigate('/demandeParticulier');
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
              Demande Particulier
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">État des Impayés</span>
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
              placeholder="Rechercher par CIN"
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
              onClick={openModal}
              className="flex items-center text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
              >
              Ajouter un état impayé
            </button>
}
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
                <th scope="col" className="px-3 py-2">Num CIN</th>
                <th scope="col" className="px-3 py-2">Num Crédit</th>
                <th scope="col" className="px-3 py-2">Date Impayé</th>
                <th scope="col" className="px-3 py-2">Principal Impayé</th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEtatImpayes.map((etatImpaye) => (
                <tr key={etatImpaye.id} className={etatImpaye.isActive ? '' : 'bg-gray-100'}>
                  <td className="px-3 py-2">{etatImpaye.numCIN}</td>
                  <td className="px-3 py-2">{etatImpaye.numCredit}</td>
                  <td className="px-3 py-2">{etatImpaye.dateImpaye}</td>
                  <td className="px-3 py-2">{etatImpaye.principalImpaye}</td>
                  <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={etatImpaye.isActive}
                        onChange={() => handleSwitchChange(etatImpaye.id, etatImpaye.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${etatImpaye.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${etatImpaye.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{etatImpaye.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>

                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(etatImpaye)}
                      disabled={!etatImpaye.isActive}
                      className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!etatImpaye.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white rounded-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <button onClick={closeModal}>
                <AiOutlineClose className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <hr className="my-4" />

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-3">
                  <label htmlFor="numCIN" className="block text-sm font-medium text-gray-700">
                    Numéro CIN
                  </label>
                  <input
                    type="text"
                    id="numCIN"
                    value={numCIN}
                    onChange={(e) => setNumCIN(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numCredit" className="block text-sm font-medium text-gray-700">
                    Numéro de Crédit
                  </label>
                  <input
                    type="text"
                    id="numCredit"
                    value={numCredit}
                    onChange={(e) => setNumCredit(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="dateImpaye" className="block text-sm font-medium text-gray-700">
                  Date Impayé
                </label>
                <input
                  type="date"
                  id="dateImpaye"
                  value={dateImpaye}
                  onChange={(e) => setDateImpaye(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="principalImpaye" className="block text-sm font-medium text-gray-700">
                  Principal Impayé
                </label>
                <input
                  type="number"
                  id="principalImpaye"
                  value={principalImpaye}
                  onChange={(e) => setPrincipalImpaye(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <hr className="my-4" />

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
                >
                  {selectedEtatImpayes ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtatImpayes;
