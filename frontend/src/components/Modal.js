// Modal.js
import ReactModal from "react-modal";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addToDeck,
  cardAddedToDeck,
  closeModal,
} from "../redux/actions/card.action";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
const Modal = ({ modalIsOpen, closeModal, addToDeck }) => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const rewardCards = useSelector((state) => state.card.rewardCards);

  useEffect(() => {
    console.log("modalIsOpen:", modalIsOpen);
    console.log("rewardCards:", rewardCards);
  }, [modalIsOpen, rewardCards]);

  const handleRewardSelection = async (selectedCard) => {
    const userEmail = user.email;
    console.log("User Email in handlerewardselection modal:", userEmail);
    console.log("Selected Card: in handlerewardselection modal", selectedCard);

    try {
      console.log("Dispatching addToDeck in modal");
      await dispatch(addToDeck(userEmail, selectedCard));
      console.log("addToDeck completed in modal");

      // Close the modal or perform other actions if necessary
      closeModal();
      // window.location.href = "/map";
    } catch (error) {
      console.error("Error in handleRewardSelection:", error);
      // Handle the error as needed
    }
  };

  // css du modal
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Couleur de fond semi-transparente
      zIndex: 1000, // Position au-dessus de l'image
    },
    content: {
      width: "50%", // ajustez la taille selon vos besoins
      height: "50%", // ajustez la taille selon vos besoins
      margin: "auto",
    },
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      {rewardCards.map((card) => (
        <div
          className="card-align"
          key={card._id}
          onClick={() => handleRewardSelection(card)}
        >
          <div
            className={`card-container card-${card.type.toLowerCase()}`}
            // onClick={() => handleRewardCardClick(card)}
          >
            <p className="card-title">{card.name}</p>
            <p className="card-description">{card.description}</p>
            <div className="card-details">
              <p>Rarity: {card.rarity}</p>
              <p>Type: {card.type}</p>
            </div>
            <div className="card-cost">{card.cost}</div>
          </div>
        </div>
      ))}
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
