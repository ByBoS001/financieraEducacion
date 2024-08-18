/* eslint-disable no-unused-vars */
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

  const handleMistake = () => {
    if (hearts > 0) {
      setHearts(prevHearts => prevHearts - 1);
    }
  };

  const handlePractice = () => {
    if (hearts < maxHearts) {
      setHearts(prevHearts => prevHearts + 1);
    }
  };

  return (
    <div className="heart-system" style={{ textAlign: 'center' }}>
      <h1>
        {Array(hearts).fill('❤️').map((heart, index) => (
          <span key={index}>{heart}</span>
        ))}
      </h1>
      <div>
        <button onClick={handleMistake}>Perder corazón</button>
        <button onClick={handlePractice}>Ganar corazón</button>
      </div>
    </div>
  );
};

export default HeartSystem;
