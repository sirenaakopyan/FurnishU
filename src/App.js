import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx'; 
import Add_Post from './components/add-post.js';
import LandingPage from './components/LandingPage.jsx';
import { Footer } from './footer.js';
import { HomePage } from './homePage.js';
import SAMPLE_Furni from './data/furnData.json'; 





function App() {
  return (    
      <Router>
        <div className="gradient-background">
          <div className='App'>
            <Navbar/>
            <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/add-post" element={<Add_Post />} />
              <Route path="/browse" element={<HomePage furni={SAMPLE_Furni} />} />

              {/* Home
              page1
              page2 */}
              </Routes>
              <footer>
        <Footer />
      </footer>
              {/* The rest of your app components */}
            </div>
        </div>
      </Router>
  );
}

export default App;