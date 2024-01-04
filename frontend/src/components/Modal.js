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
      width: "25%", // Adjusted width
      height: "25%", // Adjusted height
      margin: "auto",
      borderRadius: "10px", // Rounded corners
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Drop shadow
      background: "linear-gradient(to bottom, #1a1a1a, #333333)", // Gradient background
      border: "2px solid #fff", // White border
      color: "#fff", // Text color
      fontFamily: "Arial, sans-serif", // Font family
      overflow: "hidden", // Add this line to hide content overflow
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
          marginBottom: "40px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <p>
          {" "}
          Félicitations ! Vous avez remporté la victoire !Choisir une
          récompense.
        </p>
      </div>

      {rewardCards.map((card) => (
        <div
          className="card-align"
          key={card._id}
          onClick={() => handleRewardSelection(card)}
        >
          <div
            className={`card-container card-${card.type.toLowerCase()}`}
            style={{ textAlign: "center" }} // Adjusted styling for the container

            // onClick={() => handleRewardCardClick(card)}
          >
            <img
              src={card.imageURL}
              alt={card.name}
              style={{ padding: "100px", margin: "auto" }}
            />
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
