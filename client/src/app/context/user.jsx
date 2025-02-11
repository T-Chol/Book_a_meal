"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); 

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role || "guest",
            });
        } catch (error) {
            // console.error("Failed to fetch user:", error);


        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user && typeof window !== "undefined" && localStorage.getItem("token")) {
            fetchUser();
        }
    }, [user]);

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:5000/login", credentials);
            const token = response.data.access_token;
            localStorage.setItem("token", token);

            setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role || "guest",
            });

            if (response.data.role === "user") {
                router.push("/customer");
            } else if (response.data.role === "admin") {
                router.push("/admin");
            } else if (response.data.role === "caterer") {
                router.push("/caterer");
            } else {
                return alert("Invalid role.");
                        }
        } catch (error) {
            alert("Invalid email or password.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
