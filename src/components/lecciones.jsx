import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const ResultSummary = ({ correctAnswers, incorrectAnswers, onNextLesson }) => (
  <div className="result-summary mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
    <h3 className="text-2xl font-bold text-green-600 mb-4">
      Respuestas Correctas
    </h3>
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

    <h3 className="text-2xl font-bold text-red-600 mb-4">
      Respuestas Incorrectas
    </h3>
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

    {Object.keys(incorrectAnswers).length === 0 && (
      <button
        onClick={onNextLesson}
        className="next-lesson-button mt-6 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Siguiente Lección
      </button>
    )}
  </div>
);

const Accordion = () => {
  const location = useLocation();
  const { moduleId } = location.state || {};

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
        `https://educacionfinanciera-ipr0.onrender.com/modules/module/${moduleId}`,
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
        "https://educacionfinanciera-ipr0.onrender.com/lessons/get-all-lessons",
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
        await fetchPreguntas(dataJson[0]._id);
      }
    } catch (error) {
      console.error("Error al obtener las lecciones:", error);
    }
  };

  const fetchPreguntas = async (lessonId) => {
    try {
      const response = await fetch(
        `https://educacionfinanciera-ipr0.onrender.com/questions/question/${lessonId}`,
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
            `https://educacionfinanciera-ipr0.onrender.com/answers/answer/${questionId}`,
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
        "https://educacionfinanciera-ipr0.onrender.com/useranswers/submit-answers",
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

      const correctAnswers = {};
      const incorrectAnswers = {};

      preguntas.forEach((pregunta) => {
        const userAnswerId = selectedAnswers[pregunta._id];
        const correctAnswer = respuestas[pregunta._id]?.find(
          (respuesta) => respuesta.isCorrect
        );

        if (userAnswerId === correctAnswer?._id) {
          correctAnswers[
            pregunta._id
          ] = `Pregunta: ${pregunta.text} - Respuesta Correcta: ${correctAnswer.name}`;
        } else {
          incorrectAnswers[pregunta._id] = `Pregunta: ${
            pregunta.text
          } - Respuesta Seleccionada: ${
            respuestas[pregunta._id]?.find(
              (respuesta) => respuesta._id === userAnswerId
            )?.name || "Desconocida"
          } - Respuesta Correcta: ${correctAnswer?.name || "Desconocida"}`;
        }
      });

      setResults(result);
      setCorrectAnswers(correctAnswers);
      setIncorrectAnswers(incorrectAnswers);

      if (Object.keys(incorrectAnswers).length === 0) {
        handleNextLesson();
      }
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setResults(null);
    setCorrectAnswers({});
    setIncorrectAnswers({});
  };

  const handlePreviousLesson = () => {
    setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lecciones.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
      fetchPreguntas(lecciones[currentLessonIndex + 1]._id);
    } else {
      alert("Has completado todas las lecciones.");
    }
  };

  const renderPregunta = (pregunta) => (
    <div
      key={pregunta._id}
      className="question mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold">{pregunta.text}</h3>
      <div className="answers mt-2">
        {respuestas[pregunta._id]?.map((respuesta) => (
          <button
            key={respuesta._id}
            onClick={() => handleAnswerSelect(pregunta._id, respuesta._id)}
            className={`answer-button block px-4 py-2 mt-2 rounded-lg ${
              selectedAnswers[pregunta._id] === respuesta._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {respuesta.name}
          </button>
        ))}
        {selectedAnswers[pregunta._id] && results && (
          <div className="selected-answer mt-2">
            <p>
              Respuesta Seleccionada:{" "}
              {respuestas[pregunta._id]?.find(
                (respuesta) => respuesta._id === selectedAnswers[pregunta._id]
              )?.name || "Desconocida"}
            </p>
            <p>
              Respuesta Correcta:{" "}
              {respuestas[pregunta._id]?.find(
                (respuesta) => respuesta.isCorrect
              )?.name || "Desconocida"}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="accordion-container p-6">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {lecciones.length > 0 && (
            <div className="lecciones">
              <h2 className="text-3xl font-bold mb-6">
                {lecciones[currentLessonIndex].name}
              </h2>
              {preguntas.map(renderPregunta)}
            </div>
          )}
          <div className="navigation-buttons mt-6 flex justify-between">
            <button
              onClick={handlePreviousLesson}
              className="px-4 py-2 bg-gray-300 rounded-lg"
              disabled={currentLessonIndex === 0}
            >
              Anterior
            </button>
            <button
              onClick={handleNextLesson}
              className="px-4 py-2 bg-gray-300 rounded-lg"
              disabled={currentLessonIndex === lecciones.length - 1}
            >
              Siguiente
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="submit-button mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Enviar Respuestas
          </button>
          {results && (
            <ResultSummary
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              onNextLesson={handleNextLesson}
            />
          )}
          {results && (
            <button
              onClick={handleRestart}
              className="restart-button mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reiniciar
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Accordion;
