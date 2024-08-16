import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modulos = () => {
  const [modulos, setModulos] = useState([]);

  // Función para obtener los módulos desde la API
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
      console.log(dataJson); // Verifica los datos en la consola
      setModulos(dataJson);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  return (
    <div className="relative">
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">
          Lista de Módulos
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {modulos.length > 0 ? (
            modulos.map((modulo) => (
              <div key={modulo._id} className="group max-w-sm bg-green-100 border border-green-400 rounded-lg shadow-lg overflow-hidden">
                <a href={modulo.video} target="_blank" rel="noopener noreferrer">
                  <img
                    alt={modulo.name}
                    src={"../introduccion.jpeg"} 
                    className="h-48 w-full object-cover object-center"
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
                    {modulo.name}
                  </h5>
                  <p className="mb-3 font-normal text-green-900">
                    {modulo.text}
                  </p>
                
                  <Link
                    to='/leccion'
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                  >
                    Ver más
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hay módulos disponibles.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Modulos;
