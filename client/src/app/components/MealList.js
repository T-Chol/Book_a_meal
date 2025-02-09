// // src/components/MealList.js
// import React from 'react';
// import MealCard from './MealCard';

// const MealList = ({ meals }) => {
//   return (
//     <div className="meal-list">
//       {meals.map((meal) => (
//         <MealCard key={meal.id} meal={meal} />
//       ))}
//     </div>
//   );
// };

// export default MealList;


// TO SELECT
// src/components/MealList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for easier API handling

// function MealList({ handleAddToOrder }) {
//   const [meals, setMeals] = useState([]); // State to store meals data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch meals data from an external API (TheMealDB in this case)
//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='); // Fetch all meals
//         setMeals(response.data.meals); // Update meals state with fetched data
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (err) {
//         setError('Failed to fetch meals data');
//         setLoading(false);
//       }
//     };

//     fetchMeals(); // Call the function to fetch meals
//   }, []); // Empty array means the effect runs once after the initial render

//   if (loading) {
//     return <p>Loading menu...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2>Menu List</h2>
//       <div className="row">
//         {meals.map((meal) => (
//           <div className="col-md-4" key={meal.idMeal}>
//             <div className="card">
//               <img 
//                 src={meal.strMealThumb || 'https://via.placeholder.com/150'} 
//                 className="card-img-top" 
//                 alt={meal.strMeal} 
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{meal.strMeal}</h5>
//                 <p className="card-text">{meal.strInstructions.substring(0, 100)}...</p>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleAddToOrder(meal)}
//                 >
//                   Add to My Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MealList;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for easier API handling

function MealList({ handleAddToOrder }) {
  const [meals, setMeals] = useState([]); // State to store meals data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch meals data from an external API (TheMealDB in this case)
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='); // Fetch all meals
        setMeals(response.data.meals); // Update meals state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError('Failed to fetch meals data');
        setLoading(false);
      }
    };

    fetchMeals(); // Call the function to fetch meals
  }, []); // Empty array means the effect runs once after the initial render

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Menu List</h2>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-4 mb-4" key={meal.idMeal}>
            <div className="card h-100">
              <img 
                src={meal.strMealThumb || 'https://via.placeholder.com/150'} 
                className="card-img-top" 
                alt={meal.strMeal} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{meal.strMeal}</h5>
                <p className="card-text">{meal.strInstructions.substring(0, 100)}...</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleAddToOrder(meal)} // Call handleAddToOrder with the selected meal
                >
                  Add to My Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealList;