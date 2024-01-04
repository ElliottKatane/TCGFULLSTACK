import React from "react";
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

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={stslogo} alt="logo slay the spire"></img>
        </NavLink>
        <Link to="/rules">Règles du jeu</Link>

        <nav>
          {/* if user is logged in, show email and logout button */}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
