import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(`/`);
  };

  return (
    <div className="navbar">
      <div className="logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Navbar;
