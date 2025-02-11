// client/src/app/signUp/page.tsx

"use client";  
import React, { useState } from "react";
import { useUser } from '../context/user'; // Import login from context
import axios from "axios";

export default function SignUpForm() {
    const { login } = useUser(); // Use login function from context
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role is set to "user"

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Register the user
            const response = await axios.post("http://localhost:5000/signup", {
                username,
                email,
                password,
                role,
            });

            // Automatically log in the user
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
