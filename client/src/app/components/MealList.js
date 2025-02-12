// export default MealList;
import React, { useState } from "react";
import { useMenu } from "../context/menu";

function MealList() {
    const [edit, setEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const { 
        meals, 
        loading, 
        error, 
        mealCounts, 
        activeMeals, 
        setMealCounts, 
        setActiveMeals, 
        updateMenu 
    } = useMenu();

    const handleCreateMenu = () => {
        if (edit) {
            const selectedMeals = Object.keys(activeMeals).filter((mealId) => activeMeals[mealId]);
            if (selectedMeals.length === 0) {
                alert("No meals selected.");
                return;
            }
            updateMenu(selectedMeals, meals, mealCounts)
                .then(() => alert("Menu updated successfully!"))
                .catch(() => alert("Failed to update menu."));
        }
        setEdit(!edit);
    };

    const handleAddToMenu = (mealId) => {
        setActiveMeals((prev) => ({
            ...prev,
            [mealId]: !prev[mealId],
        }));
    };

    const handleRemoveMeal = (mealId) => {
        setMealCounts((prevCounts) => ({
            ...prevCounts,
            [mealId]: Math.max((prevCounts[mealId] || 0) - 1, 0),
        }));
    };

    const handleAddMeal = (mealId) => {
        setMealCounts((prevCounts) => ({
            ...prevCounts,
            [mealId]: (prevCounts[mealId] || 0) + 1,
        }));
    };

    // Pagination Logic
    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <button
                className={`shadow-lg absolute rounded-xl font-thin p-1 border-2 shadow-teal-600 
                ${edit ? "bg-red-500" : "bg-blue-500"}`}
                onClick={handleCreateMenu}
            >
                {edit ? "Add New Menu" : "Edit Menu"}
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🍽️ Menu List</h2>

            <div className="grid md:grid-cols-4 bg-slate-300 gap-5 p-4">
                {currentMeals.map((meal) => (
                    <div key={meal.idMeal} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
                        <img
                            src={meal.strMealThumb || "https://via.placeholder.com/150"}
                            alt={meal.strMeal}
                            className="w-full h-56 object-cover transition transform hover:scale-105"
                        />
                        <div className="p-4">
                            <h5 className="text-lg font-bold text-gray-700 text-center">{meal.strMeal}</h5>

                            <div className="grid-rows-2 items-center">
                                <div className="flex justify-between items-center mb-2">
                                    <button
                                        className="rounded-xl hover:shadow-red-700 p-1 w-1/2 border border-red-100 text-black hover:shadow-inner transition"
                                        onClick={() => handleRemoveMeal(meal.idMeal)}
                                    >
                                        -
                                    </button>
                                    <p className="w-1/3 h-1/2 bg-white/90 text-center">{mealCounts[meal.idMeal] || 0}</p>
                                    <button
                                        className="rounded-xl hover:shadow-white p-1 w-1/2 border border-lime-300 text-black hover:bg-blue-700 hover:shadow-inner transition"
                                        onClick={() => handleAddMeal(meal.idMeal)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className={`rounded-xl h-10 w-3/4 ml-6 transition-all duration-300 ${
                                        activeMeals[meal.idMeal] ? "bg-red-400 text-wrap text-white" : "bg-blue-100 text-gray-800"
                                    }`}
                                    onClick={() => handleAddToMenu(meal.idMeal)}
                                >
                                    {activeMeals[meal.idMeal] ? (
                                        <p>{mealCounts[meal.idMeal] || 0} {meal.strMeal} Dishes</p>
                                    ) : (
                                        "Add to Menu"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                {Array.from({ length: Math.ceil(meals.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 mb-10 px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default MealList;