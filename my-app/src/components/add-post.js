import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './add-post.css';

const Add_Post = () => {
  const [listingName, setListingName] = useState('');
  const [category, setCategory] = useState('furniture');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    // Limit the number of uploaded photos to 5
    const files = Array.from(e.target.files).slice(0, 5);
    setPhotos(files);
  };

  const handleSubmit = () => {
    // Add your logic for handling the form submission here
    console.log('Form submitted:', { listingName, category, description, photos });
  };

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
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="furniture">Household Appliances</option>
            <option value="furniture">Paraphernalia</option>
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
          <label htmlFor="photos">Upload up to five photos:</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Location:</label>
          <textarea
            id="location"
            rows={3}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
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