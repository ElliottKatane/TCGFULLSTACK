import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/guerrier.png";
import HPBar from "./HPBar";
import { useAuthContext } from "../hooks/useAuthContext";

const Player = () => {
  // importer le contexte d'authentification
  const { user } = useAuthContext();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // si l'user existe (ce qui est forcément le cas puisqu'il a besoin de se connecter pour accéder à cette page), on récupère son email
    if (user) {
      const userEmail = user.email;

      fetch(`/api/player/profile/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setPlayerData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
          setLoading(false);
        });
    }
  }, [user]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!playerData) {
    return <p>Error loading player data.</p>;
  }

  return (
    <div>
      <h1>FIGHTER</h1>
      <img src={image} alt="copie" />
      <HPBar value={playerData.HP} />
    </div>
  );
};

export default Player;
