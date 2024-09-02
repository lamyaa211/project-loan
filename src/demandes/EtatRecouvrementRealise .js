import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'; 
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from "../auths/AuthContext";

const DetailRecouvrementRealise = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [idCredit, setIdCredit] = useState('');
  const [recouvrementRealise, setRecouvrementRealise] = useState('');
  const [montantFrais, setMontantFrais] = useState('');
  const [partTamwil, setPartTamwil] = useState('');
  const [dateRecouvrementBq, setDateRecouvrementBq] = useState('');
  const [dateVirementTamwil, setDateVirementTamwil] = useState('');
  const [refReglement, setRefReglement] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewEtatRecouvrementRealise, setViewEtatRecouvrementRealise] = useState(null);
  const [selectedEtatRecouvrementRealise, setSelectedEtatRecouvrementRealise] = useState(null);
  const [etatRecouvrementRealises, setEtatRecouvrementRealises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { AuthenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    loadRecouvrementRealise();
  }, []);

  const loadRecouvrementRealise = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllEtatRecouvrementRealise');
      const formattedData = response.data.map(etatRecouvrementRealise => ({
        ...etatRecouvrementRealise,
        dateRecouvrementBq: new Date(etatRecouvrementRealise.dateRecouvrementBq).toISOString().split('T')[0], 
        dateVirementTamwil: new Date(etatRecouvrementRealise.dateVirementTamwil).toISOString().split('T')[0] // Format ISO "yyyy-MM-dd"
      }));
      setEtatRecouvrementRealises(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
      // Gérer l'erreur de chargement des données ici
    }
  };

  const openViewModal = () => setShowViewModal(true);

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewEtatRecouvrementRealise(null);
  };

  const handleViewClick = (etatRecouvrementRealise) => {
    setViewEtatRecouvrementRealise(etatRecouvrementRealise);
    openViewModal();
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setIdCredit('');
    setRecouvrementRealise('');
    setMontantFrais('');
    setPartTamwil('');
    setDateRecouvrementBq('');
    setDateVirementTamwil('');
    setRefReglement('');
    setSelectedEtatRecouvrementRealise(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const etatRecouvrementRealiseDTO = {
      idCredit,
      recouvrementRealise,
      montantFrais, 
      partTamwil, 
      dateRecouvrementBq,
      dateVirementTamwil, 
      refReglement,
   
    };

    try {
      if (selectedEtatRecouvrementRealise) {
        await axios.put(`http://localhost:8084/annexes/updateEtatRecouvrementRealise/${selectedEtatRecouvrementRealise.id}`, etatRecouvrementRealiseDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addEtatRecouvrementRealise', etatRecouvrementRealiseDTO);
      }
      await loadRecouvrementRealise();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de Recouvrement Realise :', error);
    }
  };

  const handleEditClick = (etatRecouvrementRealise) => {
    setSelectedEtatRecouvrementRealise(etatRecouvrementRealise);
    setIdCredit(etatRecouvrementRealise.idCredit);
    setRecouvrementRealise(etatRecouvrementRealise.recouvrementRealise);
    setMontantFrais(etatRecouvrementRealise.montantFrais);
    setPartTamwil(etatRecouvrementRealise.partTamwil);
    setDateRecouvrementBq(new Date(etatRecouvrementRealise.dateRecouvrementBq).toISOString().split('T')[0]);
    setDateVirementTamwil(new Date(etatRecouvrementRealise.dateVirementTamwil).toISOString().split('T')[0]);
    setRefReglement(etatRecouvrementRealise.refReglement);

    openModal();
  };

   const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateEtatRecouvrementRealise`);
      }
      setEtatRecouvrementRealises(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('Etat Recouvrement Realise  mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de Etat Recouvrement Realise :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateEtatRecouvrementRealiseReport', {
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

  const filteredEtatRecouvrementRealise = etatRecouvrementRealises.filter(etatRecouvrementRealise =>
    etatRecouvrementRealise.idCredit.toLowerCase().includes(searchTerm.toLowerCase())
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Etat Recouvrement Realisé  </span>
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
> Ajouter un état recouvrement realisé 
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
                <th scope="col" className="px-3 py-2">ID Crédit</th>
                <th scope="col" className="px-3 py-2">Recouvrement Réalisé</th>
                <th scope="col" className="px-3 py-2">Montant Frais</th>
                <th scope="col" className="px-3 py-2">Part Tamwil</th>
                <th scope="col" className="px-3 py-2">Date Recouvrement BQ</th>
                <th scope="col" className="px-3 py-2">Date Virement Tamwil</th>
                <th scope="col" className="px-3 py-2">Réf Règlement</th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>
            <tbody>
  {filteredEtatRecouvrementRealise.map((etatRecouvrementRealise, index) => (
    <tr
      key={index}
      className={`border-b dark:border-gray-700 ${
        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
      }`}
    >
      <td className="px-3 py-2">{etatRecouvrementRealise.idCredit}</td>
      <td className="px-3 py-2">{etatRecouvrementRealise.recouvrementRealise}</td>
      <td className="px-3 py-2">{etatRecouvrementRealise.montantFrais}</td>
      <td className="px-3 py-2">{etatRecouvrementRealise.partTamwil}</td>
      <td className="px-3 py-2">{new Date(etatRecouvrementRealise.dateRecouvrementBq).toLocaleDateString()}</td>
      <td className="px-3 py-2">{new Date(etatRecouvrementRealise.dateVirementTamwil).toLocaleDateString()}</td>
      <td className="px-3 py-2">{etatRecouvrementRealise.refReglement}</td>
      <td className="px-3 py-2"> 
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={etatRecouvrementRealise.isActive}
            onChange={() => handleSwitchChange(etatRecouvrementRealise.id, etatRecouvrementRealise.isActive)}
            className="sr-only"
          />
          <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${etatRecouvrementRealise.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
            <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${etatRecouvrementRealise.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
          <span className="ml-2 text-gray-500 text-xs">{etatRecouvrementRealise.isActive ? 'Actif' : 'Inactif'}</span>
        </label>
      </td>
      <td className="px-3 py-2">
        <button
          onClick={() => handleEditClick(etatRecouvrementRealise)}
          disabled={!etatRecouvrementRealise.isActive}
          className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!etatRecouvrementRealise.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
        >
          <FaEdit />
        </button>
        <button
    onClick={() => handleViewClick(etatRecouvrementRealise)}
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
                <label htmlFor="idCredit" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  ID Crédit
                </label>
                <input
                  type="text"
                  id="idCredit"
                  name="idCredit"
                  value={idCredit}
                  onChange={(e) => setIdCredit(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="mb-4"> 
                <label htmlFor="recouvrementRealise" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Recouvrement Réalisé
                </label>
                <input
                  type="number"
                  id="recouvrementRealise"
                  name="recouvrementRealise"
                  value={recouvrementRealise}
                  onChange={(e) => setRecouvrementRealise(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="montantFrais" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Montant Frais
                </label>
                <input
                  type="number"
                  id="montantFrais"
                  name="montantFrais"
                  value={montantFrais}
                  onChange={(e) => setMontantFrais(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              </div>

              <div className="mb-4">
                <label htmlFor="partTamwil" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Part Tamwil
                </label>
                <input
                  type="number"
                  id="partTamwil"
                  name="partTamwil"
                  value={partTamwil}
                  onChange={(e) => setPartTamwil(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="mb-4">  
                   <label htmlFor="dateRecouvrementBq" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Date Recouvrement BQ
                </label>
                <input
                  type="date"
                  id="dateRecouvrementBq"
                  name="dateRecouvrementBq"
                  value={dateRecouvrementBq}
                  onChange={(e) => setDateRecouvrementBq(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateVirementTamwil" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Date Virement Tamwilcom
                </label>
                <input
                  type="date"
                  id="dateVirementTamwil"
                  name="dateVirementTamwil"
                  value={dateVirementTamwil}
                  onChange={(e) => setDateVirementTamwil(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
                />
              </div>
              </div>

              <div className="mb-4">
                <label htmlFor="refReglement" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Réf Règlement
                </label>
                <input
                  type="text"
                  id="refReglement"
                  name="refReglement"
                  value={refReglement}
                  onChange={(e) => setRefReglement(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                  required
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
> {selectedEtatRecouvrementRealise ? 'Modifier' : 'Ajouter'}
</button>
</div>
            </form>
          </div>
        </div>
      )}

{showViewModal && viewEtatRecouvrementRealise && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={handleBackgroundClick}
  >
    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-center mb-4">
          <div className="flex-grow text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Détails de l'Etat de Recouvrement Réalisé
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
            <p className="w-56 font-semibold">ID Crédit :</p>
            <p className="flex-1">{viewEtatRecouvrementRealise.idCredit}</p>
          </div>
          <div className="flex">
            <p className="w-56 font-semibold">Recouvrement Réalisé :</p>
            <p className="flex-1">{viewEtatRecouvrementRealise.recouvrementRealise}</p>
          </div>
          <div className="flex">
            <p className="w-56 font-semibold">Montant Frais :</p>
            <p className="flex-1">{viewEtatRecouvrementRealise.montantFrais}</p>
          </div>
          <div className="flex">
            <p className="w-56 font-semibold">Part Tamwil :</p>
            <p className="flex-1 mb-5">{viewEtatRecouvrementRealise.partTamwil}</p>
          </div>
          <div className="flex">
            <p className="w-56 font-semibold">Date de Recouvrement Bancaire:</p>
            <p className="flex-1 mb-5">{viewEtatRecouvrementRealise.dateRecouvrementBq}</p>
          </div>
           <div className="flex">
            <p className="w-56 font-semibold">Date de Virement Tamwilcom:</p>
            <p className="flex-1 mb-5">{viewEtatRecouvrementRealise.dateVirementTamwil}</p>
          </div>
           <div className="flex">
            <p className="w-56 font-semibold">Référence Reglement:</p>
            <p className="flex-1 mb-5">{viewEtatRecouvrementRealise.refReglement}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
   

    </div>
  );
};

export default DetailRecouvrementRealise;