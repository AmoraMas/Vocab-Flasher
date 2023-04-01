import React from "react";
import PropTypes from "prop-types";

function Controls({ id, attempts, onAttemptsChange }) {
  const changeAttemptNum = (adjustment) => {
    let newAttempts;
    switch (adjustment) {
      case "plus":
        newAttempts = attempts >= 5 ? 5 : attempts + 1;
        break;
      case "minus":
        newAttempts = attempts <= 0 ? 0 : attempts - 1;
        break;
      case "reset":
        newAttempts = 0;
        break;
    }
    console.log("attempts:", newAttempts);
    onAttemptsChange(id, newAttempts);
  };

  return (
    <div className="App">
      <button
        className="answer-minus"
        onClick={() => {
          changeAttemptNum("minus");
        }}
      >
        I missed it
      </button>
      <button
        className="answer-reset"
        onClick={() => {
          changeAttemptNum("reset");
        }}
      >
        Reset it
      </button>
      <button
        className="answer-plus"
        onClick={() => {
          changeAttemptNum("plus");
        }}
      >
        I got it
      </button>
    </div>
  );
}

Controls.propTypes = {
  id: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  onAttemptsChange: PropTypes.func.isRequired,
};

export default Controls;
