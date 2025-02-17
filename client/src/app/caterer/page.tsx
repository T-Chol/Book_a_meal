// client/src/app/caterer/page.tsx
"use client";

import withAuth from "../hoc/withAuth";
import { useMenu } from "../context/menu";
import ChefHeader from "../components/cheffHeader";

function Caterer() {
  const { meals, loading, error } = useMenu();
  const price = "Ksh 5000";
  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ChefHeader />
      <h2 className="text-3xl font-bold text-center bg-slate-300 text-gray-800 ">🍽️ Available Meals</h2>

      <div className="grid md:grid-cols-3 bg-slate-100  gap-5">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="bg-white shadow-2xl grid grid-cols-2 rounded-md p-2 relative">

            <div className=" grid grid-rows-3 p-2">
              <h5 className="text-lg font-bold pt-2 text-black text-center">{meal.strMeal}</h5>
              <p className=" font-serif font-thin text-gray-600">{meal.strCategory} - {meal.strArea}</p>
              <p className=" font-serif font-thin text-gray-900">{price}</p>
            </div>
            <img
              src={meal.strMealThumb || "https://via.placeholder.com/150"}
              alt={meal.strMeal}
              className="w-full h-full p-2 hover:opacity-55"
            />
                    <button className="absolute bottom-2 right-2 bg-white/70  bg-gray-200 rounded-tl-[50%] m-3 h-24 w-24 shadow-md">
          <span className="text-lg font-bold"><svg
          className="place-self-center"
  width="40" 
  height="40" 
  viewBox="0 0 50 50" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="25" cy="25" r="24" fill="#0B0D17" stroke="white" stroke-width="2" />
  <line x1="25" y1="15" x2="25" y2="35" stroke="white" stroke-width="4" stroke-linecap="round" />
  <line x1="15" y1="25" x2="35" y2="25" stroke="white" stroke-width="4" stroke-linecap="round" />
</svg>

</span>
        </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default withAuth(Caterer, "caterer");


