import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { addProduitParticulier, getAllProduitsParticulier, updateProduitParticulier } from '../services/ProduitService';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEdit, FaEye } from 'react-icons/fa'; 
import axios from 'axios';

const Particulier = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [codeProduit, setCodeProduit] = useState('');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [viewProduit, setViewProduit] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadProduits();
  }, []);

  const loadProduits = async () => {
    try {
      const data = await getAllProduitsParticulier();
      const formattedData = data.map(produit => ({
        ...produit,
        date: new Date(produit.date).toISOString().split('T')[0]
      }));
      setProduits(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setCodeProduit('');
    setNom('');
    setDescription('');
    setDate('');
    setSelectedProduit(null);
  };

  const openViewModal = () => setShowViewModal(true);

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewProduit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produitParticulierDTO = {
      codeProduit,
      nom,
      description,
      date: new Date(date).toISOString().split('T')[0]
    };

    try {
      if (selectedProduit) {
        await updateProduitParticulier(selectedProduit.id, produitParticulierDTO);
      } else {
        await addProduitParticulier(produitParticulierDTO);
      }
      await loadProduits();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout du produit particulier:', error);
    }
  };

  const handleEditClick = (produit) => {
    setSelectedProduit(produit);
    setCodeProduit(produit.codeProduit);
    setNom(produit.nom);
    setDescription(produit.description);
    setDate(new Date(produit.date).toISOString().split('T')[0]);
    openModal();
  };

  const handleViewClick = (produit) => {
    setViewProduit(produit);
    openViewModal();
  };

  const handleSwitchChange = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`http://localhost:8084/annexes/${id}/deactivateProduitParticulier`);
      }
      setProduits(prevState => prevState.map(item => 
        item.id === id ? { ...item, isActive: !isActive } : item
      ));
      setSuccessMessage('Changement de débiteur mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de Changement de débiteur :", error);
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProduits = produits.filter(produit =>
    produit.codeProduit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate('/home');
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeViewModal();
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Produits pour Particulier</span>
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
            onClick={openModal}
            className=" text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
            > Ajouter un produit  </button>
        </div>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {successMessage && <div className="mb-4 text-sm text-green-600">{successMessage}</div>}

        <div className="overflow-y-auto max-h-80 mt-5 shadow-md rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="sticky top-0 border-b border-gray-200 bg-gray-50 dark:bg-gray-700">
                <th scope="col" className="px-3 py-2">CODE PRODUIT</th>
                <th scope="col" className="px-3 py-2">NOM</th>
                <th scope="col" className="px-3 py-2">DATE</th>
                <th scope="col" className="px-3 py-2">DESCRIPTION</th>
                <th scope="col" className="px-3 py-2">Statuts</th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Actif</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduits.map((produit) => (
                <tr key={produit.id} className="border-b border-gray-300">
                <td className="px-3 py-2">{produit.codeProduit}</td>
                <td cclassName="px-3 py-2">{produit.nom}</td>
                <td className="px-3 py-2">{new Date(produit.date).toLocaleDateString()}</td>
            
              <td className="px-3 py-2">
<div className="truncate max-w-xs">
  <span className="tooltip cursor-pointer">
    {produit.description}
    <span className="tooltip-text bg-gray-700 text-white text-xs rounded-lg py-1 px-3 absolute z-10 hidden group-hover:block">
      {produit.description}
    </span>
  </span>
</div>
</td>
                    
                    <td className="px-3 py-2"> 
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={produit.isActive}
                        onChange={() => handleSwitchChange(produit.id, produit.isActive)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${produit.isActive ? 'bg-[#FF8C00]' : 'bg-gray-200'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full shadow-transform transition-transform ${produit.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="ml-2 text-gray-500 text-xs">{produit.isActive ? 'Actif' : 'Inactif'}</span>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <button
    onClick={() => handleEditClick(produit)}
    disabled={!produit.isActive}
    className={`text-[#FF9119] hover:text-[#FF9119]/80 ${!produit.isActive ? 'text-gray-400 cursor-not-allowed' : ''}`}
  >
    <FaEdit />
  </button>
  <button
    onClick={() => handleViewClick(produit)}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleBackgroundClick}>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
            <button type="button" className="text-gray-400 hover:text-gray-600 absolute top-3 right-3" onClick={closeModal}>
              <AiOutlineClose size={16} />
            </button>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-4">
                <label htmlFor="codeProduit" className="block text-sm font-medium text-gray-700">Code Produit</label>
                <input
                  type="text"
                  id="codeProduit"
                  name="codeProduit"
                  value={codeProduit}
                  onChange={(e) => setCodeProduit(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
              </div>

              <div className="mb-4 flex items-center">
                <div className="w-1/2 pr-2">
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date de création</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
              </div>
              <hr className="my-4" />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg border border-gray-500 text-sm px-5 py-1.5 text-center mb-2 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-300 transition duration-150"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#FF7F00] hover:bg-[#FF6B00] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50 font-medium rounded-lg border border-[#FF7F00] text-sm px-5 py-1.5 text-center mb-2 dark:bg-[#FF7F00] dark:hover:bg-[#FF6B00] dark:focus:ring-[#FF6B00]/30 transition duration-150"
                >
                  {selectedProduit ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
    
    {showViewModal && viewProduit && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={handleBackgroundClick}
  >
    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-center mb-4">
          <div className="flex-grow text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Détails du Produit
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
            <p className="w-36 font-semibold">Code Produit:</p>
            <p className="flex-1">{viewProduit.codeProduit}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">Nom:</p>
            <p className="flex-1">{viewProduit.nom}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">Description:</p>
            <p className="flex-1">{viewProduit.description}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">Date:</p>
            <p className="flex-1 mb-5">{viewProduit.date}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Particulier;