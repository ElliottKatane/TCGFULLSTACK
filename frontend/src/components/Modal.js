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
    } catch (error) {
      console.error("Error in handleRewardSelection:", error);
      // Handle the error as needed
    }
  };

  // css du modal
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Darker semi-transparent background
      zIndex: 1000,
    },
    content: {
      width: "60%", // Adjusted width
      height: "60%", // Adjusted height
      margin: "auto",
      padding: "20px", // Added padding for content
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
            <img
              src={card.imageURL} // Make sure the card object has an 'imageURL' property
              alt={card.name}
              className="card-image"
            />
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
