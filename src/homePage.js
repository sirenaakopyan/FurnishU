import Add_Post from './components/add-post.js';
// import { fetchListingsFromFirebase } from './firebase'; // Add the function to fetch data
import { ItemList, ItemCard, Filter } from './itemCard.js';
import  DynamicCard  from './dynamicCard.js';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

const HomePage = () => {
    const [cardData, setCardData] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [sortOption, setSortOption] = useState('name');

    useEffect(() => {

        const fetchData = async () => {
            const db = getDatabase();
            const itemListRef = ref(db, 'listings');

            try {
                const snapshot = await get(itemListRef);
                const itemData = [];

                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();

                    itemData.push({
                        condition: item.condition,
                        contact: item.contact,
                        description: item.description,
                        image: item.image,
                        listingName: item.listingName,
                        location: item.location,
                        type: item.type,
                    });
                  console.log(itemData);
                  });
                
                setCardData(itemData);
                setFilteredCards(itemData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const applyFilter = (value) => {
      if (value) {
        setFilteredCards(cardData.filter((card) => card.condition.toLowerCase() === value.toLowerCase()));
      } else {
        setFilteredCards(cardData);
      }
    };
  

    return (
        <div>
            <div className="front-page-header">
                <h1><b>Available Items</b></h1>
            </div>

            <Filter onFilterChange={applyFilter} clearFilter={() => applyFilter('')} />

            <div className="article-display">
                {filteredCards.length === 0 ? (
                    <p id='no-results'>No results found.</p>
                ) : (
                    <>
                        {filteredCards.map((card, index) => (
                            <DynamicCard 
                            key={index}
                            condition={card.condition}
                            contact = {card.contact}
                            description = {card.description}
                            image = {card.image}
                            listingName = {card.listingName}
                            location = {card.location}
                            type = {card.type}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export { HomePage };

function ParentComponent(props) {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (value) => {
    setFilterValue(value);
    // Add your logic to update the filtered items in the parent component
  };

  const handleClearFilter = () => {
    setFilterValue('');
    // Add your logic to clear the filters in the parent component
  };

  return (
    <div>
      <ItemList
        furni={props.furniData.condition}
        claim={props.claim} 
        onFilterChange={handleFilterChange}
        clearFilter={handleClearFilter}
      />
    </div>
  );
}
export default ParentComponent;