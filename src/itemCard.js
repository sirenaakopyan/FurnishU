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
import './itemCard.css';

//get a reference to the database service
const db = getDatabase();

// referencing each of the values in the firebase database
const conditionRef = ref(db, "condition")
const contactRef = ref(db, "contact")
const descriptionRef = ref(db, "description")
// const imageRef = ref(db, "image") --> image will be different
const listingNameRef = ref(db, "listingName")
const locationRef = ref(db, "location")
const typeRef = ref(db, "type")

function ItemCard(props) {
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

  const [showModal, setShowModal] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unregister = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unregister();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // come back to this code chunk
  const handleClaimClick = (event) => {
    event.stopPropagation();
    if (!isClaimed && user) {
      setIsClaimed(true);
      props.claim(props.furniData.listingName);
    } else if (!user) {
      alert("Please sign in");
    }
  };

  return (
    <div className="d-flex">
      <div className="card" onClick={() => !isClaimed && toggleModal()}>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <img src={imageMapping[props.furniData.image]} className="card-img" alt={props.furniData.listingName} />
            </div>
            <div className="col">
              <h4 className="card-title">
                {props.furniData.listingName}
                {isClaimed ? ' (Claimed)' : ''}
              </h4>
              <h3 className="text-muted">{props.furniData.location}</h3>
              <p className="card-text">{props.furniData.description}</p>
              <p className="card-text">Contact: {props.furniData.contact}</p>
              <div
                className={`btn btn-dark blue-btn ${isClaimed ? 'claimed' : ''}`}
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
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal">
            <span className="close" onClick={toggleModal}>&times;</span>
            <div className="modal-content">
              <img src={imageMapping[props.furniData.image]} className="card-img pb-3" alt={props.furniData.name} />
              <div className="text-content">
                <h2 className="card-title">{props.furniData.listingName}</h2>
                <h3 className="text-muted">{props.furniData.location}</h3>
                <p className="card-text">{props.furniData.description}</p>
              </div>
              {/* Add your comments section here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
  }

  // Filter items based on the selected condition
  const filteredItems = selected
    ? props.furni.filter((item) => item.condition === selected)
    : props.furni;

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
          <ItemCard key={item.listingName} furniData={item} claim={props.claim} />
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

