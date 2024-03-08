import React from 'react';
import './About.css'; // Make sure to create an About.css file in the same directory
import videographic from '../img/videographic.mp4';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-hero">
        <h1>Empowering Sustainable Futures</h1>
      </div>

      {/* Our Commitment Section*/}
      <div className="commitment-section">
        <h2>Our Commitment to Sustainability</h2>
        <p>
          At FurnishU, we're dedicated to ensuring sustainable consumption and production patterns, aligning with the United Nations SDG 12.
        </p>
      </div>

      {/* The Challenge Section */}
      <div className="challenge-section">
        <h2>The Challenge</h2>
        <p>
          Each year, a staggering amount of furniture ends up in landfills. Our mission is to tackle this waste, one piece of furniture at a time.
        </p>
      </div>

      {/*Our Solution Section */}
      <div className="solution-section">
        <h2>Our Solution</h2>
        <ul>
          <li>A secure platform for university communities.</li>
          <li>Easy access to sustainable disposal options.</li>
          <li>A cost-free service that promotes furniture reuse.</li>
        </ul>
    </div>

      {/* Why FurnishU Section */}
      <div className="why-furnishu-section">
        <h2>Why FurnishU?</h2>
        <div className="pillars">
          <div className="pillar">
            <h3>Safety</h3>
            <p>A monitored platform for safe exchanges within university communities.</p>
          </div>
          <div className="pillar">
            <h3>Accessibility</h3>
            <p>Streamlining furniture exchange among students, removing the hassle.</p>
          </div>
          <div className="pillar">
            <h3>Affordability</h3>
            <p>Free listings to remove cost barriers associated with furniture disposal.</p>
          </div>
          <div className="pillar">
            <h3>Community Impact</h3>
            <p>Encouraging a cycle of furniture reuse for a sustainable future.</p>
          </div>
        </div>
      </div>

      {/* Impact Infographic Section */}
      <div className="impact-infographic-section">
      <h2>Why is recylcing furniture important?</h2>
        <video controls>
          <source src={videographic} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Call to Action Section */}
       <div className="cta-section">
        <h2>Join Our Effort</h2>
        <a href="https://www.unep.org/explore-topics/sustainable-development-goals/why-do-sustainable-development-goals-matter/goal-12">
    <button>Start Sharing</button>
  </a>
      </div> 

    </div>
  );
};

export default About;
