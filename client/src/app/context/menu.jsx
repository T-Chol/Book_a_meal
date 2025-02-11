
// // // // "use client";

// // // // import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import axios from "axios";
// // // // import { useAuth } from "../hoc/withAuth"; // Ensures authentication is accessible

// // // // // Define Menu Item Type
// // // // interface MenuItem {
// // // //     id: number;
// // // //     name: string;
// // // //     description: string;
// // // //     price: number;
// // // //     quantity: number;
// // // //     picture?: string; // Optional field for food image URL
// // // // }

// // // // // Define Context Type
// // // // interface MenuContextType {
// // // //     menu: MenuItem[];
// // // //     loading: boolean;
// // // //     addMenu: (credentials: MenuItem) => Promise<void>;
// // // // }

// // // // // Initialize Context with default values
// // // // const MenuContext = createContext<MenuContextType | null>(null);

// // // // export const MenuProvider = ({ children }: { children: ReactNode }) => {
// // // //     const [menu, setMenu] = useState<MenuItem[]>([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const { user } = useAuth(); // Get user info
// // // //     const router = useRouter();

// // // //     useEffect(() => {
// // // //         const storedMenu = localStorage.getItem("menu");
// // // //         if (storedMenu) {
// // // //             setMenu(JSON.parse(storedMenu));
// // // //         } else {
// // // //             getMenu();
// // // //         }
// // // //     }, []);

// // // //     const getMenu = async () => {
// // // //         try {
// // // //             const response = await axios.get("http://localhost:5000/menu");
// // // //             const fetchedMenu = response.data;
// // // //             setMenu(fetchedMenu);
// // // //             localStorage.setItem("menu", JSON.stringify(fetchedMenu));

