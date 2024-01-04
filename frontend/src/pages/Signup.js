import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../CSS/User.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Nouveau jeu</h3>
      <label>Email</label>
      {/* e.target.value :
    e est l'event. target est l'input. value est la valeur de ce qui est rentré par l'user */}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password</label>
      {/* e.target.value :
    e est l'event. target est l'input. value est la valeur de ce qui est rentré par l'user */}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <p>
        Le mot de passe doit contenir : 3 caractères en minuscules, 3 caractères
        en majuscules, 3 chiffres et un caractère spécial. Ex: abcABC123!
      </p>
      {/* disabled={isLoading} parce qu'on ne veut pas envoyer de nouvelle requête tant qu'il y a le chargement d'une autre */}
      <button disabled={isLoading}>Commencer à jouer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
