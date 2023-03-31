import React from "react";
import PropTypes from "prop-types";

function Controls() {
  return (
    <div className="App">
      <button className="answer-plus">I missed it</button>
      <button className="answer-reset">Reset it</button>
      <button className="answer-minus">I got it</button>
    </div>
  );
}

// Categories.propTypes = {
//   categories: PropTypes.array.isRequired,
// };

export default Controls;
