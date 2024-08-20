import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ModuloCard = () => {
  const [modulos, setModulos] = useState([]);
  const [selectedModuloId, setSelectedModuloId] = useState(null);
  const navigate = useNavigate();

  const fetchModulos = async () => {
    try {
      const response = await fetch("http://localhost:3000/modules/get-all-modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      setModulos(dataJson);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

  const handleVerLeccionesClick = (moduloId) => {
    if (isAuthenticated()) {
      setSelectedModuloId(moduloId);
      navigate('/leccion', { state: { moduleId: moduloId } }); // Pasar moduleId a través del estado de navegación
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  if (modulos.length === 0) {
    return <p>Cargando módulos...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {modulos.map((modulo) => (
        <div
          key={modulo._id}
          className="relative inline-block px-4 pt-5 pb-4 m-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-white-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-48">
            <img
              className="object-cover w-full h-full rounded-md"
              src={modulo.imageUrl || "./introduccion.jpeg"}
              alt={modulo.name}
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="font-medium leading-6 text-gray-800 capitalize dark:text-black" id="modal-title">
              {modulo.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {modulo.text}
            </p>
          </div>
          
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => handleVerLeccionesClick(modulo._id)}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Ver Lecciones
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuloCard;

