import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { addAnnexe, getAllAnnexe } from '../services/AnnexeService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; 

const Annexe = () => {
  const [viewAnnexe, setViewAnnexe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [libelle, setLibelle] = useState('');
  const [codeBq, setCodeBq] = useState('');
  const [numeroAnnexe, setNumeroAnnexe] = useState('');
  const [selectedAnnexe, setSelectedAnnexe] = useState(null);
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [inputText, setInputText] = useState('');
  const [annexes, setAnnexes] = useState([]);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAnnexes = async () => {
      try {
        const response = await getAllAnnexe();
        setAnnexes(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des annexes:', error);
      }
    };
    
    fetchAnnexes();
  }, []);

  const openModal = () => setShowModal(true);

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewAnnexe(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAnnexe(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeViewModal();
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
      dropdownRef2.current && !dropdownRef2.current.contains(event.target)
    ) {
      setIsDropdown1Open(false);
      setIsDropdown2Open(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const annexeDTO = { libelle, codeBq, numeroAnnexe };

    try {
      if (selectedAnnexe) {
        // Logic to update an existing annexe using the selectedAnnexe's ID
        // Assume updateAnnexe is a service function similar to addAnnexe
        // await updateAnnexe(selectedAnnexe.id, annexeDTO);
        setAnnexes(annexes.map(annexe =>
          annexe.id === selectedAnnexe.id
            ? { ...annexe, ...annexeDTO }
            : annexe
        ));
      } else {
        // Adding a new annexe using the backend service
        const newAnnexe = await addAnnexe(annexeDTO);
        setAnnexes([...annexes, newAnnexe]); // Add the new annexe to the state
      }
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout de l\'annexe :', error);
    }
  };

  const toggleDropdown1 = () => {
    setIsDropdown1Open(!isDropdown1Open);
    setIsDropdown2Open(false);
  };

  const toggleDropdown2 = () => {
    setIsDropdown2Open(!isDropdown2Open);
    setIsDropdown1Open(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFilterClick = () => {
    // Implement the filter functionality if necessary
  };

  const handleViewClick = (annexe) => {
    setViewAnnexe(annexe);
    openViewModal();
  };

  const openViewModal = () => setShowViewModal(true);

  const filteredAnnexes = annexes.filter(annexe => {
    const numeroAnnexe = annexe.numeroAnnexe || '';
    return numeroAnnexe.toLowerCase().includes(inputText.toLowerCase());
  });

  const handleNavigationBack = () => {
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <nav className="flex mt-12" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="ml-4 inline-flex items-center">
            <svg
              className={`w-3 h-3 me-2.5 ${isHovered ? 'text-[#FF9119]' : 'text-gray-700 dark:text-gray-400'} transition-colors duration-150 ease-in-out`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <button
              onClick={handleNavigationBack}
              className={`inline-flex items-center text-sm font-medium ${isHovered ? 'text-[#FF9119]' : 'text-gray-700'} hover:text-[#FF9119] dark:hover:text-[#FF9119]`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
                  strokeWidth="2"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Annexes</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="p-4 sm:p-6">
        <div className="flex mb-4 gap-4">
          <div className="relative flex-1">
            <button
              id="dropdownButton1"
              className={`text-gray-800 hover:text-orange-500 px-4 py-2 bg-white focus:ring-1 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm inline-flex items-center w-full h-[40px] flex justify-center mt-10 ${isDropdown1Open ? ' shadow-md' : ''}`}
              onClick={toggleDropdown1}
            >
              Code Produit <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {isDropdown1Open && (
              <div ref={dropdownRef1} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-full absolute mt-2">
                <ul className="py-2 text-sm text-gray-700">
                 </ul>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <button
              id="dropdownButton2"
              className={`text-gray-800 hover:text-orange-500 px-4 py-2 bg-white focus:ring-1 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm inline-flex items-center w-full h-[40px] flex justify-center mt-10 ${isDropdown2Open ? ' shadow-md' : ''}`}
              onClick={toggleDropdown2}
            >
              Numéro Annexe <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {isDropdown2Open && (
              <div ref={dropdownRef2} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-full absolute mt-2">
                <ul className="py-2 text-sm text-gray-700">
                  </ul>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              id="textInput"
              name="textInput"
              placeholder="Code Banque"
              value={inputText}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500 h-[40px] text-center shadow-md mt-10"
            />
          </div>

          <button
            className="text-orange-500 hover:text-orange-400 bg-white rounded-lg inline-flex items-center px-3 py-2 shadow-md border border-transparent hover:border-orange-500 mb-10 mt-10"
            onClick={handleFilterClick}
          >
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.1em' }} />
          </button>
</div>
<div className="flex justify-end mb-10">
  <button
    onClick={openModal}
    className="text-white bg-[#FF8C00] hover:bg-[#FF9119] focus:outline-none focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-md border border-[#FF7F00] text-sm px-4 py-1.5 dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]/30 transition-transform transform hover:scale-105"
  >
    Ajouter un annexe
  </button>
</div>
       

          <div className="overflow-y-auto max-h-80 mt-5 shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="sticky top-0 border-b border-gray-200 bg-gray-50 dark:bg-gray-700">
                <th className="px-3 py-2">LIBELLÉ</th>
                  <th className="px-3 py-2">NUMÉRO ANNEXE</th>
                  <th className="px-3 py-2">CODE BANQUE</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
  {filteredAnnexes
    .filter((annexe) => annexe.libelle && annexe.numeroAnnexe && annexe.codeBq) 
    .map((annexe) => (
      <tr key={annexe.id} className="border-b border-gray-300">
        <td className="px-3 py-2">{annexe.libelle}</td>
        <td className="px-3 py-2">{annexe.numeroAnnexe}</td>
        <td className="px-3 py-2">{annexe.codeBq}</td>
        <td className="px-3 py-2">
          <button
            onClick={() => handleViewClick(annexe)}
            className="text-[#FF9119] hover:text-[#FF9119]/80 mx-2"  >
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
                <label htmlFor="libelle" className="block text-sm font-medium text-gray-700">LIBELLÉ </label>
                <input
                  type="text"
                  id="libelle"
                  name="libelle"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
              </div>

              <div className="mb-4 flex items-center">
                <div className="w-1/2 pr-2">
                  <label htmlFor="numeroAnnexe" className="block text-sm font-medium text-gray-700">NUMÉRO ANNEXE</label>
                  <input
                    type="text"
                    id="numeroAnnexe"
                    name="numeroAnnexe"
                    value={numeroAnnexe}
                    onChange={(e) => setNumeroAnnexe(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="codeBq" className="block text-sm font-medium text-gray-700">Code Banque</label>
                  <input
                    type="text"
                    id="codeBq"
                    name="codeBq"
                    value={codeBq}
                    onChange={(e) => setCodeBq(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
                  />
                </div>
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
                  {selectedAnnexe ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    

    {showViewModal && viewAnnexe && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={handleBackgroundClick}
  >
    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-center mb-4">
          <div className="flex-grow text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Détails de Annexe
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
            <p className="w-36 font-semibold">LIBELLÉ :</p>
            <p className="flex-1">{viewAnnexe.libelle}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">NUMÉRO ANNEXE :</p>
            <p className="flex-1">{viewAnnexe.numeroAnnexe}</p>
          </div>
          <div className="flex">
            <p className="w-36 font-semibold">CODE BANQUE:</p>
            <p className="flex-1">{viewAnnexe.codeBq}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Annexe;
