import React from "react";
import "../CSS/Rules.css";
const Rules = () => {
  return (
    <div>
      <h1>Règles du jeu</h1>
      <div className="rules-div">
        TCG est un hommage à Slay the Spire. Il s'agit d'un jeu rogue-like, basé
        sur un système de cartes représentant des attaques, des compétences et
        des pouvoirs.
      </div>
      <div className="rules-div">
        Le joueur commence avec un deck de 10 cartes, et doit achever une série
        de 10 combats pour terminer le jeu. A chaque combat, le joueur pioche 5
        cartes au départ. Il peut jouer autant de cartes qu'il le souhaite par
        tour, la seule contrainte étant le coût du mana de chaque carte.
      </div>
      <div className="rules-div">
        {" "}
        A la fin de chaque tour, les cartes restantes dans la main partent dans
        la défausse. Lorsque la pioche est vide, les cartes de la défausse
        reviennent dans la pioche, sans être mélangées.{" "}
      </div>
      <div className="rules-div">
        {" "}
        Le mana est restauré à chaque fin de tour. L'armure, permettant
        d'absorber des dégâts, est remise à 0 à la fin de chaque tour également.{" "}
      </div>
      <div className="rules-div">
        Chaque niveau gagné pour la première fois donne droit à une récompense :
        le choix entre 2 cartes.{" "}
      </div>
      <h1>Technologie utilisée</h1>
      <div className="rules-div">
        {" "}
        Le jeu est développé en React, avec une API en Node.js/Express et une
        base de données MongoDB.{" "}
      </div>
      <div className="rules-div">
        Redux/Toolkit a été utilisé en tant que global state manager
      </div>
      <div className="rules-div">
        {" "}
        Le système d'authentification a été construit à l'aide de Json Web
        Token, Validator et du système de hash and salt Bcrypt.{" "}
      </div>
    </div>
  );
};

export default Rules;
