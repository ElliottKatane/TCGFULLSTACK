import React, { useState, useEffect } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import {
  useFrappeCard,
  fetchRandomCards,
} from "../redux//actions/cartesActions"; // Import the Card actions

const Card = () => {
  const randomCards = useSelector((state) => state.cartes.randomCards);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  useEffect(() => {
    dispatch(fetchRandomCards());
  }, [dispatch]);

  return (
    <div>
      {randomCards.map((card, index) => (
        <div className="card-align" key={index}>
          <div // Render each card as a div. bg color's card changes with type
            className={`card-container card-${card.type.toLowerCase()}`}
          >
            <h2 className="card-title">{card.name}</h2>
            <p className="card-description">{card.description}</p>
            <div className="card-details">
              <p>Rarity: {card.rarity}</p>
              <p>Type: {card.type}</p>
            </div>
            <div className="card-cost">{card.cost}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
