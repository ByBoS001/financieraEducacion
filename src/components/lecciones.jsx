import React, { useEffect, useState } from "react";
import HeartSystem from "../components/heart";

const Accordion = () => {
  const [modulos, setModulos] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  // Fetch functions
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
      setModulos(dataJson || []);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

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
      setLecciones(dataJson || []);
    } catch (error) {
      console.error("Error fetching lecciones:", error);
    }
  };

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
      setPreguntas(dataJson || []);

      // Fetch responses for all questions
      const questionIds = dataJson.map(pregunta => pregunta._id);
      fetchRespuestas(questionIds);
    } catch (error) {
      console.error("Error fetching preguntas:", error);
    }
  };

  const fetchRespuestas = async (questionIds) => {
    try {
      const respuestaPromises = questionIds.map(id =>
        fetch("http://localhost:3000/answers/get-all-answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionId: id }),
        }).then(response => response.json())
      );

      const respuestasData = await Promise.all(respuestaPromises);
      const flattenedRespuestas = respuestasData.flat();
      setRespuestas(flattenedRespuestas || []);
    } catch (error) {
      console.error("Error fetching respuestas:", error);
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

  const handleAnswerSelect = (preguntaId, respuestaId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const handleSubmit = () => {
    // Comprobar respuestas seleccionadas
    const results = preguntas.reduce((acc, pregunta) => {
      const selectedRespuesta = selectedAnswers[pregunta._id];
      const correctRespuesta = respuestas.find(
        respuesta => respuesta._id === selectedRespuesta && respuesta.isCorrect
      );
      acc[pregunta._id] = correctRespuesta ? "Correcto" : "Incorrecto"; 
      return acc;
    }, {});
    setResults(results);
  };

  return (
    <div className="relative">
      <HeartSystem/>
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div id="accordion-collapse" data-accordion="collapse">
  w        {/* Panel 1 - Lecciones */}
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
              modulos.map(modulo => (
                <div key={modulo._id} className="mb-4">
                  <p className="text-xl font-bold">{modulo.quizzes}</p>
                </div>
              ))
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
                  <p className="text-xl font-bold">{pregunta.text}</p>
                  <div>
                    {respuestas.length > 0 ? (
                      respuestas
                        .filter(respuesta => respuesta.question._id === pregunta._id)
                        .map((respuesta) => (
                          <div key={respuesta._id} className="flex items-center mb-2">
                            <input
                              type="radio"
                              id={respuesta._id}
                              name={`pregunta-${pregunta._id}`}
                              value={respuesta._id}
                              checked={selectedAnswers[pregunta._id] === respuesta._id}
                              onChange={() => handleAnswerSelect(pregunta._id, respuesta._id)}
                              className="mr-2"
                            />
                            <label htmlFor={respuesta._id}>{respuesta.name}</label>
                          </div>
                        ))
                    ) : (
                      <p>No hay respuestas disponibles.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No hay preguntas disponibles.</p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Enviar Respuestas
            </button>
          </div>

          {/* Resultados */}
          {Object.keys(results).length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Resultados</h3>
              <ul>
                {preguntas.map((pregunta) => (
                  <li key={pregunta._id} className="mb-2">
                    <p className="font-bold">{pregunta.text}</p>
                    <p className={results[pregunta._id] === "Correcto" ? "text-green-600" : "text-red-600"}>
                      {results[pregunta._id]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Accordion;
