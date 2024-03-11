import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase, { database } from './firebase.js';
import {ref, child, push, getDatabase, onValue } from 'firebase/database';
import deskChairImage from './img/deskchair.jpg';
import greyCouchImage from './img/greycouch.jpg';
import riceCookerImage from './img/ricecooker.jpg';
import floorlampImage from './img/floorlamp.jpg';
import roundmirrorImage from './img/roundmirror.jpg';
import platesImage from './img/plates.jpg';
import plantsImage from './img/plants.jpg';
import tvImage from './img/tv.jpg';
import bedframeImage from './img/bedframe.jpg';
import deskImage from './img/desk.jpg';
import browncouchImage from './img/browncouch.jpg';
import './dynamicCard.css';

const imageMapping = {
    deskChair: deskChairImage,
    greyCouch: greyCouchImage,
    riceCooker: riceCookerImage,
    floorlamp: floorlampImage,
    roundmirror: roundmirrorImage,
    plates: platesImage,
    plants: plantsImage,
    tv: tvImage,
    bedframe: bedframeImage,
    desk: deskImage,
    browncouch: browncouchImage,
};


const DynamicCard = ({ condition, contact, description, image, location, type, listingName }) => {
    const cardData = { 
        condition,
        contact, 
        description, 
        image,  
        location, 
        type,
        listingName
    };
    
    const [isClaimed, setIsClaimed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleClaimClick = (event) => {
        event.stopPropagation();
        if (!isClaimed) {
            setIsClaimed(true);
            // Handle the claim logic if needed
        }
    };

    return (
        <div className="dynamic-card" onClick={() => !isClaimed && toggleModal()}>
            <div className="dynamic-card-body">
                <div className="row">
                    <div className="col">
                    <img className="dynamic-card-img" src={imageMapping[image]} alt={listingName} />
                    </div>
                    <div className="col">
                        <h4 className="dynamic-card-title">
                            {cardData.listingName}
                            {isClaimed ? ' (Claimed)' : ''}
                        </h4>
                            <p className="condition">Condition: {cardData.condition}</p>
                            <p className="contact">Contact: {cardData.contact}</p>
                            <p className="location">Location: {cardData.location}</p>
                            <p className="description">Description: {cardData.description}</p>
                            <p className="type">Type: {cardData.type}</p>
                        <div
                            className={`dynamic-blue-btn ${isClaimed ? 'claimed' : ''}`}
                            onClick={handleClaimClick}
                            style={{
                                pointerEvents: isClaimed ? 'none' : 'auto',
                                backgroundColor: isClaimed ? 'gray' : '',
                            }}
                        >
                            {isClaimed ? 'Claimed' : 'Claim It!'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicCard;

const CardListing = ({ cardData, filterCondition }) => {
    // Filter items based on the selected condition
    const filteredItems = filterCondition
      ? cardData.filter((item) => item.condition.toLowerCase() === filterCondition.toLowerCase())
      : cardData;
  
    return (
      <div className="row">
        {filteredItems.map((listing, index) => (
          <DynamicCard key={index} {...listing} />
        ))}
      </div>
    );
  };

export { CardListing };

export function ItemList(props) {
    const [selected, setSelected] = useState('');
    const [listings, setListings] = useState([]);
  
    useEffect(() => {
      const auth = getAuth();
      const authUnsubscribe = onAuthStateChanged(auth, (user) => {
        // You can add logic here to update the UI based on the user's authentication status
      });
  
      const database = getDatabase();
      const listingsRef = ref(database, 'listings');
  
      const listingsUnsubscribe = onValue(listingsRef, (snapshot) => {
        if (snapshot.exists()) {
          const listingsData = snapshot.val();
          const listingsArray = Object.values(listingsData);
          setListings(listingsArray);
        }
      });
  
      return () => {
        authUnsubscribe();
        listingsUnsubscribe();
      };
    }, []);
  
    const handleSelected = (event) => {
      const selectedValue = event.target.value;
      setSelected(selectedValue);
      // Ensure onFilterChange is a function before calling it
      if (typeof props.onFilterChange === 'function') {
        props.onFilterChange(selectedValue);
      } else {
        console.error('onFilterChange is not a function');
      }
    };
  
    const clear = () => {
      setSelected('');
      if (typeof props.clearFilter === 'function') {
        props.clearFilter();
      } else {
        console.error('clearFilter is not a function');
      }
    };
  
    // Filter items based on the selected condition
    const filteredItems = selected
      ? listings.filter((item) => item.condition.toLowerCase() === selected.toLowerCase())
      : listings;
  
    return (
      <div>
        <div className="filter-condition">
          <label htmlFor="filtercondition">Filter Item Condition</label>
          <select
            id="filtercondition"
            name="filtercondition"
            value={selected}
            onChange={handleSelected}
          >
            <option value="" disabled>
              Select condition
            </option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Used">Used</option>
          </select>
          <button className="filter-button" onClick={clear}>
            Clear Filters
          </button>
        </div>
        <div className="row">
          {filteredItems.map((item) => (
            <DynamicCard key={item.listingName} {...item} claim={props.claim} />
          ))}
        </div>
      </div>
    );
  }
  
  export function Filter(props) {
    const [selected, setSelected] = useState('');
  
    function handleSelected(e) {
      const selectedValue = e.target.value;
      setSelected(selectedValue);
      // this is what makes it so that when filter is changed, automatically filters the correct 'cards'
      props.onFilterChange(selectedValue);
    }
  
    function clear() {
      setSelected('');
      props.clearFilter();
    }
  
    return (
      <div className="filter-condition">
        <label htmlFor="filtercondition">Filter Item Condition</label>
        <select
          id="filtercondition"
          name="filtercondition"
          value={selected}
          onChange={handleSelected}
        >
          <option value="" disabled>
            Select condition
          </option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Used">Used</option>
        </select>
        <button className="filter-button" onClick={clear}>
          Clear Filters
        </button>
      </div>
    );
  }