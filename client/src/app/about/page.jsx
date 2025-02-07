import React from 'react';
import './about.css';
import Header from '../components/Header';
import BottomNav from '../components/bottomNav.js';

const AboutUs = () => {
  return (
    <>
    <Header />
    <div className="about px-16 pt-18 "> 
      <header>
        <h1>About Us</h1>
        <h2>Discover who we are and what makes us exceptional</h2>
      </header>

      <section className="about-content">
        {/* Who We Are */}
        <div className="about-block">
          <img
            src="https://i.pinimg.com/236x/c0/42/b9/c042b98be24dbc5df09894270a7508c0.jpg"
            alt="Our Mission"
          />
          <div className="description">
            <h2>Who We Are</h2>
            <p>
              Book-A-Meal is a dynamic and user-friendly platform dedicated to revolutionizing the way you experience dining. 
              Whether you're a customer looking to explore curated menus or a caterer striving to optimize meal management, 
              we serve as the perfect partner in your culinary journey.
            </p>
            <p>
              From offering personalized meal suggestions to supporting large-scale catering services, we aim to be at the forefront 
              of innovation in the food industry. With a passionate team, state-of-the-art technology, and a commitment to customer satisfaction, 
              we connect people to the food they love while empowering chefs and caterers to succeed.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="about-block">
          <div className="description">
            <h2>Our Mission</h2>
            <p>
              Our mission is to create a seamless and delightful dining experience for everyone, everywhere. We aim to bridge the gap between 
              food lovers and chefs by leveraging technology, creativity, and a deep understanding of customer needs. 
            </p>
            <p>
              By focusing on convenience, quality, and innovation, we strive to:
            </p>
            <ul>
              <li>Enable customers to enjoy hassle-free meal ordering and delivery.</li>
              <li>Empower caterers and chefs with efficient tools to manage their services.</li>
              <li>Foster a community that celebrates culinary creativity and diversity.</li>
            </ul>
            <p>
              With Book-A-Meal, every dish tells a story, and every experience is designed to exceed expectations. 
              Together, we make dining extraordinary.
            </p>
          </div>
          <img
            src="https://i.pinimg.com/736x/65/46/8d/65468d94a94a535c71f3c18a563022aa.jpg"
            alt="Our Mission"
          />
        </div>

        {/* Explore More Button */}
        <div>
          <a href="/menu" className="explore-button">Explore Our Menu</a>
        </div>
        <BottomNav />

      </section>
      
    </div>
    </>
  );
};

export default AboutUs;
