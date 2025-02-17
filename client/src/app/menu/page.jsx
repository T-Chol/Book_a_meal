"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Header from "../components/header";

// ✅ Dynamically import with preloading
const LazyMealCard = dynamic(() => import("../components/MealCard"), {
  loading: () => <p className="text-center text-gray-600">Loading...</p>,
  ssr: false, // Only load on client
});

function MenuPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMeal, setHoveredMeal] = useState(null);
  const [likedMeals, setLikedMeals] = useState({});

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        setMeals(response.data.meals || []);
      } catch (err) {
        setError("Failed to fetch meals data");
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
          <p className="text-center text-red-600">{error}</p>
        ) : (
          meals.map((meal) => (
            <Suspense key={meal.idMeal} fallback={<p>Loading meal...</p>}>
              <LazyMealCard
                meal={meal}
                hoveredMeal={hoveredMeal}
                setHoveredMeal={setHoveredMeal}
                likedMeals={likedMeals}
                handleToggleHeart={handleToggleHeart}
              />
            </Suspense>
          ))
        )}
      </div>
    </>
  );
}

export default MenuPage;
