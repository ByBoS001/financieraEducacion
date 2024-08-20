import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const ResultSummary = ({ correctAnswers, incorrectAnswers }) => (
  <div className="result-summary mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
    <h3 className="text-2xl font-bold text-green-600 mb-4">Respuestas Correctas</h3>
    <ul className="list-disc pl-6 mb-4">
      {Object.keys(correctAnswers).length > 0 ? (
        Object.keys(correctAnswers).map((questionId) => (
          <li key={questionId} className="text-gray-800">
            {correctAnswers[questionId]}
          </li>
        ))
      ) : (
        <p className="text-gray-600">No hay respuestas correctas.</p>
      )}
    </ul>

    <h3 className="text-2xl font-bold text-red-600 mb-4">Respuestas Incorrectas</h3>
    <ul className="list-disc pl-6">
      {Object.keys(incorrectAnswers).length > 0 ? (
        Object.keys(incorrectAnswers).map((questionId) => (
          <li key={questionId} className="text-gray-800">
            {incorrectAnswers[questionId]}
          </li>
        ))
      ) : (
        <p className="text-gray-600">No hay respuestas incorrectas.</p>
      )}
    </ul>
  </div>
);

const Accordion = () => {
  const location = useLocation();
  const { moduleId } = location.state || {}; // Obtener moduleId desde el estado de navegación

  const [modulos, setModulos] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleId) {
      console.error("Module ID is required");
      return;
    }

    const fetchData = async () => {
      try {
        await Promise.all([fetchModulos(moduleId), fetchLecciones(moduleId)]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId]);

  const fetchModulos = async (moduleId) => {
    try {
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
      setModulos([dataJson]);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    }
  };

  const fetchLecciones = async (moduleId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/lessons/get-all-lessons",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: moduleId }),
        }
      );

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const dataJson = await response.json();
      setLecciones(dataJson);

      if (dataJson.length > 0) {
        await fetchPreguntas(dataJson[0]._id); // Obtener preguntas para la primera lección
      }
    } catch (error) {
      console.error("Error al obtener las lecciones:", error);
    }
  };

  const fetchPreguntas = async (lessonId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/questions/question/${lessonId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `La respuesta de la red no fue correcta: ${errorMessage}`
        );
      }

      const dataJson = await response.json();
      setPreguntas(dataJson || []);

      // Obtén los IDs de las preguntas y pasa a fetchRespuestas
      const questionIds = dataJson.map((pregunta) => pregunta._id);
      await fetchRespuestas(questionIds);
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };

  const fetchRespuestas = async (questionIds) => {
    if (!questionIds || questionIds.length === 0) return;

    try {
      const responses = await Promise.all(
        questionIds.map(async (questionId) => {
          const response = await fetch(
            `http://localhost:3000/answers/answer/${questionId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              `La respuesta de la red no fue correcta: ${errorMessage}`
            );
          }

          return response.json();
        })
      );

      // Organiza las respuestas por questionId
      const respuestasByQuestion = responses.reduce(
        (acc, respuestas, index) => {
          const questionId = questionIds[index];
          acc[questionId] = respuestas;
          return acc;
        },
        {}
      );

      setRespuestas(respuestasByQuestion);
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
    }
  };

  const handleAnswerSelect = (preguntaId, respuestaId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const handleSubmit = async () => {
    const allAnswered = preguntas.every(
      (pregunta) => selectedAnswers[pregunta._id]
    );

    if (!allAnswered) {
      alert("Por favor, responde todas las preguntas antes de continuar.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/useranswers/submit-answers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedAnswers),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar las respuestas");
      }

      const result = await response.json();
      setResults(result);
      setCorrectAnswers(result.correctAnswers || {});
      setIncorrectAnswers(result.incorrectAnswers || {});
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
    }
  };

  const handlePreviousLesson = () => {
    setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextLesson = () => {
    setCurrentLessonIndex((prevIndex) =>
      Math.min(prevIndex + 1, (lecciones.length || 0) - 1)
    );
  };

  const renderPregunta = (pregunta) => (
    <div key={pregunta._id} className="question mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-xl">{pregunta.text}</h3>
      <div className="answers mt-2">
        {respuestas[pregunta._id]?.length ? (
          respuestas[pregunta._id].map((respuesta) => (
            <button
              key={respuesta._id}
              onClick={() =>
                handleAnswerSelect(pregunta._id, respuesta._id)
              }
              className={`answer-button transition-colors duration-300 ease-in-out px-4 py-2 rounded-lg ${
                selectedAnswers[pregunta._id] === respuesta._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {respuesta.name}
            </button>
          ))
        ) : (
          <p>No hay respuestas disponibles para esta pregunta.</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!lecciones.length) {
    return <p>No se encontraron lecciones.</p>;
  }

  const currentLesson = lecciones[currentLessonIndex];

  return (
    <div className="accordion-container p-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        {currentLesson.name}
      </h2>

      <div className="questions mt-6">
        {preguntas.length === 0 ? (
          <p className="text-gray-600 text-center">No hay preguntas disponibles.</p>
        ) : (
          preguntas.map((pregunta) => renderPregunta(pregunta))
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
          className="transition-colors duration-300 ease-in-out px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === lecciones.length - 1}
          className="transition-colors duration-300 ease-in-out px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="submit-button mt-8 px-8 py-4 rounded-lg bg-purple-700 text-white font-bold transition-transform duration-300 ease-in-out hover:scale-105"
      >
        Enviar respuestas
      </button>

      {results && (
        <ResultSummary
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
      )}
    </div>
  );
};

export default Accordion;

