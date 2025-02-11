import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for easier API handling

function MealList() {
  const [meals, setMeals] = useState([]); // State to store meals data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [mealCounts, setMealCounts] = useState({}); // Track meal quantities
  const [activeMeals, setActiveMeals] = useState([]); // Track active meals
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(8); // Number of items per page

  // Fetch meals data from an external API (TheMealDB in this case)
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='); 
        setMeals(response.data.meals);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch meals data');
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Toggle "On Menu" Button
  const handleAddToMenu = (mealId) => {
    setActiveMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId], // Toggle the state of the specific meal
    }));
  };

  const handleRemoveMeal = (mealId) => {
    setMealCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[mealId] > 0) {
        newCounts[mealId] -= 1;
      }
      return newCounts;
    });
  };

  // Increment Meal Count
  const handleAddMeal = (mealId) => {
    setMealCounts((prevCounts) => ({
      ...prevCounts,
      [mealId]: (prevCounts[mealId] || 0) + 1,
    }));
  };

  // Calculate the current meals to display
  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🍽️ Menu List</h2>
      
      <div className="grid md:grid-cols-4 bg-slate-300 gap-5 p-4">
        {currentMeals.map((meal) => (
          <div key={meal.idMeal} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
            <img 
              src={meal.strMealThumb || 'https://via.placeholder.com/150'} 
              alt={meal.strMeal} 
              className="w-full h-56 object-cover transition transform hover:scale-105"
            />
            <div className="p-4">
              <h5 className="text-lg font-bold text-gray-700 text-center">{meal.strMeal}</h5>

              <div className="grid-rows-2 items-center">
                {/* Add More Button */}
                <div className="flex justify-between items-center mb-2">
                  <button
                    className="rounded-xl hover:shadow-red-700 p-1 w-1/2 border border-red-100 text-black hover:shadow-inner transition"
                    onClick={() => handleRemoveMeal(meal.idMeal)}
                  >
                    - 
                  </button>
                  <p className='w-1/3 h-1/2 bg-white/90 text-center'>{mealCounts[meal.idMeal] || 0}</p>
                  <button
                    className="rounded-xl hover:shadow-white p-1 w-1/2 border border-lime-300 text-black hover:bg-blue-700 hover:shadow-inner transition"
                    onClick={() => handleAddMeal(meal.idMeal)}
                  >
                    +
                  </button>
                </div>

                {/* Toggle On Menu Button */}
                <button
                  className={`rounded-xl h-10 w-3/4 ml-6 transition-all duration-300 ${
                    activeMeals[meal.idMeal] ? "bg-red-400 text-wrap text-white" : "bg-blue-100 text-gray-800"
                  }`}
                  onClick={() => handleAddToMenu(meal.idMeal)}
                >
                  {activeMeals[meal.idMeal] ? <p>{mealCounts[meal.idMeal] || 0} {meal.strMeal} Dishes</p> : " Add to Menu"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(meals.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 mb-10 px-4  py-2 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default MealList;