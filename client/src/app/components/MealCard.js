"use client";
import Image from "next/image";

const MealCard = ({ meal, hoveredMeal, setHoveredMeal, likedMeals, handleToggleHeart }) => {
  return (
    <div key={meal.idMeal} className="bg-white shadow-2xl grid grid-cols-2 rounded-md p-2 relative">
      <div className="grid grid-rows-5 text-center p-2">
        <h5 className="text-lg font-bold pt-2 text-black text-center">{meal.strMeal}</h5>
        <p className="font-serif font-thin text-gray-600">
          {meal.strCategory} - {meal.strArea}
        </p>
      </div>
      <Image
        src={meal.strMealThumb || "https://via.placeholder.com/150"}
        alt={meal.strMeal}
        className="w-full h-full p-2 hover:opacity-55"
      />
      <button
        className="absolute bottom-2 right-2 bg-white/70 bg-gray-200 rounded-tl-[50%] m-3 h-24 w-24 shadow-md"
        onMouseEnter={() => setHoveredMeal(meal.idMeal)}
        onMouseLeave={() => setHoveredMeal(null)}
        onClick={() => handleToggleHeart(meal.idMeal)}
      >
        <span className="transition-transform duration-500 ease-in-out">
          {likedMeals[meal.idMeal] || hoveredMeal === meal.idMeal ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="red">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="24" fill="#0B0D17" stroke="white" strokeWidth="2" />
              <line x1="25" y1="15" x2="25" y2="35" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <line x1="15" y1="25" x2="35" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default MealCard;
