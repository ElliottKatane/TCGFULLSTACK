import React from "react";
import stslogo from "../assets/stslogo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  // hooks import
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">Combat</Link>
        <Link to="/rules">Règles du jeu</Link>
        <NavLink className="navbar-brand" to="/">
          <img style={{ width: "25%" }} src={stslogo} alt="oui"></img>
        </NavLink>
        <nav>
          {/* if user is logged in, show email and logout button */}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">S'identifier</Link>
              <Link to="/signup">S'enregistrer</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
