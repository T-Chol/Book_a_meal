// client/src/app/login/page.tsx
"use client";
import Header from "../components/header";

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
        console.error(error);
        alert("Invalid login credentials.");
    } finally {
        setLoading(false);
    }
};

return (
    <>
    <Header/>
    
    <form onSubmit={handleSubmit} className=" w-1/2 bg-teal-500/90 opacity-90  rounded-2xl p-10 translate-y-20 translate-x-1/2 ">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">LOGIN</h1>
        <p className="text-gray-600 mb-8 text-center">Get started with your account.</p>

        <div className="grid grid-cols-2 gap-2 px-20"  >
        {!isEmailLogin && (<label htmlFor="username">Username:</label>)}
            {!isEmailLogin && (
                <input
                type="text"
                id="username"
                className="rounded-md"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isEmailLogin}
            />)}
{isEmailLogin && (
            <label htmlFor="email">Email:</label>)}
                            {isEmailLogin && (
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEmailLogin}
            />)}

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className="text-center translate-x-1/12 mt-5">
            <span>Login with </span>
            <button type="button" onClick={() => setIsEmailLogin(!isEmailLogin)} className="text-blue-600 rounded-md border-neutral-100 border w-1/4 ml-3 hover:text-blue-700">
                {isEmailLogin ? "User Name" : "Email"}
            </button>
        </div>
        <button type="submit" className=" p-1 mt-5 mb-5 font-sans  hover:font-serif active:bg-teal-200 border-3xl border  rounded-sm bg-slate-100 " disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
        </button>


    </form>
    </> 
);
}
