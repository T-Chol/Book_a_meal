// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // function MealList({ handleAddToOrder }) {
// // // const [meals, setMeals] = useState([]);
// // // const [loading, setLoading] = useState(true);
// // // const [error, setError] = useState(null);

// // // useEffect(() => {
// // // const fetchMeals = async () => {
// // //     try {
// // //     const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
// // //     setMeals(response.data.meals);
// // //     setLoading(false);
// // //     } catch (err) {
// // //     setError('Failed to fetch meals data');
// // //     setLoading(false);
// // //     }
// // // };

// // // fetchMeals();
// // // }, []);

// // // if (loading) return <p className="text-center text-gray-500">Loading menu...</p>;
// // // if (error) return <p className="text-center text-red-500">{error}</p>;

// // // return (
// // // <div className="container mx-auto p-6">
// // //     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🍽️ Menu List</h2>
    
// // //     <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
// // //     {meals.map((meal) => (
// // //         <div key={meal.idMeal} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
// // //         <img 
// // //             src={meal.strMealThumb || 'https://via.placeholder.com/150'} 
// // //             alt={meal.strMeal} 
// // //             className="w-full h-56 object-cover transition transform hover:scale-105"
// // //         />
// // //         <div className="p-4">
// // //             <h5 className="text-lg font-bold text-gray-700 text-center">{meal.strMeal}</h5>
// // //             <p className="text-gray-600 text-sm mt-2 line-clamp-3">{meal.strInstructions.substring(0, 100)}...</p>
// // //             <button
// // //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-3 transition duration-200"
// // //             onClick={() => handleAddToOrder(meal)}
// // //             >
// // //             ➕ Add to My Order
// // //             </button>
// // //         </div>
// // //         </div>
// // //     ))}
// // //     </div>
// // // </div>
// // // );
// // // }

// // // export default MealList;
// // "use client";

// // import { useUser } from "../context/user";
// // import { useMenu } from "../context/menu";
// // import { useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // const withMenu = (WrappedComponent) => {
// //     return function MenuComponent(props) {
// //         const { user, loading: userLoading } = useUser();
// //         const { menu, loading: menuLoading } = useMenu();
// //         const router = useRouter();

// //         // ✅ Wait for user data before checking role
// //         if (userLoading || menuLoading) return <div>Loading...</div>;

// //         // ✅ If user is still null but token exists, show a waiting message
// //         if (!user && localStorage.getItem("token")) {
// //             return <div>Loading user details...</div>;
// //         }

// //         // ✅ If no user and no token, ask for login
// //         if (!user) {
// //             return <div>Please log in to access the menu.</div>;
// //         }

// //         return <WrappedComponent {...props} menu={menu} />;
// //     };
// // };

// // export default withMenu;


// "use client";

// import React from "react";

// const MenuComponent = ({ menu, user }) => {
//     if (menu.length === 0) {
//         if (!user) {
//             return <p>Please log in to view the menu.</p>;
//         }

//         switch (user.role) {
//             case "caterer":
//                 return <p>Kindly update today's menu, Chef {user.username}.</p>;
//             case "admin":
//                 return <p>{user.username}, remind the chef to update the menu.</p>;
//             case "customer":
//                 return <p>Dear {user.username}, kindly note that we have closed for today.</p>;
//             default:
//                 return <p>Menu is unavailable. Please check back later.</p>;
//         }
//     }

//     return (
//         <div>
//             <h2>Today's Menu</h2>
//             <ul>
//                 {menu.map((item) => (
//                     <li key={item.id}>
//                         <img src={item.picture} alt={item.name} width="100" />
//                         <p><strong>{item.name}</strong></p>
//                         <p>{item.description}</p>
//                         <p>Price: ${item.price}</p>
//                         <p>Available: {item.quantity}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MenuComponent;
// client/src/app/components/menu.js
"use client";

import React from "react";

// const MenuComponent = ({ menu, user }) => {
//     if (menu.length === 0) {
//         if (!user || !user.role) {
//             return <p>Please log in to view the menu.</p>;
//         }

//         switch (user.role) {
//             case "caterer":
//                 return <p>Kindly update today's menu, Chef {user.username}.</p>;
//             case "admin":
//                 return <p>{user.username}, remind the chef to update the menu.</p>;
//             case "customer":
//                 return <p>Dear {user.username}, kindly note that we have closed for today.</p>;
//             default:
//                 return <p>Menu is unavailable. Please check back later.</p>;
//         }
//     }

//     return (
//         <div>
//             <h2>Today's Menu</h2>
//             <ul>
//                 {menu.map((item) => (
//                     <li key={item.id}>
//                         <img src={item.picture} alt={item.name} width="100" />
//                         <p><strong>{item.name}</strong></p>
//                         <p>{item.description}</p>
//                         <p>Price: ${item.price}</p>
//                         <p>Available: {item.quantity}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MenuComponent;
const MenuComponent = ({ menu, user }) => {
    if (!user || !user.role) {
        return <p>Please log in to view the menu.</p>;
    }

    if (menu.length === 0) {
        switch (user.role) {
            case "caterer":
                return <p>Kindly update today's menu, Chef {user.username}.</p>;
            case "admin":
                return <p>{user.username}, remind the chef to update the menu.</p>;
            case "customer":
                return <p>Dear {user.username}, kindly note that we have closed for today.</p>;
            default:
                return <p>Menu is unavailable. Please check back later.</p>;
        }
    }

    return (
        <div>
            <h2>Today's Menu</h2>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        <img src={item.picture} alt={item.name} width="100" />
                        <p><strong>{item.name}</strong></p>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <p>Available: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuComponent;















// // client/src/app/components/MenuComponent.jsx
// "use client";

// import React from "react";

// const MenuComponent = ({ menu, user }) => {
//     if (!user || !user.role) {
//         return <p>Please log in to view the menu.</p>;
//     }

//     if (menu.length === 0) {
//         switch (user.role) {
//             case "caterer":
//                 return <p>Kindly update today's menu, Chef {user.username}.</p>;
//             case "admin":
//                 return <p>{user.username}, remind the chef to update the menu.</p>;
//             case "customer":
//                 return <p>Dear {user.username}, kindly note that we have closed for today.</p>;
//             default:
//                 return <p>Menu is unavailable. Please check back later.</p>;
//         }
//     }

//     return (
//         <div>
//             <h2>Today's Menu</h2>
//             <ul>
//                 {menu.map((item) => (
//                     <li key={item.id}>
//                         <img src={item.picture} alt={item.name} width="100" />
//                         <p><strong>{item.name}</strong></p>
//                         <p>{item.description}</p>
//                         <p>Price: ${item.price}</p>
//                         <p>Available: {item.quantity}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MenuComponent;