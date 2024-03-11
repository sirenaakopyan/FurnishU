import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './add-post.css';
import { initializeApp } from '../firebase.js';
import firebase, { database } from '../firebase.js';
import {ref} from 'firebase/database';
import {push} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEtk9vQlzGhlkrFEu40Ta2X4FkfPdCoEk",
  authDomain: "info-442-e7337.firebaseapp.com",
  projectId: "info-442-e7337",
  storageBucket: "info-442-e7337.appspot.com",
  messagingSenderId: "473881955858",
  appId: "1:473881955858:web:002a6822c0d7b2824ed2cb"
};

const Add_Post = () => {
  const [listingName, setListingName] = useState('');
  const [type, setType] = useState('Furniture');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('Used');
  const [image, setImage] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImage(files);
  };

  const handleSubmit = () => {
    const newPost = {
      listingName,
      type,
      description,
      location,
      condition,
      image: image.map((image) => image.name),
      contact,
    };

    // Push data to Firebase
    const listingsRef = ref(database, 'listings');
    push(listingsRef, newPost);

    console.log('Form submitted:', newPost);

      // Clear the form by resetting state values
    setListingName('');
    setType('furniture');
    setDescription('');
    setLocation('');
    setCondition('Used');
    setImage([]);
    setContact('');
  };

/*
const Add_Post = () => {
  const [listingName, setListingName] = useState('');
  const [type, setType] = useState('furniture');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState([]);

  /*
  const handleSubmit = () => {
    // Add your logic for handling the form submission here
    // const newPost = { listingName, type, description, image };
    console.log('Form submitted:', { listingName, type, description, image, location, contact });
    // Add_Post(newPost); // Call the addPost function to update the state in BrowsePage
  }; 

  const handleSubmit = () => {
    const newPost = {
      listingName,
      type,
      description,
      image: image.map((image) => image.name),
      location,
      contact,
    };

    // Push data to Firebase
    const databaseRef = firebase.database().ref('listings');
    databaseRef.push(newPost);

    console.log('Form submitted:', newPost);
  };

/*
  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (files) {
        setBusinessData((prevData) => ({
            ...prevData,
            [id]: files[0],
        }));
    } else {
        setBusinessData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
};
*/

  return (
    <div className="create-listing-container">
      <h2>Create a Listing</h2>
      <form>
        <div className="form-group">
          <label htmlFor="listingName">Listing Name:</label>
          <input
            type="text"
            id="listingName"
            value={listingName}
            onChange={(e) => setListingName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="Cookware">Cookware</option>
            <option value="Decor">Decor</option>
            <option value="Furniture">Furniture</option>
            <option value="Technology">Technology</option>
            <option value="Paraphernalia">Miscellaneous</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (max 1000 characters):</label>
          <textarea
            id="description"
            rows={5}
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <textarea
            id="location"
            rows={3}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Used">Used</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact"> Contact #:</label>
          <textarea
            id="contact"
            rows={1}
            maxLength={17}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Add_Post;