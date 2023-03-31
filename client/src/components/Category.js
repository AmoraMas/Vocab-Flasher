import React from "react";
import PropTypes from "prop-types";

function Category() {
  return (
    <div className="select-questions">
      <div className="select-category">
        <label for="language">Category? </label>
        <select name="language" id="language">
          <option value="">Select</option>
          <option value="all">All</option>
        </select>
      </div>
      <button className="select-all">All Questions</button>
      <button className="select-unknown">Unknown Questions</button>
    </div>
  );
}

// Categories.propTypes = {
//   categories: PropTypes.array.isRequired,
// };

export default Category;
