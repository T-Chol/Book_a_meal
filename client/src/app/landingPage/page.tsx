import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import './LandingPage.css';

const LandingPage = () => {
  // const navigate = useNavigate();

  // const handleBookNow = () => {
  //   navigate('/meal-list'); // Navigate to the meal list page
  // };

  const specialMeals = [
    { id: 1, name: 'Beef with Rice', description: 'Delicious beef with steamed rice.' },
    { id: 2, name: 'Chicken with Fries', description: 'Crispy chicken with fries.' },
  ];

  return (<>
  
    <Header />
    <div className="landing-page">
    <div className="relative w-full h-screen bg-cover bg-center">
  {/* Background Image */}
  <img
    src="./new.png"
    alt="Welcome to Book A Meal"
    className="absolute m-auto mt-2 inset-0 w-11/12 h-screen object-center opacity-100" // Background image with reduced opacity
  />
  
  {/* Frosted Glass Effect (overlay) */}
  <div className="absolute inset-0 h-full backdrop-blur-sm"></div>

  {/* Content on top */}
  <div className="relative max-w-sm pt-5 h-60 ml-auto mr-60 bg-teal-500 text-white  rounded-3xl shadow-lg z-10"> 
  <h1 className="text-3xl font-bold mb-2 ">Welcome to Book a Meal!</h1>
  <div className=' border border-white w-full'></div>
  <h2 className="text-xl font-semibold mb-4">Your Time, Your Meal, Your Way.</h2>
  <div className=' border border-white w-full'></div>

  <p className="text-base leading-relaxed">
    Tired of waiting to place your order after sitting at a restaurant? With
    Book a Meal, you can book your meal right from your device while waiting
    to be seated or as soon as you arrive.
  </p>
  </div>
  <button className="absolute bg-amber-500 z-10 mt-8 text-start pl-4 text-white shadow-lg w-40 h-12 rounded-3xl ml-80">
  Book Now →
</button>


  {/* <div className="relative z-10 text-center text-white py-40">
    <h1 className="text-5xl ml-72 font-bold">Welcome to Book A Meal</h1>
    <p className="text-xl ml-72 mt-4">Delicious meals delivered to your door</p>
  </div> */}
</div>


      <div className="special-meals">
        <h2>Discover Today's Special: A Unique Dining Experience With Fast Service</h2>
        <div className="meal-list">
          {specialMeals.map((meal) => (
            <div className="meal-card" key={meal.id}>
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
            </div>
          ))}
        </div>
      </div>
      <hr/>
      <section className="testimonials">
        <h2>What Our Customers Are Saying</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <p className="testimonial-text">"The best meal I've ever had! The flavors were exquisite and the service was top-notch!"</p>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="customer-name">Gavin Lee</p>
          </div>

          <div className="testimonial">
            <p className="testimonial-text">"A fantastic experience! The ambiance and food were incredible. Highly recommend!"</p>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="customer-name">Samantha L</p>
          </div>

          <div className="testimonial">
            <p className="testimonial-text">"Delicious food and friendly staff. I'll definitely be coming back for more!"</p>
            <div className="rating">
              <span>⭐⭐⭐⭐</span>
            </div>
            <p className="customer-name">Jimmy Y</p>
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default LandingPage;
