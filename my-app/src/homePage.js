import React, { useState, useEffect } from 'react';
import { ItemList, Filter } from './itemCard.js';
import Add_Post from './components/add-post.js';
import { getDatabase, ref as dbRef, set as firebaseSet, get, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { fetchListingsFromFirebase } from './firebase'; // Add the function to fetch data

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
      {/* ... other components */}
      <ItemList
        furni={props.furniData.condition}
        claim={props.claim} 
        onFilterChange={handleFilterChange}
        clearFilter={handleClearFilter}
      />
      {/* ... other components */}
    </div>
  );
}

export default ParentComponent;

function HomePage(props) {
/*
  const HomePage = () => {
    const [listings, setListings] = useState([]);
  
    // Fetch listings from Firebase on component mount
    useEffect(() => {
      const fetchListings = async () => {
        try {
          const firebaseListings = await fetchListingsFromFirebase();
          setListings(firebaseListings);
        } catch (error) {
          console.error('Error fetching listings from Firebase:', error.message);
        }
      };
  
      fetchListings();
    }, []); // Empty dependency array means this effect runs only once on mount
  
    const addListing = (newListing) => {
      setListings((prevListings) => [...prevListings, newListing]);
    };
*/
    return (
      <div>
        <main>
          <div className='container'>
            <div className='row'>
            <ItemList furni={props.furni} claim={props.claim} ></ItemList> 
            </div>
          </div>
        </main>
      </div>
    );
  }

export { HomePage };