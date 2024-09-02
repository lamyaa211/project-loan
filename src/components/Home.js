import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { getProduitsEntrepriseDuMois, getProduitsParticulierDuMois } from '../services/ProduitService';
import Navbar from './Navbar';

const API_URLS = {
  etatImpayes: 'http://localhost:8084/annexes/getAllEtatImpayes',
  changementDeDebiteur: 'http://localhost:8084/annexes/getAllChangementDebiteur',
  demandeGarantieFOG: 'http://localhost:8084/annexes/getAllDemandeGarantieFOG',
  demandeMEJGarantie: 'http://localhost:8084/annexes/getAllDemandeMEJGarantie',
  etatReglementPrime: 'http://localhost:8084/annexes/getAllEtatReglementPrime',
  detailReglementRistourne: 'http://localhost:8084/annexes/getAllDetailReglementRistourne',
  etatRecouvrementRealise: 'http://localhost:8084/annexes/getAllEtatRecouvrementRealise',
  etatAnnulationMEJ: 'http://localhost:8084/annexes/getAllEtatAnnulationMej',
  restitutionMEJ: 'http://localhost:8084/annexes/getAllRestitutionMEJ',
  reglementMEJ: 'http://localhost:8084/annexes/getAllReglementMej',
  fileStatus: 'http://localhost:8084/api/file-status',
};

const Home = () => {
  const [dataByMonth, setDataByMonth] = useState([]);
  const [error, setError] = useState('');
  const [produitsDuMois, setProduitsDuMois] = useState([]);
  const [fileStatus, setFileStatus] = useState({ successfulFiles: 0, failedFiles: 0 });

  // Fonction pour regrouper les données par mois
  const groupByMonth = useCallback((data) => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const groupedData = months.reduce((acc, month) => {
      acc[month] = { mois: month, demandes: 0 };
      return acc;
    }, {});

    data.forEach(item => {
      const date = item.date ? new Date(item.date) : new Date();
      const month = date.toLocaleString('default', { month: 'long' });
      const monthInFrench = months.find(m => m.toLowerCase() === month.toLowerCase());
      if (monthInFrench) {
        groupedData[monthInFrench].demandes += 1;
      }
    });

    return Object.values(groupedData);
  }, []);

  // Fonction pour récupérer les données
  const fetchData = useCallback(async () => {
    try {
      const responses = await Promise.all(
        Object.values(API_URLS).slice(0, -1).map((url) => axios.get(url)) // Exclure l'endpoint fileStatus
      );
      return responses.flatMap((response) => response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }, []);

  // Fonction pour récupérer les produits
  const fetchProduits = useCallback(async () => {
    try {
      const produitsEntreprise = await getProduitsEntrepriseDuMois();
      const produitsParticulier = await getProduitsParticulierDuMois();
      const produits = [
        ...(Array.isArray(produitsEntreprise) ? produitsEntreprise : []),
        ...(Array.isArray(produitsParticulier) ? produitsParticulier : []),
      ];
      setProduitsDuMois(produits);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  }, []);

  // Fonction pour récupérer le statut des fichiers
  const fetchFileStatus = useCallback(async () => {
    try {
      const response = await axios.get(API_URLS.fileStatus);
      console.log('File Status Response:', response.data);  // Ajouter cette ligne pour vérifier les données
      if (response.data) {
        setFileStatus(response.data);
      } else {
        console.error('Réponse vide ou format inattendu pour le statut des fichiers');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du statut des fichiers:', error);
      setError('Erreur lors de la récupération du statut des fichiers.');
    }
  }, []); 

  const formatDate = (dateString) => {
    if (!dateString) return 'Date invalide';
    const cleanedDateString = dateString.split('T')[0];
    if (cleanedDateString) {
      const [year, month, day] = cleanedDateString.split('-');
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`; // Utilisez des backticks pour l'interpolation
    }
    return 'Date invalide';
  };
  
  

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchData();
        const groupedData = groupByMonth(data);
        setDataByMonth(groupedData);
      } catch (err) {
        setError('Erreur lors de la récupération des données.');
      }
    };

    fetchAndSetData();
    fetchProduits();
    fetchFileStatus();

    const intervalId = setInterval(() => {
      fetchAndSetData();
      fetchProduits();
      fetchFileStatus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchData, groupByMonth, fetchProduits, fetchFileStatus]);

  const totalFiles = fileStatus.successfulFiles + fileStatus.failedFiles;
  const percentageFailed = totalFiles === 0 ? 0 : (fileStatus.failedFiles / totalFiles) * 100;
  const percentageSuccessful = totalFiles === 0 ? 0 : (fileStatus.successfulFiles / totalFiles) * 100;

  const COLORS = ['#FF7F50', '#2E8B57'];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
    <>
      <div className="max-w-6xl mx-auto p-4">
        {error && (
          <div className="bg-red-200 text-red-700 p-4 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-center py-2">Taux des demandes de crédits par Mois en 2024</h2>
          <div className="p-4">
            <BarChart
              width={1100}
              height={200}
              data={dataByMonth}
              margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demandes" barSize={40} fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        <div className="flex gap-6">
        <div className="w-1/2 bg-white shadow-md rounded-lg flex">
    <div className="flex flex-col justify-center items-start p-4">
      <h2 className="text-lg font-semibold mb-4">Pourcentage des Annexes rejetés/envoyés avec succès</h2>
      <ul>
        {[
          { name: 'Annexes rejetés', value: percentageFailed.toFixed(2) + '%' },
          { name: 'Annexes envoyés', value: percentageSuccessful.toFixed(2) + '%' },
        ].map((entry, index) => (
          <li key={`item-${index}`} className="mb-2">
            <span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            {entry.name}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex justify-center items-center h-56">
      <PieChart width={250} height={250}>
        <Pie
          data={[
            { name: 'Fichiers rejetés', value: fileStatus.failedFiles },
            { name: 'Fichiers envoyés', value: fileStatus.successfulFiles },
          ]}
          cx={125}
          cy={125}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          paddingAngle={5}
          dataKey="value"
        >
          {[
            { name: 'Fichiers rejetés', value: fileStatus.failedFiles },
            { name: 'Fichiers envoyés', value: fileStatus.successfulFiles },
          ].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  </div>
          <div className="w-1/2 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-center py-2">Produits ajoutés le mois courant</h2>
            <div className="p-4 overflow-y-auto max-h-56">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Code Produit</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nom</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date de Création</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produitsDuMois.length > 0 ? (
                    produitsDuMois.map((produit, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produit.codeProduit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produit.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(produit.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">Aucun produit ajouté ce mois.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    </div>
  );
};

export default Home;