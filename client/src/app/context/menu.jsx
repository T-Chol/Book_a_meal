// client/src/app/context/menu.jsx
"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useUser } from "./user"; 
import { useEffectsHandler } from "./useEffectsHandler";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mealCounts, setMealCounts] = useState({});
    const [activeMeals, setActiveMeals] = useState({});
    const { user, loading: userLoading } = useUser(); 
    const [cart, setCart] = useState([]);
    const [myCart, setMyCart] = useState([]);

    //  Fetch meals from external API
    const fetchMeals = async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            setMeals(response.data.meals || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch meals data");
            setLoading(false);
        }
        
    };

    //  Fetch menu from backend
    const fetchMenuFromBackend = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const response = await axios.get("http://localhost:5000/menu", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const menuItems = response.data || [];

            const mealCountsObj = {};
            const activeMealsObj = {};

            menuItems.forEach((menuItem) => {
                mealCountsObj[menuItem.id] = menuItem.quantity;
                activeMealsObj[menuItem.id] = true;
            });

            setMealCounts(mealCountsObj);
            setActiveMeals(activeMealsObj);
            setMenu(menuItems);
        } catch (error) {
            console.error("Error fetching menu:", error);
            alert("Failed to fetch menu data");
        }
    };

    // ✅ Add meals from API to the menu
    const updateMenu = async (selectedMeals, meals, mealCounts) => {
        try {
            const token = localStorage.getItem("token");
            const updateRequests = selectedMeals.map(async (mealId) => {
                const meal = meals.find((m) => m.idMeal === mealId);
                if (!meal) return;

                const updatedData = {
                    id: meal.idMeal,
                    name: meal.strMeal,
                    quantity: mealCounts[mealId] || 1,
                    picture: meal.strMealThumb,
                    price: 12.99,
                    description: meal.strInstructions,
                };

                return axios.post("http://localhost:5000/menu", updatedData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            });

            await Promise.all(updateRequests);
            fetchMenuFromBackend();
        } catch (error) {
            console.error("Error updating menu:", error);
            throw error;
        }
    };

    useEffectsHandler({ user, userLoading, fetchMeals, fetchMenuFromBackend });

    return (
        <MenuContext.Provider value={{ 
            menu, 
            meals, 
            loading, 
            error, 
            mealCounts, 
            activeMeals, 
            setMealCounts, 
            setActiveMeals, 
            updateMenu, 
            cart,
            setCart,
            myCart,
            setMyCart
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
