import React, { useState, useEffect } from 'react';

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
    <div className="heart-system">
      <h1>Hearts: {hearts}</h1>
    </div>
  );
};

export default HeartSystem;