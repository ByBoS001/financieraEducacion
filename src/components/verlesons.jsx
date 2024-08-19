import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { isAuthenticated } from "../utils/auth"; // Asegúrate de que la ruta sea correcta

const LeccionCard = ({ id }) => {
  const [lecciones, setLecciones] = useState([]);
  const navigate = useNavigate(); // Obtén la función de navegación

  // Función para obtener las lecciones desde la API enviando el moduleId
  const fetchLecciones = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/lessons/by-module",
        {
          method: "POST", // Cambiado a POST para enviar datos en el body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Enviamos el ID del módulo en el body
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      setLecciones(dataJson); // Suponiendo que dataJson es una lista de lecciones.
    } catch (error) {
      console.error("Error fetching lecciones:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLecciones();
    }
  }, [id]);

  const handleTomarLeccionClick = (leccionId) => {
    if (isAuthenticated()) {
      navigate(`/leccion/${leccionId}`); // Redirige a la lección específica si está autenticado
    } else {
      navigate("/login"); // Redirige a /login si no está autenticado
    }
  };

  if (lecciones.length === 0) {
    return <p>Cargando lecciones...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {lecciones.map((leccion) => (
        <div
          key={leccion._id}
          className="relative inline-block px-4 pt-5 pb-4 m-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-white-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6  duration-300 ease-in-out  hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-48">
            <img
              className="object-cover w-full h-full rounded-md"
              src={leccion.imageUrl || "./imagen2.jpeg"} // Imagen predeterminada si no hay una específica
              alt={leccion.name}
            />
          </div>

          <div className="mt-4 text-center">
            <h3
              className="font-medium leading-6 text-gray-800 capitalize dark:text-black"
              id="modal-title"
            >
              {leccion.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {leccion.description}
            </p>
          </div>

          <div className="mt-5 flex justify-center">
            <button
              onClick={() => handleTomarLeccionClick(leccion._id)} // Pasamos el ID de la lección
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Tomar Lección
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeccionCard;
