import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './LandingPage.css'; // Ensure you have the CSS for styling

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to FurnishU</h1>
        <p>Find the perfect furniture to make your house a home.</p>
        {!isLoggedIn && (
          <Link to="/signup" className="btn-signup">Sign Up Now</Link>
        )}
        <Link to="/browse" className="btn-browse">Browse Collection</Link>
      </header>
    </div>
  );
};

export default LandingPage;
