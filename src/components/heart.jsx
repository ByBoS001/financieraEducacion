import React, { useEffect, useState } from 'react';

const HeartSystem = () => {
  const [hearts, setHearts] = useState(5);
  const maxHearts = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (hearts < maxHearts) {
        setHearts(prevHearts => prevHearts + 1);
      }
    }, 5 * 60 * 60 * 1000); // Regenera un corazón cada 5 horas

    return () => clearInterval(interval);
  }, [hearts]);

  // Función para manejar una respuesta incorrecta
  const handleMistake = () => {
    if (hearts > 0) {
      setHearts(prevHearts => prevHearts - 1);
    }
  };

  // Simulación de una respuesta incorrecta
  useEffect(() => {
    // Llama a handleMistake cuando haya una respuesta incorrecta
    // Por ejemplo, podrías hacerlo a través de props o contextos.
  }, []); // Aquí puedes poner tu lógica para disparar el evento

  return (
    <div className="heart-system" style={{ textAlign: 'center' }}>
      <h1>
        {Array(hearts).fill('❤️').map((heart, index) => (
          <span key={index} style={{ fontSize: '3rem' }}>{heart}</span>
        ))}
      </h1>
    </div>
  );
};

export default HeartSystem;
