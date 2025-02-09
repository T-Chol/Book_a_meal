"use client";  // Mark this file as a client-side component

import { useState } from "react";
import { useUser } from "../context/user";
import axios from "axios";
import { useRouter } from "next/navigation";  // Use the correct import for App Router

const SignIn = () => {
    const { login } = useUser(); // Use login function from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();  // Now using useRouter from next/navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });
            login(response.data.access_token); // Call login from context to store JWT token

            // Check the user's role and redirect accordingly
            const role = response.data.role; // Assuming the response contains the user's role
            if (role === "ADMIN") {
                router.push("/big");
            } else if (role === "CATERER") {
                router.push("/medium");
            } else {
                router.push("/small");
            }
            alert("Login successful");
        } catch (error) {
            console.error(error);
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default SignIn;
