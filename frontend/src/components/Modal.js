import ReactModal from "react-modal";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToDeck, closeModal } from "../redux/actions/card.action";
import { fetchPlayer } from "../redux/actions/player.action";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom"; // Ajoutez ceci

const Modal = ({ modalIsOpen, closeModal, addToDeck }) => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const rewardCards = useSelector((state) => state.card.rewardCards);
  const playerInfo = useSelector((state) => state.player.playerInfo);
  const { mapLevel } = useParams();

  useEffect(() => {
    console.log("modalIsOpen:", modalIsOpen);
    console.log("rewardCards:", rewardCards);
  }, [modalIsOpen, rewardCards]);

  const handleRewardSelection = async (selectedCard) => {
    const userEmail = user.email;

    try {
      // Vous pouvez accéder directement à playerInfo dans le state avec useSelector
      if (mapLevel && mapLevel <= playerInfo.levelReached) {
        await dispatch(addToDeck(userEmail, selectedCard));
        closeModal();
      } else {
        console.log("Niveau insuffisant pour la récompense.");
        // Vous pouvez également choisir de ne pas fermer la modal dans ce cas
      }
    } catch (error) {
      console.error("Error in handleRewardSelection:", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker semi-transparent background
      zIndex: 1000,
    },
    content: {
      width: "700px", // Adjusted width
      height: "550px", // Adjusted height
      margin: "auto",
      borderRadius: "10px", // Rounded corners
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Drop shadow
      background: "linear-gradient(to bottom, #1a1a1a, #333333)", // Gradient background
      border: "2px solid #fff", // White border
      color: "#fff", // Text color
      fontFamily: "Arial, sans-serif", // Font family
    },
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "30px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {mapLevel && mapLevel >= playerInfo.levelReached ? (
          <p>
            Félicitations ! Vous avez remporté la victoire ! <br /> Choisissez
            une récompense.
          </p>
        ) : (
          <p>
            Vous avez déjà terminé ce niveau précédemment. Aucune récompense
            obtenue.
          </p>
        )}
      </div>

      {mapLevel && mapLevel >= playerInfo.levelReached
        ? rewardCards.map((card) => (
            <div
              className="card-align"
              key={card._id}
              onClick={() => handleRewardSelection(card)}
            >
              <div
                className={`card-container card-${card.type.toLowerCase()}`}
                style={{ textAlign: "center" }}
              >
                <img
                  src={card.imageURL}
                  alt={card.name}
                  style={{ padding: "100px", margin: "auto" }}
                />
              </div>
            </div>
          ))
        : null}

      <button onClick={closeModal}>Fermer</button>
    </ReactModal>
  );
};

const mapStateToProps = (state) => ({
  modalIsOpen: state.card.modalIsOpen,
  rewardCards: state.card.rewardCards,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  addToDeck: (userEmail, selectedCard) =>
    dispatch(addToDeck(userEmail, selectedCard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
