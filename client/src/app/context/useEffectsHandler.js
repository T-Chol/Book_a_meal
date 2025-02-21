import { useEffect, useRef } from "react";
export const useEffectsHandler = (params = {}) => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const {
        user = JSON.parse(localStorage.getItem(`${API_BASE}/profile`)) || null, // Fetch user from /profile
        userLoading = true,
        fetchUser = () => {},
        fetchMeals = () => {},
        fetchMenuFromBackend = () => {},
        meals = [],
        menu = [],
        cart = [],
        myCart = [],
        setRemainingMeals = () => {}, // Added setter for `remainingMeals`
    } = params;

    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (!user && !userLoading && typeof window !== "undefined" && localStorage.getItem("token")) {
            fetchUser();
        }

        if (!userLoading && user?.role && !hasFetchedData.current) {
            if (meals.length === 0) fetchMeals?.();
            if (menu.length === 0) fetchMenuFromBackend?.();

            hasFetchedData.current = true;
        }

        // Update remainingMeals here instead of using `useEffect` inside `MenuPage.tsx`
        const updatedRemaining = {};
        menu.forEach((meal) => {
            const mealCountInCart = cart.filter((item) => item.id === meal.id).length;
            const mealCountInMyCart = myCart.reduce(
                (acc, item) => (item.meal_id === meal.id ? acc + item.quantity : acc), 
                0
            );
            updatedRemaining[meal.id] = Math.max(meal.quantity - (mealCountInCart + mealCountInMyCart), 0);
        });
        setRemainingMeals(updatedRemaining); 

    }, [user, userLoading, fetchUser, fetchMeals, fetchMenuFromBackend, cart, myCart, menu, setRemainingMeals, meals.length]); // ✅ Tracks cart & myCart changes
};
