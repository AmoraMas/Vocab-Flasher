import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function Category({ categories, onCategoryChange }) {
  const [currentCategory, setCurrentCategory] = useState("");

  const onCategorySelection = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handleClickAll = () => {
    onCategoryChange(currentCategory, 6);
  };

  const handleClickUnknown = () => {
    onCategoryChange(currentCategory, 5);
  };

  return (
    <div className="select-questions">
      <div className="select-category">
        <select
          name="categories"
          id="categories"
          onChange={onCategorySelection}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <button className="select-all" onClick={handleClickAll}>
        All Questions
      </button>
      <button className="select-unknown" onClick={handleClickUnknown}>
        Unknown Questions
      </button>
    </div>
  );
}

Category.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Category;
