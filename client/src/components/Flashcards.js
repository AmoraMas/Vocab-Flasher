import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Flashcard from "./Flashcard";

function Flashcards({ cards, onAttemptsChange, onFinishingCards }) {
  const [cardNum, setCardNum] = useState(0);

  const setNextCard = async (id, attemptsNum) => {
    try {
      if (cardNum === null) {
        setCardNum(0);
      } else {
        if (cardNum + 1 < cards.length) {
          setCardNum(cardNum + 1);
        } else {
          onFinishingCards();
          setCardNum(0);
        }
      }
      onAttemptsChange(id, attemptsNum);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {cards[cardNum] ? (
        <Flashcard card={cards[cardNum]} onAttemptsChange={setNextCard} />
      ) : null}
    </>
  );
}

Flashcards.propTypes = {
  cards: PropTypes.array.isRequired,
  onAttemptsChange: PropTypes.func.isRequired,
};

export default Flashcards;

/*

*/
