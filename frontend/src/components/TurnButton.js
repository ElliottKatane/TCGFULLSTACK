import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTurn, MonsterAttack } from "../redux/actions/player.action";
import { connect } from "react-redux";

const TurnButton = () => {
  const dispatch = useDispatch();
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  console.log("Monster Info in component TURNBUTTON:", monsterInfo);

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));

    // Utilisez la valeur actualisée après la mise à jour
    console.log(
      "Turn switched to",
      currentTurn === "player" ? "Monster" : "Player"
    );
    if (currentTurn === "player") {
      const monsterAttackValue = monsterInfo.attacks[1].damage;
      console.log("Monster attack value:", monsterAttackValue);
      dispatch(MonsterAttack(monsterAttackValue));
    }
  };
  return (
    <div className="fintourbtn">
      <button onClick={handleEndTurn}>
        End {currentTurn === "player" ? "Player" : "Monster"} Turn
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    enflammerActivated: state.player.enflammerActivated,
    combustionActivated: state.player.combustionActivated,
  };
};
export default connect(mapStateToProps)(TurnButton);
