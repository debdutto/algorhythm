import React from "react";

export default (startMusic, stopMusic) => {
  return (
    <div>
      <p>
        <button onClick={startMusic}>Start</button>

        <button onClick={stopMusic}>Stop</button>
      </p>
    </div>
  );
};
