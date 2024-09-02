import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from "../auths/AuthContext";

const DetailReglementRistourne = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [idCredit, setIdCredit] = useState('');
  const [dateEcheance, setDateEcheance] = useState('');
  const [montantRistoune, setMontantRistoune] = useState('');
  const [refReglement, setRefReglement] = useState('');
  const [dateReglement, setDateReglement] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDetailReglementRistourne, setViewDetailReglementRistourne] = useState(null);

  const [selectedDetailReglementRistourne, setSelectedDetailReglementRistourne] = useState(null);
  const [detailReglementRistournes, setDetailReglementRistournes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { AuthenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    loadDetailReglementRistourne();
  }, []);

  
  const loadDetailReglementRistourne = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllDetailReglementRistourne');
      const formattedData = response.data.map(detailReglementRistourne => ({
        ...detailReglementRistourne,
        dateEcheance: new Date(detailReglementRistourne.dateEcheance).toISOString().split('T')[0], // Format ISO "yyyy-MM-dd"
        dateReglement: new Date(detailReglementRistourne.dateReglement).toISOString().split('T')[0] // Format ISO "yyyy-MM-dd"
      }));
      setDetailReglementRistournes(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    }
  };
  

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setIdCredit('');
    setDateEcheance('');
    setMontantRistoune('');
    setRefReglement('');
    setDateReglement('');
    setSelectedDetailReglementRistourne(null);
  };

  const openViewModal = () => setShowViewModal(true);

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewDetailReglementRistourne(null);
  };

  const handleViewClick = (detailReglementRistourne) => {
    setViewDetailReglementRistourne(detailReglementRistourne);
    openViewModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detailReglementRistourneDTO = {
      idCredit,
      dateEcheance, 
      montantRistoune,
      refReglement,
      dateReglement 
    };

    try {
      if (selectedDetailReglementRistourne) {
        await axios.put(`http://localhost:8084/annexes/updateDetailReglementRistourne/${selectedDetailReglementRistourne.id}`, detailReglementRistourneDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addDetailReglementRistourne', detailReglementRistourneDTO);
      }
      await loadDetailReglementRistourne();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de Detail Reglement Ristourne:', error);
      // Gérer l'erreur lors de la mise à jour ou de l'ajout ici
    }
  };

  const handleEditClick = (detailReglementRistourne) => {
    setSelectedDetailReglementRistourne(detailReglementRistourne);
    setIdCredit(detailReglementRistourne.idCredit);
    setDateEcheance(new Date(detailReglementRistourne.dateEcheance).toISOString().split('T')[0]);
    setMontantRistoune(detailReglementRistourne.montantRistoune); // Assurez-vous d'utiliser `montantRistoune` ici
    setRefReglement(detailReglementRistourne.refReglement);
    setDateReglement(new Date(detailReglementRistourne.dateReglement).toISOString().split('T')[0]);
    openModal();
  };
  
  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateDetailReglementRistourne`);
      }
      setDetailReglementRistournes(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('Détail Reglement Ristourne mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de Détail Reglement Ristourne :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateDReglementRistourneReport', {
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

  const filteredDetailReglementRistournes = Array.isArray(detailReglementRistournes)
  ? detailReglementRistournes.filter(detailReglementRistourne =>
      detailReglementRistourne.idCredit.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


   
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Détail Reglement Ristourne  </span>
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
> Ajouter un détail de règlement
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
                <th scope="col" className="px-3 py-2">   ID Crédit   </th>
                <th scope="col" className="px-3 py-2">  Date d’Échéance  </th>
                <th scope="col" className="px-3 py-2">  Montant Ristourne </th>
                <th scope="col" className="px-3 py-2">   Date de Règlement   </th>
                <th scope="col" className="px-3 py-2">  Référence de Règlement   </th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDetailReglementRistournes.map((detailReglementRistourne, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <td className="px-3 py-2">{detailReglementRistourne.idCredit}</td>
                  <td className="px-3 py-2">{new Date(detailReglementRistourne.dateEcheance).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{detailReglementRistourne.montantRistoune}</td>
                  <td className="px-3 py-2">{new Date(detailReglementRistourne.dateReglement).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{detailReglementRistourne.refReglement}</td>
                  <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={detailReglementRistourne.isActive}
                        onChange={() => handleSwitchChange(detailReglementRistourne.id, detailReglementRistourne.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${detailReglementRistourne.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${detailReglementRistourne.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{detailReglementRistourne.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>

                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(detailReglementRistourne)}
                      disabled={!detailReglementRistourne.isActive}
                      className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!detailReglementRistourne.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    >
                      <FaEdit />
                    </button>
        <button
    onClick={() => handleViewClick(detailReglementRistourne)}
    className="text-[#FF9119] hover:text-[#FF9119]/80 mx-2 ">
    <FaEye />
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
                <label htmlFor="idCredit" className="block mb-2 font-medium text-gray-700">
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
                     <label htmlFor="dateEcheance" className="block mb-2 font-medium text-gray-700">
                  Date d’Échéance
                </label>
                <input
                  type="date"
                  id="dateEcheance"
                  name="dateEcheance"
                  value={dateEcheance}
                  onChange={(e) => setDateEcheance(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="montantRistoune" className="block mb-2 font-medium text-gray-700">
                  Montant Ristourne
                </label>
                <input
                  type="number"
                  id="montantRistoune"
                  name="montantRistoune"
                  value={montantRistoune}
                  onChange={(e) => setMontantRistoune(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
              </div>
              </div>

                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                   <div className="mb-4">   
                   <label htmlFor="dateReglement" className="block mb-2 font-medium text-gray-700">
                  Date de Règlement
                </label>
                <input
                  type="date"
                  id="dateReglement"
                  name="dateReglement"
                  value={dateReglement}
                  onChange={(e) => setDateReglement(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="refReglement" className="block mb-2 font-medium text-gray-700">
                  Référence de Règlement
                </label>
                <input
                  type="text"
                  id="refReglement"
                  name="refReglement"
                  value={refReglement}
                  onChange={(e) => setRefReglement(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
              </div>
              </div>

              <hr className="my-4" />

            <div className="flex justify-end space-x-4 mt-4">
            <button type="button"
            onClick={closeModal}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"> 
              Annuler </button>
              <button type="submit"
               className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
               > 
              {selectedDetailReglementRistourne ? 'Enregistrer les modifications' : 'Ajouter'}
            </button>
            </div>
            </form>
          </div>
        </div>
      )}
  
  {showViewModal && viewDetailReglementRistourne && (
         <div
         className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
         onClick={handleBackgroundClick}
       >
         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             <div className="flex items-center mb-4">
               <div className="flex-grow text-center">
                 <h3 className="text-lg leading-6 font-medium text-gray-900">
                   Détails de Réglement Ristourne 
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
            <p className="w-36 font-semibold">ID Crédit:</p>
            <p className="flex-1">{viewDetailReglementRistourne.idCredit}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">Date Echéance :</p>
            <p className="flex-1">{viewDetailReglementRistourne.dateEcheance}</p>
          </div>
           <div className="flex">
            <p className="w-36 font-semibold">Numéro CIN:</p>
            <p className="flex-1">{viewDetailReglementRistourne.montantRistoune}</p>
          </div> 
          <div className="flex">
            <p className="w-36 font-semibold">Reférence Réglement :</p>
            <p className="flex-1">{viewDetailReglementRistourne.refReglement}</p>
          </div>
           <div className="flex">
            <p className="w-36 font-semibold">Date Réglement  :</p>
            <p className="flex-1 mb-5">{viewDetailReglementRistourne.dateReglement}</p>
          </div>
   </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default DetailReglementRistourne;
