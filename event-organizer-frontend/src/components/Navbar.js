import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaBell, FaLanguage } from 'react-icons/fa'; 
import logo from "./logo.png";
import axios from 'axios';


const Navbar = ({ isUserLoggedIn }) => {
  const userName = localStorage.getItem('user_name');
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    delete axios.defaults.headers.common['Authorization'];
 

    console.log("Logged out");

    navigate("/");
  };

  return (
    <header className="header_area">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="navbar-content">
              <div className="navbar-left">
                <Link to="/" className="navbar-brand logo_h">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            
              <div className="navbar-center">
                <h1>
                  {localStorage.getItem("auth_token") ? `Welcome ${userName}` : "Please Log In"}
                </h1>
              </div>

              <div className="navbar-right">
              {localStorage.getItem("auth_token") && ( 

                <li className="nav-item">
                  
                
                <button className="nav-link" onClick={handleLogOut}>
                    Log Out
                  </button>
              </li>
               )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;