import React, { useState, useEffect } from 'react';
import  ItemList  from './itemCard.js';
// import {Filter, FilterType} from './filter.js';
import { getDatabase, ref as dbRef, set as firebaseSet, get, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function HomePage(props) {
    return (
      <div>
        <main>
          <div className='container'>
            <div className='row'>
              <ItemList furni={props.furni} ></ItemList>
            </div>
          </div>
        </main>
      </div>
    );
}
  
export { HomePage };