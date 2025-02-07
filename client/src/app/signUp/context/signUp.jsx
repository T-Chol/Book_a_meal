// client/src/app/signUp/context/signUp.jsx
import React, { createContext, useState, useContext } from 'react';  // Import createContext from React

// Create the UserContext
const UserContext = createContext(null);

// Create the UserProvider component to provide the context to other components
export const UserProvider = ({ children }) => {
const [user, setUser] = useState({
username: '',
email: '',
password: '',
role:'',  //defaults to user
});

// Function to update the user data
// const signUp = (name, email, password, role) => {
// setUser({
//     name,
//     email,
//     password,
//     role: 'user',
// });
// };
const signUp = async ({ username, email, password, role }) => {
    try {
      // Example: POST request to backend to create a new user
    const response = await fetch('http://localhost:5000/signUp', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
        throw new Error('Error signing up');
    }
    const data = await response.json();
      setUser(data);  // Set the user state with the response data (e.g., user details or token)
    return data;
    } catch (error) {
      throw error;  // Throw error to be caught in the SignUpForm
    }
};


 // Handling form input changes

// const handleChange = (e) => {
// const { name, value } = e.target;
// setUser((prevUser) => ({
//     ...prevUser,
//     [name]: value, // Dynamically updating the correct field
// }));
// };



return (
<UserContext.Provider value={{ user, signUp }}>
    {children}
</UserContext.Provider>
);
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
