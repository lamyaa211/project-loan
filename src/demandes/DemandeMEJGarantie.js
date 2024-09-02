
      import React, {useContext, useState, useEffect } from 'react';
      import Navbar from '../components/Navbar';
      import { useNavigate } from 'react-router-dom';
      import axios from 'axios';
      import { FaEdit, FaFileExport } from 'react-icons/fa';
      import { AiOutlineClose } from 'react-icons/ai';
      import { AuthContext } from "../auths/AuthContext";

      const DemandeMEJGarantie = () => {
        const [showModal, setShowModal] = useState(false);
        const [numCIN, setNumCIN] = useState('');
        const [numCredit, setNumCredit] = useState('');
        const [montant, setMontant] = useState('');
        const [dateEcheance, setDateEcheance] = useState('');
        const [datePremEchImpaye, setDatePremEchImpaye] = useState('');
        const [montantRestant, setMontantRestant] = useState('');
        const [montantReclame, setMontantReclame] = useState('');
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedDemandeMEJGarantie, setSelectedDemandeMEJGarantie] = useState(null);
        const [demandeMEJGaranties, setDemandeMEJGaranties] = useState([]);
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [loading, setLoading] = useState(false);
        const { AuthenticatedUser } = useContext(AuthContext);

        useEffect(() => {
          loadDemandeMEJGarantie();
        }, []);
            
        const loadDemandeMEJGarantie = async () => {
          try {
            const response = await axios.get('http://localhost:8084/annexes/getAllDemandeMEJGarantie');
            const formattedData = response.data.map((demandeMEJGarantie) => ({
              ...demandeMEJGarantie,
              dateEcheance: new Date(demandeMEJGarantie.dateEcheance).toLocaleDateString('fr-CA'),
              datePremEchImpaye: new Date(demandeMEJGarantie.datePremEchImpaye).toLocaleDateString('fr-CA'),
            }));
            setDemandeMEJGaranties(formattedData);
          } catch (error) {
            console.error('Erreur lors du chargement des demandes:', error);
          }
        };
      
        const openModal = () => setShowModal(true);
      
        const closeModal = () => {
          setShowModal(false);
          setNumCIN('');
          setNumCredit('');
          setMontant('');
          setDateEcheance('');
          setDatePremEchImpaye('');
          setMontantRestant('');
          setMontantReclame('');
          setSelectedDemandeMEJGarantie(null);
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          const demandeMEJGarantieDTO = {
            numCIN,
            numCredit,
            montant,
            dateEcheance: new Date(dateEcheance).getTime(),
            datePremEchImpaye: new Date(datePremEchImpaye).getTime(),
            montantRestant,
            montantReclame,
          };
      
          try {
            if (selectedDemandeMEJGarantie) {
              await axios.put(`http://localhost:8084/annexes/updateDemandeMEJGarantie/${selectedDemandeMEJGarantie.id}`, demandeMEJGarantieDTO);
            } else {
              await axios.post('http://localhost:8084/annexes/addDemandeMEJGarantie', demandeMEJGarantieDTO);
            }
            await loadDemandeMEJGarantie();
            closeModal();
          } catch (error) {
            console.error('Erreur lors de la mise à jour ou de l\'ajout de Demande MEJ Garantie :', error);
          }
        };
      
        const handleEditClick = (demandeMEJGarantie) => {
          setSelectedDemandeMEJGarantie(demandeMEJGarantie);
          setNumCIN(demandeMEJGarantie.numCIN);
          setNumCredit(demandeMEJGarantie.numCredit);
          setMontant(demandeMEJGarantie.montant);
          setDateEcheance(new Date(demandeMEJGarantie.dateEcheance).toISOString().split('T')[0]);
          setDatePremEchImpaye(new Date(demandeMEJGarantie.datePremEchImpaye).toISOString().split('T')[0]);
          setMontantRestant(demandeMEJGarantie.montantRestant);
          setMontantReclame(demandeMEJGarantie.montantReclame);
          openModal();
        };

        const handleSwitchChange = async (id, isActive) => {
          try {
            if (isActive) {
              await axios.put(`http://localhost:8084/annexes/${id}/deactivateDemandeMEJGarantie`);
            }
            setDemandeMEJGaranties(prevState => prevState.map(item => 
              item.id === id ? { ...item, isActive: !isActive } : item
            ));
            setSuccessMessage('Demande MEJ Garantie  mis à jour avec succès.');
          } catch (error) {
            console.error("Erreur lors de la mise à jour de Demande MEJ Garantie :", error);
            setError('Erreur lors de la mise à jour.');
          }
        };
      
        const handleRunJobClick = async () => {
          setLoading(true);
          setError('');
          setSuccessMessage('');
          try {
            const response = await axios.get('http://localhost:8084/batch/generateDemandeMEJGarantieReport', {
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
      
        const filteredDemandeMEJGaranties = demandeMEJGaranties.filter((demandeMEJGarantie) =>
          demandeMEJGarantie.numCIN.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
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
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Demande MEJ Garantie</span>
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
                 > Ajouter une demande de garantie MEJ  
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
                      <th className="px-3 py-2">Numéro CIN</th>
                      <th className="px-3 py-2">Numéro de Crédit</th>
                      <th className="px-3 py-2">Montant</th>
                      <th className="px-3 py-2">Date d'Échéance</th>
                      <th className="px-3 py-2">Date 1ère Échéance Impayée</th>
                      <th className="px-3 py-2">Montant Restant</th>
                      <th className="px-3 py-2">Montant Réclamé</th>
                      <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
                  </thead>
                  <tbody>
                    {filteredDemandeMEJGaranties.map((demandeMEJGarantie) => (
                      <tr key={demandeMEJGarantie.id} className="border-b hover:bg-gray-100">
                        <td className="px-3 py-2">{demandeMEJGarantie.numCIN}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.numCredit}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.montant}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.dateEcheance}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.datePremEchImpaye}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.montantRestant}</td>
                        <td className="px-3 py-2">{demandeMEJGarantie.montantReclame}</td>
                        <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={demandeMEJGarantie.isActive}
                        onChange={() => handleSwitchChange(demandeMEJGarantie.id, demandeMEJGarantie.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${demandeMEJGarantie.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${demandeMEJGarantie.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{demandeMEJGarantie.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>

                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(demandeMEJGarantie)}
                      disabled={!demandeMEJGarantie.isActive}
                      className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!demandeMEJGarantie.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
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
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="mb-4">      
                      <label className="block text-sm font-medium text-gray-700">Numéro CIN</label>
                        <input
                          type="text"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={numCIN}
                          onChange={(e) => setNumCIN(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4"> 
                      <label className="block text-sm font-medium text-gray-700">Numéro de Crédit</label>
                        <input
                          type="text"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={numCredit}
                          onChange={(e) => setNumCredit(e.target.value)}
                          required
                        />
                      </div>
                      </div>

                      <div className="mb-4"> 
                      <label className="block text-sm font-medium text-gray-700">Montant</label>
                        <input
                          type="number"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={montant}
                          onChange={(e) => setMontant(e.target.value)}
                          required
                        />
                      </div>

                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="mb-4"> 
                       <label className="block text-sm font-medium text-gray-700">Date d'Échéance</label>
                        <input
                          type="date"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={dateEcheance}
                          onChange={(e) => setDateEcheance(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4"> 
                      <label className="block text-sm font-medium text-gray-700">Date 1ère Échéance Impayée</label>
                        <input
                          type="date"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={datePremEchImpaye}
                          onChange={(e) => setDatePremEchImpaye(e.target.value)}
                          required
                        />
                      </div>
                      </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="mb-4"> 
                         <label className="block text-sm font-medium text-gray-700">Montant Restant</label>
                        <input
                          type="number"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={montantRestant}
                          onChange={(e) => setMontantRestant(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4"> 
                      <label className="block text-sm font-medium text-gray-700">Montant Réclamé</label>
                        <input
                          type="number"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF9119] focus:border-[#FF9119]"
                          value={montantReclame}
                          onChange={(e) => setMontantReclame(e.target.value)}
                          required
                        />
                      </div>
                      </div>

                     <hr className="my-4" />

<div className="flex justify-end space-x-4 mt-4">
<button type="button"
onClick={closeModal}
className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
> Annuler </button>
<button type="submit"
className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
> {selectedDemandeMEJGarantie ? 'Modifier' : 'Ajouter'}
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
      
      export default DemandeMEJGarantie;
      