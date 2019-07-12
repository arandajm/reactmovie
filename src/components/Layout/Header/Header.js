import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <img
          className="rmdb-logo"
          src="./images/reactMovie_logo.png"
          alt="reactMovie_logo"
        />
        <img
          className="rmdb-tmdb-logo"
          src="./images/tmdb_logo.png"
          alt="tmdb_logo"
        />
      </div>
    </div>
  );
}
