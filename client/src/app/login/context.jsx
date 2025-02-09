// client/src/app/context/user.jsx

"use client"; 

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is already authenticated via JWT token in local storage
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:5000/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data); // Set user from API response
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:5000/login", credentials);
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            setUser(response.data); // Set user with the data returned from the backend
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using user context
export const useUser = () => {
    return useContext(UserContext);
};



