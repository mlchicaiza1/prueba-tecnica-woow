import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import axios from "axios";
import { Layout } from "../components/Layout";

export const Profile: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await api.put("/users/me", { name });
      updateUser(response.data.user);
      setSuccessMessage("Perfil actualizado exitosamente");
      setIsEditing(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error al actualizar");
      } else {
        setError("Error desconocido");
      }
    }
  };

  if (!user) return null; // Or a loading spinner

  return (
    <Layout>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Mi Perfil
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}

          <div className="mb-6 flex justify-end">
             <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Cerrar Sesión
              </button>
          </div>

          {isEditing ? (
            <form className="space-y-6" onSubmit={handleUpdate}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Rol</h3>
                <p className="mt-1 text-sm inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                  {user.role}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
