"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./user"; 

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mealCounts, setMealCounts] = useState({});
    const [activeMeals, setActiveMeals] = useState({});
    const { user, loading: userLoading } = useUser(); 
    const [inCart, setInCart] = useState([]);


    useEffect(() => {
        if (!userLoading && user?.role) {  // ✅ Ensures `user.role` exists before fetching menu
            fetchMeals();
            fetchMenuFromBackend();
        }
    }, [user, userLoading]); 

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
            setError("Failed to fetch menu data");
        }
    };

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
            inCart,
            setInCart
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);