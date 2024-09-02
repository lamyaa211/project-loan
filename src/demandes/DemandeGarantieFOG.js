import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaFileExport } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from "../auths/AuthContext";

const DemandeGarantieFOG = () => {
  const [showModal, setShowModal] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numCIN, setNumCIN] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [profession, setProfession] = useState('');
  const [numCreditBq, setNumCreditBq] = useState('');
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('');
  const [quotiteFinancement, setQuotiteFinancement] = useState('');
  const [objetCredit, setObjetCredit] = useState('');
  const [tauxInteret, setTauxInteret] = useState('');
  const [tauxInteretRetard, setTauxInteretRetard] = useState('');
  const [coutGlobal, setCoutGlobal] = useState('');
  const [prix, setPrix] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [codeVille, setCodeVille] = useState('');
  const [numTitreFoncier, setNumTitreFoncier] = useState('');
  const [fraisCapitale, setFraisCapitale] = useState('');
  const [typeLogement, setTypeLogement] = useState('');
  const [revenuMensuel, setRevenuMensuel] = useState('');
  const [marie, setMarie] = useState(false);
    const [revenuConjoint, setRevenuConjoint] = useState('');
  const [nbrPrsnCharge, setNbrPrsnCharge] = useState('');
  const [ancienneteBancaire, setAncienneteBancaire] = useState('');
  const [adresseLogmeent, setAdresseLogmeent] = useState('');
  const [vendeurLogemet, setVendeurLogemet] = useState('');
  const [differe, setDiffere] = useState('');
  const [aquisitionIndivision, setAquisitionIndivision] = useState('');
  const [typePrime, setTypePrime] = useState('');
  const [prixTerrain, setPrixTerrain] = useState('');
  const [natureTF, setNatureTF] = useState('');
  const [paysAccueil, setPaysAccueil] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemandeGarantieFOG, setSelectedDemandeGarantieFOG] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { AuthenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      const response = await axios.get('http://localhost:8084/annexes/getAllDemandeGarantieFOG');

      const formattedData = response.data.map((demande) => ({
        ...demande,
        dateNaissance: new Date(demande.dateNaissance).toISOString().split('T')[0] // Format ISO "yyyy-MM-dd"

      }));
      setDemandes(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de garantie FOG:', error);
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setNom('');
    setPrenom('');
    setNumCIN('');
    setSexe('');
    setDateNaissance('');
    setProfession('');
    setNumCreditBq('');
    setMontant('');
    setDuree('');
    setQuotiteFinancement('');
    setObjetCredit('');
    setTauxInteret('');
    setTauxInteretRetard('');
    setCoutGlobal('');
    setPrix('');
    setSuperficie('');
    setCodeVille('');
    setNumTitreFoncier('');
    setFraisCapitale('');
    setTypeLogement('');
    setRevenuMensuel('');
    setMarie(false); 
    setRevenuConjoint('');
    setNbrPrsnCharge('');
    setAncienneteBancaire('');
    setAdresseLogmeent('');
    setVendeurLogemet('');
    setDiffere('');
    setAquisitionIndivision('');
    setTypePrime('');
    setPrixTerrain('');
    setNatureTF('');
    setPaysAccueil('');
    setSelectedDemandeGarantieFOG(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demandeGarantieFOGDTO = {
      nom,
      prenom,
      numCIN,
      sexe, 
      dateNaissance,
      profession,
      numCreditBq,
      montant,
      duree,
      quotiteFinancement,
      objetCredit: parseInt(objetCredit, 10), 
      tauxInteret,
      tauxInteretRetard,
      coutGlobal,
      prix,
      superficie,
      codeVille,
      numTitreFoncier,
      fraisCapitale,
      typeLogement: parseInt(typeLogement, 10), 
      revenuMensuel, 
      marie,
      revenuConjoint,
      nbrPrsnCharge,
      ancienneteBancaire,
      adresseLogmeent,
      vendeurLogemet,
      differe,
      aquisitionIndivision, 
      typePrime: parseInt(typePrime, 10), 
      prixTerrain,
      natureTF, 
      paysAccueil,
    };
    

    try {
      if (selectedDemandeGarantieFOG) {
        await axios.put(`http://localhost:8084/annexes/updateDemandeGarantieFOG/${selectedDemandeGarantieFOG.id}`, demandeGarantieFOGDTO);
      } else {
        await axios.post('http://localhost:8084/annexes/addDemandeGarantieFOG', demandeGarantieFOGDTO);
      }
      await loadDemandes();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de la demande de garantie FOG', error);
    }
  };

  const handleEditClick = (demande) => {
    setSelectedDemandeGarantieFOG(demande);
    setNom(demande.nom);
    setPrenom(demande.prenom);
    setNumCIN(demande.numCIN);
    setSexe(demande.sexe);
    setDateNaissance(new Date(demande.dateNaissance).toISOString().split('T')[0]);
    setProfession(demande.profession);
    setNumCreditBq(demande.numCreditBq);
    setMontant(demande.montant);
    setDuree(demande.duree);
    setQuotiteFinancement(demande.quotiteFinancement);
    setObjetCredit(demande.objetCredit);
    setTauxInteret(demande.tauxInteret);
    setTauxInteretRetard(demande.tauxInteretRetard);
    setCoutGlobal(demande.coutGlobal);
    setPrix(demande.prix);
    setSuperficie(demande.superficie);
    setCodeVille(demande.codeVille);
    setNumTitreFoncier(demande.numTitreFoncier);
    setFraisCapitale(demande.fraisCapitale);
    setTypeLogement(demande.typeLogement);
    setRevenuMensuel(demande.revenuMensuel);
    setMarie(demande.marie);
    setRevenuConjoint(demande.revenuConjoint);
    setNbrPrsnCharge(demande.nbrPrsnCharge);
    setAncienneteBancaire(demande.ancienneteBancaire);
    setAdresseLogmeent(demande.adresseLogmeent);
    setVendeurLogemet(demande.vendeurLogemet);
    setDiffere(demande.differe);
   setAquisitionIndivision(demande.aquisitionIndivision);
    setTypePrime(demande.typePrime);
    setPrixTerrain(demande.prixTerrain);
    setNatureTF(demande.natureTF);
    setPaysAccueil(demande.paysAccueil);
    openModal();
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateDemandeGarantieFOG`);
      }
      setDemandes(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('Demande Garantie mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la demande de Garantie :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleRunJobClick = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.get('http://localhost:8084/batch/generateDemandeGarantieFOGReport', {
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

  const filteredDemandes = demandes.filter((demande) =>
    demande.numCIN.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const enumSexe = [
    { code: 'M', label: 'MASCULIN' },
  { code: 'F', label: 'FEMININ' },];

  const enumObjetCredit = [
   {code: 1, label: 'Achat immobilier'},
   {code: 2, label: 'Construction'},
   { code: 3, label: 'Rénovation'},];

  const enumTypeLogement = [
    {code: 0, label: 'LOCATAIRE'},
   {code: 1, label: 'BIDONVILLOI'},
  { code: 2, label: 'MRE'},
  { code: 3, label: 'BENEFICIAIRE_VSB_DESCENDANT'}, ];

const enumRevenuMensuel = [
 { code: 'O',label: 'MENAGE '},
 { code: 'N',label: 'INDIVIDUEL '},];

const enumTypePrime = [
   { code: 0, label: 'Flat linéaire ' },
   { code: 1, label: 'Périodique linéaire' },
   { code: 2, label: 'Périodique dégressive' },
   { code: 3, label: 'Flat dégressive' }];
 
const enumNatureTF = [
 {code: 'M', label: 'Mère'},
 {code: 'p', label: 'Parcellaire'},];

const enumAquisition = [
{code: 'O', label: 'Oui'},
 {code: 'N', label: 'Non'},];

const navigate = useNavigate();

const handleNavigationBack = () => {
  navigate('/demandeParticulier'); 
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
  > Demandes de Crédits
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
                viewBox="0 0 6 10"  >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Demande Garantie FOG  </span>
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
              > Ajouter une demande de garantie   
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
                <th scope="col" className="px-3 py-2">  NOM  </th>
                <th scope="col" className="px-3 py-2">  PRENOM    </th>
                <th scope="col" className="px-3 py-2">    NUMERO CIN   </th>
                <th scope="col" className="px-3 py-2"> DATE DE NAISSANCE    </th>
                <th scope="col"className="px-3 py-2">  NUMERO CREDIT Bancaire    </th>
                <th scope="col"className="px-3 py-2">  MONTANT    </th>
                <th scope="col"className="px-3 py-2">  OBJET CREDIT    </th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>

            
             <tbody>
              {filteredDemandes.map((demande, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                  }`}    >
                  <td  className="px-3 py-2">{demande.nom}</td>
                  <td className="px-3 py-2">{demande.prenom}</td>
                  <td className="px-3 py-2">{demande.numCIN}</td>
                  <td className="p-3">{new Date(demande.dateNaissance).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{demande.numCreditBq}</td>
                  <td className="px-3 py-2">{demande.montant}</td>
                  <td className="px-3 py-2">{demande.objetCredit}</td>
                  <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={demande.isActive}
                        onChange={() => handleSwitchChange(demande.id, demande.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${demande.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${demande.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{demande.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>
                 
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(demande)}
                      disabled={!demande.isActive}
                      className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!demande.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackgroundClick}>
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full overflow-y-auto max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 absolute top-3 right-3"
          onClick={closeModal}
        >
          <AiOutlineClose size={16} />
        </button> 
        <form onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                 < div className="mb-4">     
                   <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom 
                  </label>
                  <input
                    type="text"
                    id="nom"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                  Prénom 
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numCIN" className="block text-sm font-medium text-gray-700">
                  Numéro CIN 
                  </label>
                  <input
                    type="text"
                    id="numCIN"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={numCIN}
                    onChange={(e) => setNumCIN(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
                    Sexe 
                  </label>
                  <select
                  id="sexe"
                  name="sexe"
                  value={sexe || ''}
                  onChange={(e) => setSexe(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionner</option>
                  {enumSexe.map(option => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="mb-4">
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                  Date de Naissance  
                  </label>
                  <input
                    type="date"
                    id="dateNaissance"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                  Profession  
                  </label>
                  <input
                    type="text"
                    id="profession"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
          
              <div className="mb-4">
                  <label htmlFor="numCreditBq" className="block text-sm font-medium text-gray-700">
                  Numéro Crédit Bancaire  
                  </label>
                  <input
                    type="text"
                    id="numCreditBq"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={numCreditBq}
                    onChange={(e) => setNumCreditBq(e.target.value)}
                  />
                </div>
                </div>

                <hr className="my-4" />


                <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div className="mb-4">
                  <label htmlFor="montant" className="block text-sm font-medium text-gray-700">
                  Montant  
                  </label>
                  <input
                    type="number"
                    id="montant"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duree" className="block text-sm font-medium text-gray-700">
                  Durée  
                  </label>
                  <input
                    type="text"
                    id="duree"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="quotiteFinancement" className="block text-sm font-medium text-gray-700">
                  Quotité Financement  
                  </label>
                  <input
                    type="number"
                    id="quotiteFinancement"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={quotiteFinancement}
                    onChange={(e) => setQuotiteFinancement(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                   <label htmlFor="objetCredit" className="block text-sm font-medium text-gray-700">
                  Objet Crédit 
                  </label>
                  <select
                   id="objetCredit"
                   name="objetCredit"
                   value={objetCredit || ''}
                   onChange={(e) => setObjetCredit(e.target.value)}
                   required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 >
                   <option value="">Sélectionner</option>
                   {enumObjetCredit.map(option => (
                     <option key={option.code} value={option.code}>{option.label}</option>
                   ))}
                 </select>
                </div>
                </div>
              
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div className="mb-4">
                  <label htmlFor="tauxInteret" className="block text-sm font-medium text-gray-700">
                  Taux Interet   
                  </label>
                  <input
                    type="number"
                    id="tauxInteret"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={tauxInteret}
                    onChange={(e) => setTauxInteret(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tauxInteretRetard" className="block text-sm font-medium text-gray-700">
                  Taux Interet Retard   
                  </label>
                  <input
                    type="number"
                    id="tauxInteretRetard"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  
                    value={tauxInteretRetard}
                    onChange={(e) => setTauxInteretRetard(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="coutGlobal" className="block text-sm font-medium text-gray-700">
                   Cout Global    
                  </label>
                  <input
                    type="number"
                    id="coutGlobal"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={coutGlobal}
                    onChange={(e) => setCoutGlobal(e.target.value)}
                  />
                </div>

                <div className="mb-4"> 
                    <label htmlFor="prix" className="block text-sm font-medium text-gray-700">
                  Prix     
                  </label>
                  <input
                    type="number"
                    id="prix"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div className="mb-4">
                  <label htmlFor="superficie" className="block text-sm font-medium text-gray-700">
                  Superficie     
                  </label>
                  <input
                    type="text"
                    id="superficie"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="codeVille" className="block text-sm font-medium text-gray-700">
                  Code Ville     
                  </label>
                  <input
                    type="number"
                    id="codeVille"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={codeVille}
                    onChange={(e) => setCodeVille(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="numTitreFoncier" className="block text-sm font-medium text-gray-700">
                  Numéro Titre Foncier      
                  </label>
                  <input
                    type="text"
                    id="numTitreFoncier"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={numTitreFoncier}
                    onChange={(e) => setNumTitreFoncier(e.target.value)}
                  />
                </div>

              <div className="mb-4">
                  <label htmlFor="fraisCapitale" className="block text-sm font-medium text-gray-700">
                  Frais Capitale        
                  </label>
                  <input
                    type="number"
                    id="fraisCapitale"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={fraisCapitale}
                    onChange={(e) => setFraisCapitale(e.target.value)}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="typeLogement" className="block text-sm font-medium text-gray-700">
                  Type Logement  
                  </label>
                  <select
                   id="typeLogement"
                   name="typeLogement"
                   value={typeLogement || ''}
                   onChange={(e) => setTypeLogement(e.target.value)}
                   required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 >
                   <option value="">Sélectionner</option>
                   {enumTypeLogement.map(option => (
                     <option key={option.code} value={option.code}>{option.label}</option>
                   ))}
                 </select>
 
                </div>

                <div className="flex flex-col">
                  <label htmlFor="revenuMensuel" className="block text-sm font-medium text-gray-700">
                  Revenu Mensuel   
                  </label>
                  <select
                  id="revenuMensuel"
                  name="revenuMensuel"
                  value={revenuMensuel || ''}
                  onChange={(e) => setRevenuMensuel(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionner</option>
                  {enumRevenuMensuel.map(option => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                <div className="mb-4"> 
                  <label htmlFor="marie" className="block text-sm font-medium text-gray-700">
                Marié(e)
                </label>
                <input
                 type="checkbox"
                 id="marie"
                 className="mt-1"
                 checked={marie}
                 onChange={(e) => setMarie(e.target.checked)} />
                 </div>
                 </div>


                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                 <div className="mb-4"> 
                  <label htmlFor="revenuConjoint" className="block text-sm font-medium text-gray-700">
                  Revenu Conjoint   </label>
                  <input
                    type="number"
                    id="revenuConjoint"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={revenuConjoint}
                    onChange={(e) => setRevenuConjoint(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nbrPrsnCharge" className="block text-sm font-medium text-gray-700">
                  nombres Personnes Charge    </label>
                  <input
                    type="number"
                    id="nbrPrsnCharge"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={nbrPrsnCharge}
                    onChange={(e) => setNbrPrsnCharge(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="ancienneteBancaire" className="block text-sm font-medium text-gray-700">
                  Ancienneté Bancaire      </label>
                  <input
                    type="text"
                    id="ancienneteBancaire"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={ancienneteBancaire}
                    onChange={(e) => setAncienneteBancaire(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="adresseLogmeent" className="block text-sm font-medium text-gray-700">
                  Adresse Logement       </label>
                  <input
                    type="text"
                    id="adresseLogmeent"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={adresseLogmeent}
                    onChange={(e) => setAdresseLogmeent(e.target.value)}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div className="mb-4"> 
                 <label htmlFor="vendeurLogemet" className="block text-sm font-medium text-gray-700">
                  Vendeur Logemet    </label>
                  <input
                    type="text"
                    id="vendeurLogemet"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={vendeurLogemet}
                    onChange={(e) => setVendeurLogemet(e.target.value)}
                  />
                </div>
          
                <div className="mb-4">
                  <label htmlFor="differe" className="block text-sm font-medium text-gray-700">
                  Differe         </label>
                  <input
                    type="number"
                    id="differe"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={differe}
                    onChange={(e) => setDiffere(e.target.value)}
                  />
                </div>
             
             
             
                <div className="flex flex-col">
  <label htmlFor="aquisitionIndivision" className="block text-sm font-medium text-gray-700">
    Acquisition Indivision
  </label>
  <div className="mt-1 flex space-x-4">
    {enumAquisition.map((option) => (
      <label key={option.code} className="block text-sm font-medium text-gray-800">
        <input
          type="radio"
          name="aquisitionIndivision"
          value={option.code}
          checked={aquisitionIndivision === option.code}
          onChange={(e) => setAquisitionIndivision(e.target.value)}
          required
          className="form-radio text-blue-500"
        />
        <span className="ml-2">{option.label}</span>
      </label>
    ))}
  </div>
</div>
                <div className="mb-4">
                  <label htmlFor="prixTerrain" className="block text-sm font-medium text-gray-700">
                  Prix Terrain         </label>
                  <input
                    type="number"
                    id="prixTerrain"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={prixTerrain}
                    onChange={(e) => setPrixTerrain(e.target.value)}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                 <div className="flex flex-col">
                  <label htmlFor="typePrime" className="block text-sm font-medium text-gray-700">
                  Type Prime    
                  </label>
                  <select
                  id="typePrime"
                  name="typePrime"
                  value={typePrime || ""}
                  onChange={(e) => setTypePrime(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionner</option>
                  {enumTypePrime.map(option => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
                </div>

                <div className="mb-4">       
                    <label htmlFor="natureTF" className="block text-sm font-medium text-gray-700">
                  Nature TF     
                  </label>
                  <select
                   id="natureTF"
                   name="natureTF"
                   value={natureTF || ""}
                   onChange={(e) => setNatureTF(e.target.value)}
                   required
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 >
                   <option value="">Sélectionner</option>
                   {enumNatureTF.map(option => (
                     <option key={option.code} value={option.code}>{option.label}</option>
                   ))}
                 </select>
 
                </div>

                <div className="mb-4">
                  <label htmlFor="paysAccueil" className="block text-sm font-medium text-gray-700">
                  Pays Accueil    </label>
                  <input
                    type="text"
                    id="paysAccueil"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={paysAccueil}
                    onChange={(e) => setPaysAccueil(e.target.value)}
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
               > {selectedDemandeGarantieFOG ? 'Modifier' : 'Ajouter'}
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
export default DemandeGarantieFOG;