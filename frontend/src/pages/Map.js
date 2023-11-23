import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../CSS/Map.css";

const Map = () => {
  // Using the useAuthContext hook to get the user information
  const { user } = useAuthContext();

  // State to store the level reached by the user and loading state
  const [levelReached, setLevelReached] = useState(1);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch player data when the component mounts or when the user changes
  useEffect(() => {
    // Check if a user is available
    if (user) {
      const userEmail = user.email;

      console.log("Fetching player data for user with email:", userEmail);

      // Fetch player data from the API
      fetch(`/api/player/profile/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          // Log the received player data and update the state
          console.log("Player data received:", data);
          setLevelReached(data.levelReached);
          setLoading(false);
        })
        .catch((error) => {
          // Log an error if fetching data fails and set loading to false
          console.error("Error fetching player data:", error);
          setLoading(false);
        });
    }
  }, [user]); // Dependency array ensures the effect runs when the user changes

  // Function to determine if a map button is clickable based on the level reached
  const isButtonClickable = (buttonLevel) => {
    return buttonLevel <= levelReached;
  };

  // Render the map buttons using an array of levels
  return (
    <div className="mapStyle">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((buttonLevel) => (
        <React.Fragment key={buttonLevel}>
          {isButtonClickable(buttonLevel) ? (
            // Render a clickable link if the button is clickable
            <Link
              to={`/combat/${buttonLevel}`}
              className={`map-button button-${buttonLevel} clickable`}
            >
              <i className="fa fa-flag"></i>
            </Link>
          ) : (
            // Render a non-clickable div with a lock icon if the button is not clickable
            <div className={`map-button button-${buttonLevel} unclickable`}>
              <i className="fa fa-lock"></i>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Map;
