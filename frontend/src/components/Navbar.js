import React from "react";
import stslogo from "../assets/stslogo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
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
        <Link to="/rules">Règles du jeu</Link>

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
