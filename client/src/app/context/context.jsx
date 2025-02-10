"use client"; 

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
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
            setUser(response.data);

            // ✅ Redirect user based on role after successful login
            if (response.data.role === "user") {
                router.push("/customer");
            } else if (response.data.role === "admin") {
                router.push("/admin");
            } else if (response.data.role === "caterer") {
                router.push("/caterer");
            } else {
                router.push("/retry");
            }
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login"); // Redirect to login after logout
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
