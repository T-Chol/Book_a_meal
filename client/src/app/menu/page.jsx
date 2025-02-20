// client/src/app/menu/page.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Header from "../components/header";

// ✅ Dynamically import MealCard (only loads on client)
const LazyMealCard = dynamic(() => import("../components/MealCard"), {
  loading: () => <p className="text-center text-gray-600">Loading...</p>,
  ssr: false,
});

function MenuPage() {
  const API_URL = process.env.NEXT_PUBLIC_MEALS_API || "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMeal, setHoveredMeal] = useState(null);
  const [likedMeals, setLikedMeals] = useState({});

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(API_URL);
        setMeals(response.data.meals || []);
      } catch (err) {
        console.error("API Error:", err.message);
        setError("Failed to fetch meals. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleToggleHeart = (mealId) => {
    setLikedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }));
  };

  return (
    <>
      <Header />
      <h2 className="text-3xl font-bold text-center bg-slate-300 text-gray-800">🍽️ Available Meals</h2>

      <div className="grid md:grid-cols-3 bg-slate-100 gap-5">
        {loading ? (
          <p className="text-center text-gray-600">Loading meals...</p>
        ) : error ? (
          <>
          <p className="text-center text-red-600">{error}</p>
          <button
          onClick={fetchMeals}
          className="block mx-auto bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
        >
          Retry
        </button></>
        ) : (
          meals.map((meal) => (
            <LazyMealCard
              key={meal.idMeal}
              meal={meal}
              hoveredMeal={hoveredMeal}
              setHoveredMeal={setHoveredMeal}
              likedMeals={likedMeals}
              handleToggleHeart={handleToggleHeart}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MenuPage;
