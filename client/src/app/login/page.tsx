"use client";


import React, { useState, FormEvent } from "react";
import { useUser } from "../context/user";

export default function SignInForm() {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isEmailLogin, setIsEmailLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) /*why I don't like typescript*/ => {
        e.preventDefault();
        setLoading(true); 

        try {
            const credentials = isEmailLogin ? { email, password } : { username, password };
            await login(credentials);
        } catch (error) {
            alert("Invalid login credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contents-center w-1/2 bg-white/90 opacity-100 h-96 ml-80 rounded-2xl p-20">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">LOGIN</h1>
            <p className="text-gray-600 mb-6 text-center">Get started with your account.</p>

            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isEmailLogin}
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
                    disabled={!isEmailLogin}
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

            <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>

            <div>
                <button type="button" onClick={() => setIsEmailLogin(!isEmailLogin)}>
                    {isEmailLogin ? "Login with Username" : "Login with Email"}
                </button>
            </div>
        </form>
    );
}
