import React, { useState } from "react";
import stslogo from "../assets/stslogo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css"; // Import your CSS file for styling

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img src={stslogo} alt="oui"></img>
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            <span>&#9776;</span>
          </div>

          <nav className={`menu ${menuVisible ? "open" : ""}`}>
            <Link to="/rules">Règles du jeu</Link>

            {user ? (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            ) : (
              <div>
                <Link to="/login">S'identifier</Link>
                <Link to="/signup">S'enregistrer</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
