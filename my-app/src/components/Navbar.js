import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create a corresponding CSS file for styling
import logo from './logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {
           <img src={logo} alt="FurnishU Logo" className="navbar-logo-img" />
        }
        <Link to="/" className="navbar-logo-text">FurnishU</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/browse">Browse</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
