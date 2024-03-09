import React from 'react';

const DynamicCard = ({ condition, contact, description, image, name, location, type, listingName }) => {
    const cardData = { 
        condition,
        contact, 
        description, 
        image, 
        name,
        listingName, 
        location, 
        type,  
    };

    return (
        <div>
            <div>
                <p className="name">Name: {cardData.name}</p>
                <p className="condition">Condition: {cardData.condition}</p>
                <p className="contact">Contact: {cardData.contact}</p>
                <p className="location">Location: {cardData.location}</p>
                <p className="description">Description: {cardData.description}</p>
                <p className="type">Type: {cardData.type}</p>

                <p className="image">{cardData.image}</p>
            </div>
        </div>
    );
};

export default DynamicCard;