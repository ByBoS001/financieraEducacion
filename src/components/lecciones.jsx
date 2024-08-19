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
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchModulos(), fetchLecciones(), fetchPreguntas()]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchModulos = async (moduleId) => {
    try {
      // Verifica si moduleId está definido
      if (!moduleId) {
        throw new Error("Module ID is required");
      }

      const response = await fetch(
        `http://localhost:3000/modules/module/${moduleId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const dataJson = await response.json();
      setModulos(dataJson || []);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    }
  };

  const fetchLecciones = async (moduleId) => {
    try {
      // Verifica si moduleId está definido
      if (!moduleId) {
        throw new Error("Module ID is required");
      }

      const response = await fetch(
        "http://localhost:3000/lessons/get-all-lessons",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: moduleId }), // Envia el moduleId en el cuerpo de la solicitud
        }
      );

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const dataJson = await response.json();
      console.log("Datos de lecciones recibidos:", dataJson); // Verifica los datos recibidos

      if (dataJson.length === 0) {
        console.warn("No se encontraron lecciones");
        return;
      }

      // Agrupar las lecciones por módulo
      const leccionesPorModulo = dataJson.reduce((acc, leccion) => {
        const moduloId = leccion.module._id;
        if (!acc[moduloId]) acc[moduloId] = [];
        acc[moduloId].push(leccion);
        return acc;
      }, {});

      console.log("Lecciones agrupadas por módulo:", leccionesPorModulo); // Verifica la agrupación

      setLecciones(leccionesPorModulo || {});
    } catch (error) {
      console.error("Error al obtener las lecciones:", error);
    }
  };

  const fetchRespuestas = async (questionIds) => {
    try {
      const respuestaPromises = questionIds.map((id) =>
        fetch("http://localhost:3000/answers/get-answer-by-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: id }),
        }).then((response) => response.json())
      );

      const respuestasData = await Promise.all(respuestaPromises);
      setRespuestas(respuestasData.flat() || []);
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
    }
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAnswerSelect = (preguntaId, respuestaId) => {
    setSelectedAnswers((prev) => ({ ...prev, [preguntaId]: respuestaId }));
  };

  const handleSubmit = () => {
    const allAnswered = preguntas.every(
      (pregunta) => selectedAnswers[pregunta._id]
    );
    setAllQuestionsAnswered(allAnswered);

    if (!allAnswered) {
      alert("Por favor, responde todas las preguntas antes de continuar.");
      return;
    }

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
    const currentModuloId = modulos[0]?._id;
    const moduloLecciones = lecciones[currentModuloId] || [];

    if (currentLessonIndex < moduloLecciones.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setAllQuestionsAnswered(false);
    }
  };

  return (
    <div className="relative">
      <HeartSystem />
      <main className="flex-1 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <div id="accordion-collapse" data-accordion="collapse">
            {modulos.map((modulo, index) => (
              <div key={modulo._id}>
                <h2 id={`accordion-collapse-heading-${modulo._id}`}>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleToggle(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`accordion-collapse-body-${modulo._id}`}
                  >
                    <span className="text-xl font-bold">{modulo.name}</span>
                  </button>
                </h2>
                {openIndex === index && (
                  <div
                    id={`accordion-collapse-body-${modulo._id}`}
                    aria-labelledby={`accordion-collapse-heading-${modulo._id}`}
                  >
                    {lecciones[modulo._id] &&
                    lecciones[modulo._id].length > 0 ? (
                      lecciones[modulo._id].map((leccion) => (
                        <div key={leccion._id} className="mb-4">
                          <h3 className="text-xl font-bold">{leccion.name}</h3>
                          {preguntas.length > 0 ? (
                            <div>
                              <p>Preguntas disponibles:</p>
                              {preguntas.map((pregunta) => (
                                <div key={pregunta._id}>
                                  <p>{pregunta.name}</p>
                                  {respuestas
                                    .filter(
                                      (respuesta) =>
                                        respuesta.question === pregunta._id
                                    )
                                    .map((respuesta) => (
                                      <div key={respuesta._id}>
                                        <label>
                                          <input
                                            type="radio"
                                            name={pregunta._id}
                                            value={respuesta._id}
                                            onChange={() =>
                                              handleAnswerSelect(
                                                pregunta._id,
                                                respuesta._id
                                              )
                                            }
                                          />
                                          {respuesta.name}
                                        </label>
                                      </div>
                                    ))}
                                </div>
                              ))}
                              <button onClick={handleSubmit}>
                                Enviar Respuestas
                              </button>
                            </div>
                          ) : (
                            <p>
                              No hay preguntas disponibles para esta lección.
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No hay lecciones disponibles para este módulo.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Accordion;
