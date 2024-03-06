import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

  const handleClaimClick = (event) => {
    event.stopPropagation();
    if (!isClaimed && user) {
      setIsClaimed(true);
      props.claim(props.furniData.name);
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
              <img src={imageMapping[props.furniData.image]} className="card-img" alt={props.furniData.name} />
            </div>
            <div className="col">
              <h4 className="card-title">
                {props.furniData.name}
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
                <h2 className="card-title">{props.furniData.name}</h2>
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

function ItemList(props) {
  const [selected, setSelected] = useState('');

  const handleSelected = (event) => {
    setSelected(event.target.value);
    // Add logic to filter items based on the selected condition
  };

  const clear = () => {
    setSelected('');
    // Add logic to clear filters
  };

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
          <option value="Fair">Fair</option>
        </select>
        <button className="filter-button" onClick={clear}>
          Clear Filters
        </button>
      </div>
      <div className="row">
        {props.furni.map((item) => (
          <ItemCard key={item.name} furniData={item} claim={props.claim} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
