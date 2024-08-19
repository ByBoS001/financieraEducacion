// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../App.css";
import HeartSystem from "../components/heart";

const Accordion = () => {
  const [modulos, setModulos] = useState([]);
  const [lecciones, setLecciones] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Index para controlar lecciones
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // Nuevo estado para controlar las respuestas

  // Fetch functions
  const fetchModulos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/modules/get-all-modules",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const response = await fetch(
        "http://localhost:3000/lessons/get-all-lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();

      // Organizar lecciones por módulo
      const leccionesPorModulo = dataJson.reduce((acc, leccion) => {
        if (!acc[leccion.modulo]) {
          acc[leccion.modulo] = [];
        }
        acc[leccion.modulo].push(leccion);
        return acc;
      }, {});

      setLecciones(leccionesPorModulo || {});
    } catch (error) {
      console.error("Error fetching lecciones:", error);
    }
  };

  const fetchPreguntas = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/questions/get-all-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      setPreguntas(dataJson || []);

      // Fetch responses for all questions
      const questionIds = dataJson.map((pregunta) => pregunta._id);
      fetchRespuestas(questionIds);
    } catch (error) {
      console.error("Error fetching preguntas:", error);
    }
  };

  const fetchRespuestas = async (questionIds) => {
    try {
      const respuestaPromises = questionIds.map((id) =>
        fetch("http://localhost:3000/answers/get-all-answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionId: id }),
        }).then((response) => response.json())
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAnswerSelect = (preguntaId, respuestaId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const handleSubmit = () => {
    // Comprobar si todas las preguntas tienen respuestas seleccionadas
    const allAnswered = preguntas.every(
      (pregunta) => selectedAnswers[pregunta._id]
    );
    setAllQuestionsAnswered(allAnswered);

    if (!allAnswered) {
      alert("Por favor, responde todas las preguntas antes de continuar.");
      return;
    }

    // Comprobar respuestas seleccionadas
    const results = preguntas.reduce((acc, pregunta) => {
      const selectedRespuesta = selectedAnswers[pregunta._id];
      const correctRespuesta = respuestas.find(
        (respuesta) =>
          respuesta._id === selectedRespuesta && respuesta.isCorrect
      );
      acc[pregunta._id] = correctRespuesta ? "Correcto" : "Incorrecto";
      return acc;
    }, {});
    setResults(results);
  };

  const handleNextLesson = () => {
    const currentModuloId = modulos[0]._id; // Ejemplo con el primer módulo
    const moduloLecciones = lecciones[currentModuloId] || [];

    // Verificar que no se pase el índice
    if (currentLessonIndex < moduloLecciones.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setAllQuestionsAnswered(false); // Reiniciar el estado de las preguntas para la siguiente lección
    }
  };

  return (
    <div className="relative">
      <HeartSystem />
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div id="accordion-collapse" data-accordion="collapse">
          {/* Panel de Lecciones */}
          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleToggle(2)}
              aria-expanded={openIndex === 2}
              aria-controls="accordion-collapse-body-2"
            >
              <span className="text-xl font-bold">
                {modulos.length > 0 ? (
                  <div>
                    {lecciones[modulos[0]._id] &&
                    lecciones[modulos[0]._id].length > 0 ? (
                      <div
                        key={lecciones[modulos[0]._id][currentLessonIndex]._id}
                        className="mb-4"
                      >
                        <h3 className="text-xl font-bold">
                          {lecciones[modulos[0]._id][currentLessonIndex].name}
                        </h3>
                      </div>
                    ) : (
                      <p>No hay lecciones disponibles.</p>
                    )}
                  </div>
                ) : (
                  <p>No hay módulos disponibles.</p>
                )}
              </span>
            </button>
          </h2>

          <div class="iframe-container">
            <iframe
              width="800"
              height="500"
              src="https://www.youtube.com/embed/9sCVcWD1Svs?si=S_icLfcDcmNe2FTh"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          {/* Preguntas */}
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleToggle(3)}
              aria-expanded={openIndex === 3}
              aria-controls="accordion-collapse-body-3"
            >
              <span className="text-xl font-bold">Preguntas</span>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ${
              openIndex === 3 ? "block" : "hidden"
            }`}
            aria-labelledby="accordion-collapse-heading-3"
          >
            {preguntas.length > 0 ? (
              preguntas.map((pregunta) => (
                <div key={pregunta._id} className="mb-4">
                  <p className="text-xl font-bold">{pregunta.text}</p>
                  <div>
                    {respuestas.length > 0 ? (
                      respuestas
                        .filter(
                          (respuesta) => respuesta.question._id === pregunta._id
                        )
                        .map((respuesta) => (
                          <div
                            key={respuesta._id}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="radio"
                              id={`respuesta-${respuesta._id}`}
                              name={`pregunta-${pregunta._id}`}
                              value={respuesta._id}
                              checked={
                                selectedAnswers[pregunta._id] === respuesta._id
                              }
                              onChange={() =>
                                handleAnswerSelect(
                                  pregunta._id,
                                  respuesta._id
                                )
                              }
                            />
                            <label
                              htmlFor={`respuesta-${respuesta._id}`}
                              className="ml-2"
                            >
                              {respuesta.name}
                            </label>
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
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
          >
            Enviar Respuestas
          </button>
          <button
            onClick={handleNextLesson}
            className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white font-bold rounded"
          >
            Siguiente Lección
          </button>

          {/* Resultados */}
          <div className="mt-4">
            <h3 className="text-xl font-bold">Resultados</h3>
            {Object.keys(results).length > 0 ? (
              <div>
                {preguntas.map((pregunta) => (
                  <p key={pregunta._id}>
                    {pregunta.text}: {results[pregunta._id]}
                  </p>
                ))}
              </div>
            ) : (
              <p>No has enviado respuestas aún.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accordion;
