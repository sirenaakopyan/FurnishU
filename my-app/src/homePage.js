import React, { useState, useEffect } from 'react';
import { ItemList, Filter } from './itemCard.js';
import { getDatabase, ref as dbRef, set as firebaseSet, get, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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