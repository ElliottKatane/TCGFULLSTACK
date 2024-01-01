import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTurn, MonsterAttack } from "../redux/actions/player.action";
import enemyAttack from "../assets/enemy-attack.gif";
// import { DegatsSubis } from "../redux/actions/monster.action";

const SwitchTurnButton = () => {
  const dispatch = useDispatch();
  // const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  // const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  const [showMonsterImage, setShowMonsterImage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);

    if (currentTurn === "player") {
      // Additional logic if needed for the player's turn
      // ...
    } else {
      // Logic for the monster's turn is now handled in the switchTurn action
      // You can add additional logic specific to the monster's turn here if needed
    }
  };

  return (
    <div>
      <button
        className="fintourbtn"
        onClick={handleEndTurn}
        disabled={isButtonDisabled}
      >
        Fin Tour {currentTurn === "player" ? "Joueur" : "Monstre"}
      </button>

      {showMonsterImage && (
        <div>
          <img
            src={enemyAttack}
            alt="Monster Attack"
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SwitchTurnButton;
