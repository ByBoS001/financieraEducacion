import React from "react";

const Answer = ({ respuesta, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`block px-4 py-2 mb-2 w-full text-left border border-gray-300 rounded-md ${
        isSelected ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-100"
      }`}
    >
      {respuesta.text}
    </button>
  );
};

export default Answer;
