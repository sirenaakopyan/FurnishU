import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (    
      <Router>
        <div className="gradient-background">
          <div className='App'>
            <Navbar/>
            <Routes>
              <Route path="/about" element={<About />} />
              {/* Home
              page1
              page2 */}
              </Routes>
              {/* The rest of your app components */}
            </div>
        </div>
      </Router>
  );
}

export default App;