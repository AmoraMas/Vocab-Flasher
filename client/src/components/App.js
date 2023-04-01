import logo from "../logo.svg";
import "../App.css";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Category from "./Category";
import Flashcards from "./Flashcards";

function App() {
  const [categories, setCategories] = useState(["All"]);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMaxAttempts, setSelectedMaxAttempts] = useState(null);

  const host = "http://localhost:8000";

  const getCategories = async () => {
    try {
      let response = await fetch(host + "/api/flashcards/categories");
      let data = await response.json();
      data = [...categories, ...data];
      setCategories(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCategoryChange = async (category, maxAttempts) => {
    if (category) {
      setSelectedCategory(category);
    } else {
      category = selectedCategory;
    }
    if (maxAttempts) {
      setSelectedMaxAttempts(maxAttempts);
    } else {
      maxAttempts = selectedMaxAttempts;
    }
    try {
      let data;
      if (category === "All") {
        const response = await fetch(host + "/api/flashcards/" + maxAttempts);
        data = await response.json();
      } else {
        const response = await fetch(
          host + "/api/flashcards/" + category + "/" + maxAttempts
        );
        data = await response.json();
      }
      setFlashcards(data);
      console.log("New Flashcards set for category", category);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateAttempts = async (id, attemptNum) => {
    try {
      const response = await fetch(host + "/api/flashcards/" + id, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attempts: attemptNum }),
      });
      const data = await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="App">
      <h1>Flash Cards</h1>
      <Category
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      {flashcards[0] ? (
        <Flashcards
          cards={flashcards}
          onAttemptsChange={updateAttempts}
          onFinishingCards={handleCategoryChange}
        />
      ) : null}
    </div>
  );
}

export default App;