// // // //             if (fetchedMenu.length === 0) {
// // // //                 handleEmptyMenu();
// // // //             }
// // // //         } catch (error) {
// // // //             alert("Error fetching menu");
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     const addMenu = async (credentials: MenuItem) => {
// // // //         try {
// // // //             const response = await axios.post("http://localhost:5000/menu", credentials);
// // // //             const newMenu = response.data.menu;
// // // //             localStorage.setItem("menu", JSON.stringify(newMenu));
// // // //             setMenu(newMenu);
// // // //         } catch (error) {
// // // //             alert("Error adding menu");
// // // //         }
// // // //     };

// // // //     const handleEmptyMenu = () => {
// // // //         if (!user) {
// // // //             alert("Dear esteemed client, sign up/login to enjoy what we have to offer.");
// // // //             return;
// // // //         }

// // // //         switch (user.role) {
// // // //             case "caterer":
// // // //                 alert(`Kindly update today's menu, Chef ${user.userName}`);
// // // //                 router.push("/caterer");
// // // //                 break;
// // // //             case "admin":
// // // //                 alert(`${user.username}, remind the chef to update the menu.`);
// // // //                 break;
// // // //             case "customer":
// // // //                 alert(`Dear ${user.username}, kindly note that we have closed for today.`);
// // // //                 break;
// // // //             default:
// // // //                 alert("Menu is unavailable. Please check back later.");
// // // //         }
// // // //     };

// // // //     return (
// // // //         <MenuContext.Provider value={{ menu, loading, addMenu }}>
// // // //             {children}
// // // //         </MenuContext.Provider>
// // // //     );
// // // // };

// // // // // Custom Hook to Use the Menu Context
// // // // export const useMenu = () => {
// // // //     const context = useContext(MenuContext);
// // // //     if (!context) {
// // // //         throw new Error("useMenu must be used within a MenuProvider");
// // // //     }
// // // //     return context;
// // // // };


// // // // // // // client/src/app/context/menu.ts
// // // // // // "use client"; 

// // // // // // import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// // // // // // import { useRouter } from "next/navigation"; 
// // // // // // import axios from "axios";

// // // // // // interface MenuContextType {
// // // // // //     menu: any;
// // // // // //     loading: boolean;
// // // // // //     addMenu: (credentials: any) => Promise<void>;
// // // // // // }

// // // // // // const MenuContext = createContext<MenuContextType | null>(null);

// // // // // // interface MenuProviderProps {
// // // // // //     children: React.ReactNode;
// // // // // // }

// // // // // // export const MenuProvider = ({ children }: MenuProviderProps) => {
// // // // // //     const [menu, setMenu] = useState(null);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const router = useRouter(); 

// // // // // //     useEffect(() => {
// // // // // //         const storedMenu = localStorage.getItem("menu");
// // // // // //         if (storedMenu) {
// // // // // //             setMenu(JSON.parse(storedMenu)); // ✅ Parse JSON before setting state
// // // // // //         } else {
// // // // // //             getMenu();
// // // // // //         }
// // // // // //         setLoading(false);
// // // // // //     }, []);

// // // // // //     const addMenu = async () => {
// // // // // //         try {
// // // // // //             const response = await axios.post("http://localhost:5000/menu");
// // // // // //             const newMenu = response.data.menu;
// // // // // //             localStorage.setItem("menu", JSON.stringify(newMenu)); // ✅ Store as JSON
// // // // // //             setMenu(newMenu);
// // // // // //         } catch (error) {
// // // // // //             alert("Error adding menu");
// // // // // //         }
// // // // // //     };

// // // // // //     const getMenu = async () => {
// // // // // //         try {
// // // // // //             const response = await axios.get("http://localhost:5000/menu");
// // // // // //             setMenu(response.data);
// // // // // //         } catch (error) {
// // // // // //             alert("Error fetching menu");
// // // // // //         }
// // // // // //     };

// // // // // //     return (
// // // // // //         <MenuContext.Provider value={{ menu, loading, addMenu }}>
// // // // // //             {children}
// // // // // //         </MenuContext.Provider>
// // // // // //     );
// // // // // // };

// // // // // // export const useMenu = () => useContext(MenuContext); // ✅ Correct useContext usage
// // // // // "use client";

// // // // // import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import axios from "axios";
// // // // // import { useAuth } from "../hooks/useAuth"; // Assuming you have authentication logic

// // // // // const MenuContext = createContext();

// // // // // export const MenuProvider = ({ children }) => {
// // // // //     const [menu, setMenu] = useState([]);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const { user } = useAuth(); // Get user info
// // // // //     const router = useRouter();

// // // // //     useEffect(() => {
// // // // //         const storedMenu = localStorage.getItem("menu");
// // // // //         if (storedMenu) {
// // // // //             setMenu(JSON.parse(storedMenu));
// // // // //         } else {
// // // // //             getMenu();
// // // // //         }
// // // // //     }, []);

// // // // //     const getMenu = async () => {
// // // // //         try {
// // // // //             const response = await axios.get("http://localhost:5000/menu");
// // // // //             const fetchedMenu = response.data;
// // // // //             setMenu(fetchedMenu);
// // // // //             localStorage.setItem("menu", JSON.stringify(fetchedMenu));

// // // // //             // Handle empty menu cases
// // // // //             if (fetchedMenu.length === 0) {
// // // // //                 handleEmptyMenu();
// // // // //             }
// // // // //         } catch (error) {
// // // // //             alert("Error fetching menu");
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     const addMenu = async (credentials) => {
// // // // //         try {
// // // // //             const response = await axios.post("http://localhost:5000/menu", credentials);
// // // // //             const newMenu = response.data.menu;
// // // // //             localStorage.setItem("menu", JSON.stringify(newMenu));
// // // // //             setMenu(newMenu);
// // // // //         } catch (error) {
// // // // //             alert("Error adding menu");
// // // // //         }
// // // // //     };

// // // // //     const handleEmptyMenu = () => {
        
// // // // //         if (!user) {
// // // // //             alert("Dear esteemed client, sign up/login to enjoy what we have to offer.");
// // // // //             return;
// // // // //         }

// // // // //         switch (user.role) {
// // // // //             case "caterer":
// // // // //                 alert(`Kindly update today's menu, Chef ${user.userName}`);
// // // // //                 router.push("/caterer");
// // // // //                 break;
// // // // //             case "admin":
// // // // //                 alert(`${user.username}, remind the chef to update the menu.`);
// // // // //                 break;
// // // // //             case "customer":
// // // // //                 alert(`Dear ${user.username}, kindly note that we have closed for today.`);
// // // // //                 break;
// // // // //             default:
// // // // //                 alert("Menu is unavailable. Please check back later.");
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <MenuContext.Provider value={{ menu, loading, addMenu }}>
// // // // //             {children}
// // // // //         </MenuContext.Provider>
// // // // //     );
// // // // // };

// // // // // // Prevents errors if `useMenu()` is used outside `MenuProvider`
// // // // // export const useMenu = () => {
// // // // //     const context = useContext(MenuContext);
// // // // //     if (!context) {
// // // // //         throw new Error("useMenu must be used within a MenuProvider");
// // // // //     }
// // // // //     return context;
// // // // // };
// // // "use client";

// // // import { createContext, useContext, useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { useUser } from "./user"; // ✅ Import authentication context

// // // const MenuContext = createContext();

// // // export const MenuProvider = ({ children }) => {
// // //     const [menu, setMenu] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const { user } = useUser(); // ✅ Get user info

// // //     useEffect(() => {
// // //         getMenu();
// // //     }, []);

// // //     const getMenu = async () => {
// // //         try {
// // //             const token = localStorage.getItem("token"); 
// // //             const response = await axios.get("http://localhost:5000/menu/", {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             });

// // //             const fetchedMenu = response.data;
// // //             setMenu(fetchedMenu);
// // //             localStorage.setItem("menu", JSON.stringify(fetchedMenu));

// // //             if (fetchedMenu.length === 0) {
// // //                 handleEmptyMenu();
// // //             }
// // //         } catch (error) {
// // //             console.error("Error fetching menu:", error);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const addMenu = async (credentials) => {
// // //         try {
// // //             const token = localStorage.getItem("token");
// // //             const response = await axios.post("http://localhost:5000/menu/", credentials, {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             });

// // //             setMenu(response.data.menu);
// // //             localStorage.setItem("menu", JSON.stringify(response.data.menu));
// // //         } catch (error) {
// // //             console.error("Error adding menu:", error);
// // //         }
// // //     };

// // //     const handleEmptyMenu = () => {
// // //         if (!user) {
// // //             alert("Dear esteemed client, sign up/login to enjoy what we have to offer.");
// // //             router.push("/about");

// // //             return;
// // //         }

// // //         switch (user.role) {
// // //             case "caterer":
// // //                 alert(`Kindly update today's menu, Chef ${user.username}`);
// // //                 break;
// // //             case "admin":
// // //                 alert(`${user.username}, remind the chef to update the menu.`);
// // //                 break;
// // //             case "customer":
// // //                 alert(`Dear ${user.username}, kindly note that we have closed for today.`);
// // //                 break;
// // //             default:
// // //                 alert("Menu is unavailable. Please check back later.");
// // //         }
// // //     };

// // //     return (
// // //         <MenuContext.Provider value={{ menu, loading, addMenu }}>
// // //             {children}
// // //         </MenuContext.Provider>
// // //     );
// // // };

// // // export const useMenu = () => useContext(MenuContext);


// // "use client";

// // import { createContext, useContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { useUser } from "./user"; 

// // const MenuContext = createContext();

// // export const MenuProvider = ({ children }) => {
// //     const [menu, setMenu] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const { user, loading: userLoading } = useUser(); 

// //     useEffect(() => {
// //         if (!userLoading && user) {
// //             getMenu();
// //         }
// //     }, [user, userLoading]); 

// //     const getMenu = async () => {
// //         try {
// //             const token = localStorage.getItem("token"); 
// //             const response = await axios.get("http://localhost:5000/menu/", {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });

// //             setMenu(response.data);
// //             localStorage.setItem("menu", JSON.stringify(response.data));
// //         } catch (error) {
// //             console.error("Error fetching menu:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <MenuContext.Provider value={{ menu, loading }}>
// //             {children}
// //         </MenuContext.Provider>
// //     );
// // };

// // export const useMenu = () => useContext(MenuContext);
// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "./user"; 

// const MenuContext = createContext();

// export const MenuProvider = ({ children }) => {
//     const [menu, setMenu] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { user, loading: userLoading } = useUser(); 

//     useEffect(() => {
//         if (!userLoading && user) {
//             getMenu();
//         }
//     }, [user, userLoading]); 

//     const getMenu = async () => {
//         try {
//             const token = localStorage.getItem("token"); 
//             const response = await axios.get("http://localhost:5000/menu/", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setMenu(response.data);
//             localStorage.setItem("menu", JSON.stringify(response.data));
//         } catch (error) {
//             console.error("Error fetching menu:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <MenuContext.Provider value={{ menu, loading }}>
//             {children}
//         </MenuContext.Provider>
//     );
// };

// export const useMenu = () => useContext(MenuContext);




"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./user"; 

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: userLoading } = useUser(); 

    useEffect(() => {
        if (!userLoading && user?.role) {  // ✅ Ensures `user.role` exists before fetching menu
            getMenu();
        }
    }, [user, userLoading]); 

    const getMenu = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const response = await axios.get("http://localhost:5000/menu/", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMenu(response.data);
            localStorage.setItem("menu", JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MenuContext.Provider value={{ menu, loading }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);















// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "./user"; 

// const MenuContext = createContext();

// export const MenuProvider = ({ children }) => {
//     const [menu, setMenu] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { user, loading: userLoading } = useUser(); 

//     useEffect(() => {
//         if (!userLoading && user?.role) {  // ✅ Ensures `user.role` exists before fetching menu
//             getMenu();
//         }
//     }, [user, userLoading]); 

//     const getMenu = async () => {
//         try {
//             const token = localStorage.getItem("token"); 
//             const response = await axios.get("http://localhost:5000/menu", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setMenu(response.data);
//             localStorage.setItem("menu", JSON.stringify(response.data));
//         } catch (error) {
//             console.error("Error fetching menu:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <MenuContext.Provider value={{ menu, loading }}>
//             {children}
//         </MenuContext.Provider>
//     );
// };

// export const useMenu = () => useContext(MenuContext);
