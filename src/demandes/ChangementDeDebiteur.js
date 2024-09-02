import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from "../auths/AuthContext";
import  Navbar  from "../components/Navbar";

const ChangementDeDebiteur = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [numCredit, setNumCredit] = useState('');
  const [numCIN, setNumCIN] = useState('');
  const [debiteurInit, setDebiteurInit] = useState('');
  const [nouveauDebit, setNouveauDebit] = useState('');
  const [dateEffetTransfert, setDateEffetTransfert] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewChangementDebiteur, setViewChangementDebiteur] = useState(null);
  const [selectedChangementDebiteur, setSelectedChangementDebiteur] = useState(null);
  const [changementDebiteurs, setChangementDebiteurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { AuthenticatedUser } = useContext(AuthContext);


  useEffect(() => {
    loadChangementDeDebiteur();
  }, []);

  const loadChangementDeDebiteur = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllChangementDebiteur');
      const formattedData = response.data.map(changementDebiteur => ({
        ...changementDebiteur,
        dateEffetTransfert: new Date(changementDebiteur.dateEffetTransfert).toISOString().split('T')[0] // Format ISO "yyyy-MM-dd"
      }));
      setChangementDebiteurs(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
      // Gérer l'erreur de chargement des données ici
    }
  };

  const openViewModal = () => setShowViewModal(true);

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewChangementDebiteur(null);
  };

  const handleViewClick = (changementDebiteur) => {
    setViewChangementDebiteur(changementDebiteur);
    openViewModal();
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setNumCredit('');
    setNumCIN('');
    setDebiteurInit('');
    setNouveauDebit('');
    setDateEffetTransfert('');
    setSelectedChangementDebiteur(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changementDebiteurDTO = {
      numCredit,
      numCIN,
      debiteurInit, 
      nouveauDebit,
      dateEffetTransfert,
    };

    try {
      if (selectedChangementDebiteur) {
        await axios.put(`http://localhost:8084/annexes/updateChangementDebiteur/${selectedChangementDebiteur.id}`, changementDebiteurDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addChangementDebiteur', changementDebiteurDTO);
      }
      await loadChangementDeDebiteur();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de Changement Debiteur:', error);
      // Gérer l'erreur lors de la mise à jour ou de l'ajout ici
    }
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateChangementDebiteur`);
      }
      setChangementDebiteurs(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('Changement de débiteur mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de Changement de débiteur :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateChangementDebiteurReport', {
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

  const handleEditClick = (changementDebiteur) => {
    setSelectedChangementDebiteur(changementDebiteur);
    setNumCredit(changementDebiteur.numCredit);
    setNumCIN(changementDebiteur.numCIN);
    setDebiteurInit(changementDebiteur.debiteurInit);
    setNouveauDebit(changementDebiteur.nouveauDebit);
    setDateEffetTransfert(new Date(changementDebiteur.dateEffetTransfert).toISOString().split('T')[0]);
    openModal();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChangementDebiteurs = changementDebiteurs.filter(changementDebiteur =>
    changementDebiteur.numCIN.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const enumOptions = [
    { code: 1, label: 'Étudiant' },
    { code: 2, label: 'Tuteur' },
    { code: 3, label: 'Étudiant et Tuteur' },
  ];
   
  const navigate = useNavigate();

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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Changement De Débiteur  </span>
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
  onClick={() => openModal(false)}
  className=" text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
> Ajouter un changmeent débiteur   
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
              <th scope="col"   className="px-3 py-2">  Numéro de Crédit</th>
              <th scope="col" className="px-3 py-2">  Numéro CIN</th>
              <th scope="col"className="px-3 py-2"> Débiteur Initial</th>
              <th scope="col" className="px-3 py-2">  Nouveau Débiteur</th>
              <th scope="col" className="px-3 py-2">  Date Effet Transfert</th>
              <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>

            <tbody>
  {filteredChangementDebiteurs.map((changementDebiteur, index) => (
    <tr
      key={index}
      className={`border-b dark:border-gray-700 ${
        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
      }`}
    >
      <td className="px-3 py-2">{changementDebiteur.numCredit}</td>
      <td className="px-3 py-2">{changementDebiteur.numCIN}</td>
      <td className="px-3 py-2">{changementDebiteur.debiteurInit}</td>
      <td className="px-3 py-2">{changementDebiteur.nouveauDebit}</td>
      <td className="px-3 py-2">{new Date(changementDebiteur.dateEffetTransfert).toLocaleDateString()}</td>
      <td className="px-3 py-2"> 
      <label className="inline-flex items-center cursor-pointer">
      <input
            type="checkbox"
            checked={changementDebiteur.isActive}
            onChange={() => handleSwitchChange(changementDebiteur.id, changementDebiteur.isActive)}
            className="sr-only"
          />
          <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${changementDebiteur.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
            <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${changementDebiteur.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
          <span className="ml-2 text-gray-500 text-xs">{changementDebiteur.isActive ? 'Actif' : 'Inactif'}</span>
        </label>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <button
    onClick={() => handleEditClick(changementDebiteur)}
    disabled={!changementDebiteur.isActive}
    className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!changementDebiteur.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
  >
    <FaEdit />
  </button>
        <button
    onClick={() => handleViewClick(changementDebiteur)}
    className="text-[#FF9119] hover:text-[#FF9119]/80 mx-2 ">
    <FaEye />
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Numéro de Crédit:</label>
            <input
              type="text"
              value={numCredit}
              onChange={(e) => setNumCredit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Numéro CIN:</label>
            <input
              type="text"
              value={numCIN}
              onChange={(e) => setNumCIN(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
              />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="mb-4">
            <label htmlFor="debiteurInit" className="block text-sm font-medium text-gray-700">
              Débiteur Initial
            </label>
            <select
              id="debiteurInit"
              name="debiteurInit"
              value={debiteurInit}
              onChange={(e) => setDebiteurInit(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
              >
              <option value="">Sélectionner</option>
              {enumOptions.map(option => (
                <option key={option.code} value={option.code}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="nouveauDebit" className="block text-sm font-medium text-gray-700">
              Nouveau Débiteur
            </label>
            <select
              id="nouveauDebit"
              name="nouveauDebit"
              value={nouveauDebit}
              onChange={(e) => setNouveauDebit(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
              >
              <option value="">Sélectionner</option>
              {enumOptions.map(option => (
                <option key={option.code} value={option.code}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date Effet Transfert:</label>
          <input
            type="date"
            value={dateEffetTransfert}
            onChange={(e) => setDateEffetTransfert(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
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
          > {selectedChangementDebiteur ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        
      </form>
    </div>
  </div>
)}


{showViewModal && viewChangementDebiteur && (
         <div
         className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
         onClick={handleBackgroundClick}
       >
         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             <div className="flex items-center mb-4">
               <div className="flex-grow text-center">
                 <h3 className="text-lg leading-6 font-medium text-gray-900">
                   Détails Changement De Débiteur 
                 </h3>
                 </div>
          <button
            onClick={closeViewModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <AiOutlineClose className="h-4 w-4" />
          </button>
        </div>
        <hr className="my-4" />


        <div className="space-y-4">
          <div className="flex">
            <p className="w-36 font-semibold">Numéro Crédit:</p>
            <p className="flex-1">{viewChangementDebiteur.numCredit}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">Numéro CIN:</p>
            <p className="flex-1">{viewChangementDebiteur.numCIN}</p>
          </div>
           <div className="flex">
            <p className="w-36 font-semibold">Numéro CIN:</p>
            <p className="flex-1">{viewChangementDebiteur.debiteurInit}</p>
          </div> 
          <div className="flex">
            <p className="w-36 font-semibold">Nouveau Débiteur:</p>
            <p className="flex-1">{viewChangementDebiteur.nouveauDebit}</p>
          </div>
           <div className="flex">
            <p className="w-36 font-semibold">Date Effet Transfert:</p>
            <p className="flex-1 mb-5">{viewChangementDebiteur.dateEffetTransfert}</p>
          </div>
   </div>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default ChangementDeDebiteur;
