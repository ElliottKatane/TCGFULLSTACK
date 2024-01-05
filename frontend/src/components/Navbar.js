import React, { useState } from "react";
import stslogo from "../assets/stslogo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  // hooks import
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // State to manage the menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div
        className="container"
        style={{
          backgroundImage: `url(${require("../assets/navbar.jpg")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavLink className="navbar-brand" to="/">
          <img src={stslogo} alt="oui"></img>
        </NavLink>

        <div className="menu-icon" onClick={toggleMenu}>
          <span>&#9776;</span>
        </div>

        {/* Conditional rendering based on menu visibility */}
        {menuVisible && (
          <nav className="menu">
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
        )}
      </div>
    </header>
  );
}
