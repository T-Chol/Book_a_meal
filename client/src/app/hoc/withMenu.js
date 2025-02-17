// client/src/app/hoc/withMenu.js
"use client";

import { useUser } from "../context/user";
import { useMenu } from "../context/menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withMenu = (WrappedComponent) => {
return function MenuComponent(props) {
    const { user, loading: userLoading } = useUser();
    const { menu, loading: menuLoading } = useMenu();
    const router = useRouter();
    const [token, setToken] = useState(null);

    // Fetch token safely in client-side
    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token") || null);
        }
    }, []);

    // Runs menu logic only  after everything is loaded
    useEffect(() => {
        if (!menuLoading && user) {
            if (!menu || menu.length === 0) {
                if (user.role === "caterer") {
                    alert(`Hi Chef ${user.username}, what's for the day?`);
                    router.replace("/caterer");
                    userLoading(false);
                    menuLoading(false);
                } 

            } else if (user.role === "admin") {
                alert("Remind the caterer to update the menu.");
                userLoading(false);
                menuLoading(false);
            } else if (user.role === "customer") {
                alert(`Hi ${user.username}, we are closed for the day.`);
                userLoading(false);
                menuLoading(false);
            }

        }
    }, [menu, menuLoading, userLoading,router, user]);

    //  Redirect after 5 seconds
useEffect(() => {
    const timeout = setTimeout(() => {
        if (!userLoading && !token) {
            router.replace("/login");
        }
    }, 5000); 
    return () => clearTimeout(timeout);
}, [token, userLoading, router]);

    return <WrappedComponent {...props} />;
};
};

export default withMenu;
