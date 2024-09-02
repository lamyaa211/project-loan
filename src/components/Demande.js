import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Demande = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigationBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100">
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
                    strokeWidth="1.5"
                    d="M1 9l4-4-4-4"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Demandes Des Crédits
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-center space-y-4 mt-32">
          <a
            href="/demandeParticulier"
            className="relative px-80 py-2 h-10 text-sm font-medium text-gray-700 bg-white transition duration-300 ease-in-out rounded-lg border border-gray-300 shadow-md hover:text-orange-500 hover:border-orange-500 hover:shadow-lg transform hover:scale-105"
          >
            Pour Particulier
          </a>
          <a
            href="/demandeEntreprise"
            className="relative px-80 py-2 h-10 text-sm font-medium text-gray-700 bg-white transition duration-300 ease-in-out rounded-lg border border-gray-300 shadow-md hover:text-orange-500 hover:border-orange-500 hover:shadow-lg transform hover:scale-105"
          >
            Pour Entreprise
          </a>
        </div>
      </div>
    </>
  );
};

export default Demande;
