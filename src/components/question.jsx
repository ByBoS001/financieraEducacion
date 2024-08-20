import React from "react";
import Answer from "./answer";

const Question = ({ pregunta, respuestas, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="question mb-4 p-4 border border-gray-300 rounded-md">
      <h3 className="font-semibold text-lg mb-2">{pregunta.text}</h3>
      <div className="answers">
        {respuestas.length === 0 ? (
          <p>No answers available.</p>
        ) : (
          respuestas.map((respuesta) => (
            <Answer
              key={respuesta._id}
              respuesta={respuesta}
              isSelected={selectedAnswer === respuesta._id}
              onSelect={() => onAnswerSelect(pregunta._id, respuesta._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Question;
