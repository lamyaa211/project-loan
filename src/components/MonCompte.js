import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auths/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const MonCompte = () => {
  const { AuthenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    if (AuthenticatedUser && AuthenticatedUser.photoUrl) {
      setUserPhoto(`http://localhost:8084/api/users/photos/${AuthenticatedUser.photoUrl}`);
    }
  }, [AuthenticatedUser]);

  if (!AuthenticatedUser) {
    navigate("/login");
    return null;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`http://localhost:8084/api/users/${AuthenticatedUser.id}/upload-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const uploadedFileName = response.data;
        setUserPhoto(`http://localhost:8084/api/users/photos/${uploadedFileName}`);
        setMessage("Image uploaded successfully");
        // Mettez à jour l'objet AuthenticatedUser avec la nouvelle photoUrl
        AuthenticatedUser.photoUrl = uploadedFileName;
    }
     else {
        setMessage("Failed to upload image");
      }
    } catch (error) {
      setMessage("Error uploading image");
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
      <Navbar />
      <div className="container mx-auto mt-20 p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg mx-auto w-full md:w-4/5 -mt-16 relative">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Mon Compte
          </h2>

       
          <div className="flex justify-center mb-8">
            <div className="relative inline-block">
              <div
                className="bg-gray-200 rounded-full cursor-pointer"
                style={{ width: "120px", height: "120px", lineHeight: "0", display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="text-center">No Photo</div>
                )}
              </div>
              <label htmlFor="file-upload" className="absolute right-1 top-0">
                <div
                  className="bg-orange-500 rounded-full p-0.5 cursor-pointer mt-1"
                  style={{
                    width: "22px",
                    height: "22px",
                    lineHeight: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-white text-xs" />
                </div>
              </label>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg"
          >
            Enregistrer la Photo
          </button>

          {message && (
            <div className="text-green-500 text-center mb-4">{message}</div>
          )}

          {/* Section des champs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="text-left">
              <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={AuthenticatedUser.prenom}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={AuthenticatedUser.username}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={AuthenticatedUser.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="numerotel" className="block text-gray-700 text-sm font-bold mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="numerotel"
                name="numerotel"
                value={AuthenticatedUser.numerotel}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-1">
                Adresse
              </label>
              <textarea
                id="adresse"
                name="adresse"
                rows="3"
                value={AuthenticatedUser.adresse}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-left">
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-1">
                Poste
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={AuthenticatedUser.role}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
