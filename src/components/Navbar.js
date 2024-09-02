import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../auths/AuthContext";
import { getNotificationCount, onNotificationReceived } from '../services/NotificationService'; // Assurez-vous d'importer les fonctions nécessaires

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // État pour le compteur de notifications
  const { AuthenticatedUser } = useContext(AuthContext);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsServicesOpen(false);
      setIsAccountOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fonction pour mettre à jour le compteur de notifications
    const updateNotificationCount = async () => {
      try {
        const count = await getNotificationCount();
        setNotificationCount(count);
      } catch (error) {
        console.error("Error fetching notification count", error);
      }
    };

    // Met à jour le compteur de notifications au chargement du composant
    updateNotificationCount();

    // Fonction pour gérer les nouvelles notifications
    const handleNewNotification = () => {
      updateNotificationCount();
    };

    // Écoute les nouvelles notifications
    const unsubscribe = onNotificationReceived(handleNewNotification);

    return () => {
      unsubscribe();
    };
  }, []);

  const userRole = AuthenticatedUser?.role;

  return (
    <nav className="bg-white h-18 mx-auto mt-3 p-3 rounded-full shadow-lg w-4/5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-black text-lg font-bold" style={{ fontFamily: 'Arial', color: '#2C0B07' }}>
            <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
          </div>
        </div>
        <ul className="flex space-x-8 text-center items-center">
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <a href="/">Accueil</a>
          </li>
          {(userRole === 'ADMIN_SI' || userRole === 'ADMIN_CENTRAL') && (
            <li className="relative text-black px-4 py-3 dropdown" style={{ fontFamily: 'Arial' }}>
              <button className="focus:outline-none hover:text-[#EF6011]" onClick={toggleServicesDropdown}>
                Nos services <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
              </button>
              {isServicesOpen && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-50" style={{ fontFamily: 'Arial', zIndex: 50 }}>
                  <li className="px-4 py-2 hover:bg-white-smoke">
                    <a href="/entreprise" className="hover:text-[#EF6011]">Entreprise</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-white-smoke">
                    <a href="/particulier" className="hover:text-[#EF6011]">Particulier</a>
                  </li>
                </ul>
              )}
            </li>
          )}
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <a href="/demande">Demandes de crédits</a>
          </li>
          <li className="text-black hover:text-[#EF6011] px-4 py-3" style={{ fontFamily: 'Arial' }}>
            <a href="/annexe">Annexe</a>
          </li>
          <li className="relative text-black px-4 py-3 dropdown" style={{ fontFamily: 'Arial' }}>
            <button className="focus:outline-none hover:text-[#EF6011]" onClick={toggleAccountDropdown}>
              {AuthenticatedUser ? `${AuthenticatedUser.username} (${AuthenticatedUser.role})` : "Loading..."}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {isAccountOpen && (
              <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-50" style={{ fontFamily: 'Arial', zIndex: 50 }}>
                <li className="px-3 py-2 hover:bg-white-smoke">
                  <a href="/moncompte" className="hover:text-[#EF6011]">Mon profil</a>
                </li>
                {AuthenticatedUser && AuthenticatedUser.role === "ADMIN_HAB" && (
                  <li className="px-3 py-1 hover:bg-white-smoke">
                    <a href="/utilisateur" className="hover:text-[#EF6011]">Gestion des utilisateurs</a>
                  </li>
                )}
              <li className="relative text-black px-4 py-3 dropdown" style={{ fontFamily: 'Arial' }}>
  <a href="/notificationPage" className="flex items-center relative">
    <FontAwesomeIcon icon={faBell} className="text-md" />
    {notificationCount > 0 && (
      <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 text-white text-xs font-semibold rounded-full">
        {notificationCount}
      </span>
    )}
    <span className="ml-2">Notifications</span>
  </a>
</li>

                <li className="px-3 py-2 hover:bg-white-smoke flex items-center">
                  <svg className="h-5 w-5 text-stone-900" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                  <a href="/login" className="text-black hover:text-[#EF6011] ml-2">Logout</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
