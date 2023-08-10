import React, { useState, useEffect } from "react";

function Countdown() {
  const startingSeconds = 5;
  const [secs, setSeconds] = useState(startingSeconds);

  useEffect(() => {
    if (secs > 0) {
      const interval = setInterval(() => {
        setSeconds(secs - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [secs]);

  return (
    <div>
      <h2>Début du quiz</h2>
      <p>{`${secs}`}</p>
    </div>
  );
}

export default Countdown;
