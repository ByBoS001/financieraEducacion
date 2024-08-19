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

  const fetchModulos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/modules/get-module-by-id",
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
        "http://localhost:3000/lessons/get-lesson-by-id",
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
        "http://localhost:3000/questions/get-question-by-id",
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

      const questionIds = dataJson.map((pregunta) => pregunta._id);
      fetchRespuestas(questionIds);
    } catch (error) {
      console.error("Error fetching preguntas:", error);
    }
  };

  const fetchRespuestas = async (questionIds) => {
    try {
      const respuestaPromises = questionIds.map((id) =>
        fetch("http://localhost:3000/answers/get-answer-by-id", {
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
    const fetchData = async () => {
      await Promise.all([fetchModulos(), fetchLecciones(), fetchPreguntas()]);
      setLoading(false);
    };
    fetchData();
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
    const currentModuloId = modulos[0]._id;
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
                          key={
                            lecciones[modulos[0]._id][currentLessonIndex]._id
                          }
                          className="mb-4"
                        >
                          <h3 className="text-xl font-bold">
                            {
                              lecciones[modulos[0]._id][currentLessonIndex]
                                .name
                            }
                          </h3>
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
                            <p>No hay preguntas disponibles para esta lección.</p>
                          )}
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
          </div>
        )}
      </main>
    </div>
  );
};

export default Accordion;