// client/src/app/components/signUpForm.js
import React from "react"
import { useState } from "react";
import { useUser } from '../signUp/context/signUp';


export default function SignUpForm (){
// const { signUp } = useUser();  // Correct usage of useUser to get signUp
const {user} =useUser();
const {signUp}=useUser();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// const {handleSubmit} = useUser();
// const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     // Call signUp function (you might also need to pass more info like role)
//     try {
//         const response = await signUp({ username, email, password});
//         console.log("User signed up successfully:", response);
//         // Optionally handle response (e.g., redirect, show success message)
//     } catch (error) {
//         console.error("Error signing up:", error);
//         // Handle error (show error message to the user)
//     }
//     };
 
const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Add the 'role' field in the payload
    try {
        const response = await signUp({ 
            username, 
            email, 
            password, 
            role: 'user' // Set a default role for the user
        });
        console.log("User signed up successfully:", response);
        // Optionally handle response (e.g., redirect, show success message)
    } catch (error) {
        console.error("Error signing up:", error);
        // Handle error (show error message to the user)
    }
};


    return (
<form onSubmit={handleSubmit}>
<div>
    <label htmlFor="username">Username:</label>
    <input
    type="text"
    id="username"
    username="username"
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
    <button type="submit" >Sign Up</button>

<div className="signup-footer">
    <p>
    Already have an account? <a href="/login">Login</a>
    </p>
</div>
</form>
    );
}