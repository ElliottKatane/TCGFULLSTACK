// Map.js
import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Map.css"
const Map = () => {

  return (
    <div className="mapStyle">

      <Link to="/combat/1" className="map-button button-1">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/2" className="map-button button-2">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/3" className="map-button button-3">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/4" className="map-button button-4">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/5" className="map-button button-5">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/6" className="map-button button-6">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/7" className="map-button button-7">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/8" className="map-button button-8">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/9" className="map-button button-9">
      <i className="fa fa-flag"></i>
      </Link>
      <Link to="/combat/10" className="map-button button-10">
      <i className="fa fa-skull-crossbones"></i>
      </Link>
    </div>
  );
};

export default Map;
