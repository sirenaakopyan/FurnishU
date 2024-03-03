import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase';
// import { getAuth, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import './Navbar.css'; // Make sure to create a corresponding CSS file for styling
import logo from './logo.svg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const auth = getAuth(); // Make sure to initialize this correctly if needed
      // Listener for authentication state
      const unsubscribe = auth.onAuthStateChanged(user => {
          setIsLoggedIn(!!user);
      });
      return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth(app));
      console.log('User logged out successfully');
      navigate('/'); // or wherever you want to redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="FurnishU Logo" className="navbar-logo-img" />
        <Link to="/" className="navbar-logo-text">FurnishU</Link>
      </div>
        <ul className="navbar-links">
          <li>
            <Link to="/browse" className="active">Browse</Link>
          </li>
          <li>
            <Link to="/add-post">Post</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>


        {isLoggedIn ? (
          <>
            {/* Show "Add Post" link only if the user is logged in */}
            <li>
              <Link to="/add-post">Add Post</Link>
            </li>
            {/* Optionally, add a "Logout" link if the user is logged in */}
            <li>
                {/* Changed from Link to button */}
                {/* <button onClick={handleLogout} className="signup-button">Logout</button> */}
                <button onClick={handleLogout} className="signup-button">Logout</button>
           </li>
          </>
        ) : (
          <>
            {/* Show "Login" and "Sign Up" links if the user isn't logged in */}
            {/* <li>
              <Link to="/auth">Login</Link>
            </li> */}
            <li>
              <Link to="/signup" className="signup-button">Sign Up</Link>
            </li>
          </>
        )}


        </ul>
      </nav>
    </div>
  );
};


export default Navbar;
