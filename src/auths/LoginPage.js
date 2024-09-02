import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./LoginFunction";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Apply custom styles to the body for the login page
    document.body.classList.add('custom-login-body');

    // Cleanup function to remove the custom styles when the component is unmounted
    return () => {
      document.body.classList.remove('custom-login-body');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      authLogin(token, username);
      navigate("/"); 
    } catch (error) {
      console.error("Failed to login", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form className="bg-white w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg shadow-lg"  onSubmit={handleSubmit} style={{ fontFamily: 'Arial', color: '#2C0B07' }}>
      <div className=" items-center justify-center mb-6">
        <img src='/logo.png' alt="Logo" className=" mr-2" /> 
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">Identifiant</label>
            <input type="text"
             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre identifiant" required />
            </div>

          <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Mot de Passe</label>
             <input type="password"
           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500" 
             id="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe" required />
            </div>
            
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
          Sign In
        </button>          
        </form>
      </div>
  );
};

export default LoginPage;
