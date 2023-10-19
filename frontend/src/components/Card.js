import React, { useState, useEffect } from "react";

const Card = () => {
  const [randomCards, setRandomCards] = useState([]);

  useEffect(() => {
    // Make an API request to retrieve random cards using fetch
    fetch("/api/card-form/getRandomCards")
      .then((response) => response.json())
      .then((data) => setRandomCards(data))
      .catch((error) => console.error("Error fetching random cards:", error));
  }, []);

  return (
    <div>
      {randomCards.map((card, index) => (
        <div // Render each card as a div. bg color's card changes with type
          className={`card-container card-${card.type.toLowerCase()}`}
          key={index}
        >
          <h2 className="card-title">{card.name}</h2>
          <p className="card-description">{card.description}</p>
          <div className="card-details">
            <p>Rarity: {card.rarity}</p>
            <p>Type: {card.type}</p>
          </div>
          <div className="card-cost">{card.cost}</div>
        </div>
      ))}
    </div>
  );
};

export default Card;
