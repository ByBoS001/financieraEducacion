import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Accordion = () => {
  const [modulos, setModulos] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

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
      console.log("Modulos fetched:", dataJson); // Verifica los datos en la consola
      setModulos(dataJson);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

  // Función para obtener las lecciones desde la API
  const fetchLecciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/lessons/get-all-lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      console.log("Lecciones fetched:", dataJson);
      setLecciones(dataJson);
    } catch (error) {
      console.error("Error fetching lecciones:", error);
    }
  };

  // Función para obtener las preguntas desde la API
  const fetchPreguntas = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions/get-all-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      console.log("Preguntas fetched:", dataJson); // Verifica los datos en la consola
      setPreguntas(dataJson);
    } catch (error) {
      console.error("Error fetching preguntas:", error);
    }
  };

  useEffect(() => {
    fetchModulos();
    fetchLecciones();
    fetchPreguntas();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative">
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        
        <div id="accordion-collapse" data-accordion="collapse">
          
          {/* Panel 1 - Lecciones */}
          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleToggle(2)}
              aria-expanded={openIndex === 2}
              aria-controls="accordion-collapse-body-2"
            >
              <span className="text-xl font-bold">
                {lecciones.length > 0 ? (
                  lecciones.map((leccion) => (
                    <div key={leccion._id} className="mb-4">
                      <h3 className="text-xl font-bold">{leccion.name}</h3>
                    </div>
                  ))
                ) : (
                  <p>No hay lecciones disponibles.</p>
                )}
              </span>
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ${openIndex === 2 ? 'block' : 'hidden'}`}
            aria-labelledby="accordion-collapse-heading-2"
          >
            {modulos.length > 0 ? (
              <div key={modulos[0]._id} className="mb-4">
                <p className="text-xl font-bold">{modulos[0].quizzes}</p>
              </div>
            ) : (
              <p>No hay módulos disponibles.</p>
            )}
          </div>

          {/* Panel 2 - Preguntas */}
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleToggle(3)}
              aria-expanded={openIndex === 3}
              aria-controls="accordion-collapse-body-3"
            >
              <span className="text-xl font-bold">Preguntas</span>
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${openIndex === 3 ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ${openIndex === 3 ? 'block' : 'hidden'}`}
            aria-labelledby="accordion-collapse-heading-3"
          >
            {preguntas.length > 0 ? (
              preguntas.map((pregunta) => (
                <div key={pregunta._id} className="mb-4">
                  <p className="text-xl font-bold">{pregunta.texto}</p>
                </div>
              ))
            ) : (
              <p>No hay preguntas disponibles.</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Accordion;
