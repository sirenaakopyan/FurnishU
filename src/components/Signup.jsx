// src/SignUp.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import app from '../firebase';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
        await createUserWithEmailAndPassword(getAuth(app), email, password);
        console.log('User account created & signed in!');
        setEmail('');
        setPassword('');
        // Redirect to your desired page after successful sign up
        navigate('/browse');
    } catch (error) {
        setError("Failed to create an account: " + error.message);
    }
    };

    return (
        <div className="signup-container">
          <h2 className="signup-header">Join the FurnishU Family</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
    };

export default Signup;
