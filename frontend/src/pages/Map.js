// Map.js
import React from "react";
import { Link } from "react-router-dom";

const Map = () => {
  return (
    <div>
      <Link to="/combat/1">Load Level 1</Link>
      <Link to="/combat/2">Load Level 2</Link>
      {/* Add more links for other levels */}
    </div>
  );
};

export default Map;
