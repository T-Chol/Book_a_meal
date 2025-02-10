// client/src/app/components/signIn.js


import React, { useState } from "react";
import { useUser } from '../context/context';

export default function SignInForm() {
    const { login } = useUser(); // Use login function from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // For optional username-based login
    const [isEmailLogin, setIsEmailLogin] = useState(true); // Toggle between email/username login

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = isEmailLogin
            ? { email, password }
            : { username, password };

        await login(credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="  contents-center w-1/2 bg-white/90 opacity-100 h-96 ml-80 rounded-2xl p-20   ">
            <h1 className=" text-2xl font-bold mb-6 text-center text-gray-800 ">LOGIN</h1>
            <div>    <p className="text-gray-600 mb-6 text-center">How to I get started lorem ipsum dolor at?</p>

                <label htmlFor="username" >Username:</label>
                <input
                className="block text-gray-700 text-sm font-bold mb-2"
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isEmailLogin} // Disable if logging in with email
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
                    disabled={!isEmailLogin} // Disable if logging in with username
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

            <button type="submit">Sign In</button>

            <div>
                <button type="button" onClick={() => setIsEmailLogin(!isEmailLogin)}>
                    {isEmailLogin ? "Login with Username" : "Login with Email"}
                </button>
            </div>
        </form>
    );
}
