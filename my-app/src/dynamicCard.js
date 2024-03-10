import React, { useState } from 'react';
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

    console.log("Image Mapping Debugging:", imageMapping);
    console.log("Current Image:", image);
    console.log("Mapped Image:", imageMapping[image]);
    console.log("Listing Name:", listingName);

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
                            <p className="image">{cardData.image}</p>
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

const CardListing = ({ cardData }) => {
    return (
        <div className="row">
            {cardData.map((listing, index) => (
                <DynamicCard key={index} {...listing} />
            ))}
        </div>
    );
};

export {CardListing};