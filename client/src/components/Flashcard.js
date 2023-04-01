import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Controls from "./Controls";

function Flashcard({ card, onAttemptsChange }) {
  const [showFirst, setShowFirst] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const host = "http://localhost:8000";

  const deleteCard = async () => {
    try {
      await fetch(host + "/api/flashcards/" + card.id, {
        method: "DELETE",
        headers: {
          "Contenet-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err.message);
      onAttemptsChange();
    }
  };

  const showAll = () => {
    setShowQuestion(true);
    setShowAnswer(true);
    setShowControls(true);
  };

  const showQuestionFirst = () => {
    setShowQuestion(true);
    setShowAnswer(false);
  };

  const showAnswerFirst = () => {
    setShowQuestion(false);
    setShowAnswer(true);
  };

  const updateDisplay = (id, attemptsNum) => {
    if (showFirst === "question") {
      showQuestionFirst();
    } else {
      showAnswerFirst();
    }
    setShowControls(false);
    onAttemptsChange(id, attemptsNum);
  };

  return (
    <>
      Show which first?
      <button
        onClick={() => {
          setShowFirst("question");
          showQuestionFirst();
        }}
      >
        Question
      </button>
      <button
        onClick={() => {
          setShowFirst("answer");
          showAnswerFirst();
        }}
      >
        Answer
      </button>
      <div className="flashcard" onClick={showAll}>
        <div className="category">{card.category}</div>
        {showQuestion ? <div className="question">{card.question}</div> : null}
        {showAnswer ? <div className="answer">{card.answer}</div> : null}
      </div>
      <div className="deleteDiv">
        <div className="deleteLeft" onClick={showAll}>
          Attempts
          <br />
          {card.attempts}
        </div>
        <div className="deleteMiddle" onClick={showAll}></div>
        <div className="deleteRight">
          <button className="deleteButton" onClick={deleteCard}>
            Delete
          </button>
        </div>
      </div>
      {showControls ? (
        <Controls
          id={card.id}
          attempts={card.attempts}
          onAttemptsChange={updateDisplay}
        />
      ) : null}
    </>
  );
}

Flashcard.propTypes = {
  card: PropTypes.object.isRequired,
  onAttemptsChange: PropTypes.func.isRequired,
};

export default Flashcard;
