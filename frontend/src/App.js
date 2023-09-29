import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import MonstresList from "./components/MonstresList";
import CreateMonster from "./components/CreateMonster";
import Combat from "./pages/Combat";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Combat />} />
        <Route path="/monstres" element={<MonstresList />} />
        <Route path="/createmonster" element={<CreateMonster />} />
      </Routes>
    </div>
  );
};

export default App;
