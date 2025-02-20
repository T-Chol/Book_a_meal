
"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ;

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    const getRefreshToken = () => (typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null);
    const setToken = (token) => { if (typeof window !== "undefined") localStorage.setItem("token", token); };
    const setRefreshToken = (refreshToken) => { if (typeof window !== "undefined") localStorage.setItem("refresh_token", refreshToken); };
    const removeTokens = () => { if (typeof window !== "undefined") { localStorage.removeItem("token"); localStorage.removeItem("refresh_token"); }};

    const fetchUser = async () => {
        if (typeof window === "undefined") return;
        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role || "user",
            });
        } catch {
            logout(); 
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE}/login`, credentials);
            setToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);

            const newUser = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role || "guest",
            };

            setUser(newUser);
            fetchUser(); // 🔥 Ensure fetchUser() runs after login

            setTimeout(() => {
                if (newUser.role === "user") {
                    router.push("/myCart");
                } else if (newUser.role === "admin") {
                    router.push("/admin");
                } else if (newUser.role === "caterer") {
                    router.push("/caterer");
                    toast.success("Welcome Chef, what's on the menu today?", { autoClose: 2000 });
                }
            }, 100);
        } catch {
            toast.error("Invalid email or password.", { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeTokens();
        setUser(null);
        router.push("/login");
    };

    return (
        <UserContext.Provider value={{ user, fetchUser, login, logout, loading, getRefreshToken, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
