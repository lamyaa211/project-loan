import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';

const DemandeParticulier = () => {
  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate('/demande'); 
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100">
      <Navbar />

      <nav className="flex mt-12" aria-label="Breadcrumb"> 
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="ml-4 inline-flex items-center">
            <button
              onClick={handleNavigationBack}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FF9119] dark:text-gray-400 dark:hover:text-[#FF9119]"
            >
              Demandes de Crédits 
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Demandes Pour Particulier </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="container mx-auto mt-16 p-4 text-center overflow-y-auto h-screen">
        <section className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 mt-20">
            {[
              { to: "/changementDeDebiteur", text: "Changement\nde Débiteur" },
              { to: "/demandeGarantieFOG", text: "Demande\nGarantie FOG" },
              { to: "/demandeMEJGarantie", text: "Demande\nMEJ Garantie" },
              { to: "/etatImpayes", text: "Etat\nImpayés" },
              { to: "/etatReglementPrime", text: "Etat Réglement\nPrime" }
            ].map(({ to, text }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center justify-center w-40 h-40 text-sm font-medium text-gray-700 bg-white transition duration-300 ease-in-out rounded-lg border border-gray-300 shadow-md hover:text-orange-500 hover:border-orange-500 hover:shadow-lg transform hover:scale-105 p-4"
              >
                {text.split('\n').map((line, index) => (
                  <span key={index} className="text-center">
                    {line}
                  </span>
                ))}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DemandeParticulier;
