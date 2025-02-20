// client/src/app/signUp/page.tsx
"use client";  
import React, { useState } from "react";
import { useUser } from '../context/user'; 
import axios from "axios";

export default function SignUpForm() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const { login } = useUser(); 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE}/signup`, {
                username,
                email,
                password,
                role,
            });

            const credentials = email ? { email, password } : { username, password }; 
            await login(credentials);

            alert("User registered and logged in successfully!");
        } catch (error) {
            console.error(error);
            alert("Error during sign up");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>

            <div className="signup-footer">
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </form>
    );
}
