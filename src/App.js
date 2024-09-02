import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './auths/LoginPage';
import Entreprise from './components/Entreprise';
import Particulier from './components/Particulier';
import MonCompte from './components/MonCompte';
import Home from './components/Home';
import Annexe from './components/Annexe';
import Utilisateur from './components/Utilisateur';
import Demande from './components/Demande';
import DemandeParticulier from './components/DemandeParticulier';
import DemandeEntreprise from './components/DemandeEntreprise';
import ChangementDeDebiteur from './demandes/ChangementDeDebiteur';  
import DemandeGarantieFOG from './demandes/DemandeGarantieFOG';  
import DemandeMEJGarantie from './demandes/DemandeMEJGarantie';  
import EtatImpayes from './demandes/EtatImpayes';  
import EtatReglementPrime from './demandes/EtatReglementPrime'; 
import DetailReglementRistourne from './demandes/DetailReglementRistourne ';  
import EtatRecouvrementRealise from './demandes/EtatRecouvrementRealise ';  
import EtatAnnulationMEJ from './demandes/EtatAnnulationMEJ';  
import RestitutionMEJ from './demandes/RestitutionMEJ';  
import ReglementMEJ from './demandes/ReglementMEJ'; 
import { AuthProvider, AuthContext } from "./auths/AuthContext";
import ProtectedRoute from './auths/ProtectedRoute';
import NotificationPage from './components/NotificationPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); 

  // Determine if the navbar should be shown
  const shouldShowNavbar = user && location.pathname !== '/login';

  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-gray-100">
    {shouldShowNavbar && <Navbar />}
    <div className="main-content">
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
         <Route path="/entreprise"  element={   <ProtectedRoute> <Entreprise /> </ProtectedRoute> } />   
          <Route path="/particulier"  element={   <ProtectedRoute> <Particulier /> </ProtectedRoute> } />   
          <Route path="/moncompte" element={<ProtectedRoute><MonCompte /></ProtectedRoute>} />
            <Route path="/annexe" element={<ProtectedRoute><Annexe /></ProtectedRoute>} />
            <Route path="/utilisateur" element={<ProtectedRoute><Utilisateur /></ProtectedRoute>} />
            <Route path="/demande" element={<ProtectedRoute><Demande /></ProtectedRoute>} />
            <Route path="/demandeParticulier" element={<ProtectedRoute><DemandeParticulier /></ProtectedRoute>} />
            <Route path="/demandeEntreprise" element={<ProtectedRoute><DemandeEntreprise /></ProtectedRoute>} />
            <Route path="/changementDeDebiteur" element={<ProtectedRoute><ChangementDeDebiteur /></ProtectedRoute>} />
            <Route path="/demandeGarantieFOG" element={<ProtectedRoute><DemandeGarantieFOG /></ProtectedRoute>} />
            <Route path="/demandeMEJGarantie" element={<ProtectedRoute><DemandeMEJGarantie /></ProtectedRoute>} />
            <Route path="/etatImpayes" element={<ProtectedRoute><EtatImpayes /></ProtectedRoute>} />
            <Route path="/etatReglementPrime" element={<ProtectedRoute><EtatReglementPrime /></ProtectedRoute>} />
            <Route path="/detailReglementRistourne" element={<ProtectedRoute><DetailReglementRistourne /></ProtectedRoute>} />
            <Route path="/etatRecouvrementRealise" element={<ProtectedRoute><EtatRecouvrementRealise /></ProtectedRoute>} />
            <Route path="/etatAnnulationMEJ" element={<ProtectedRoute><EtatAnnulationMEJ /></ProtectedRoute>} />
            <Route path="/restitutionMEJ" element={<ProtectedRoute><RestitutionMEJ /></ProtectedRoute>} />
            <Route path="/reglementMEJ" element={<ProtectedRoute><ReglementMEJ /></ProtectedRoute>} />
     
            <Route path="/notificationPage" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />

        </Routes>
      </div>
      </div>

    </>
  );
};

export default App;
