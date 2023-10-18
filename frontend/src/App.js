import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import Combat from "./pages/Combat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CardCreationPage from "./pages/CardCreation";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Combat /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/createcard" element={<CardCreationPage />} />
      </Routes>
    </div>
  );
};

export default App;
