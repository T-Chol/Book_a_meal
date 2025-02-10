"use client";

import { useUser } from "../context/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent, requiredRole = null) => {
    return function AuthComponent(props) {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    router.replace("/login"); // Redirect if not authenticated
                } else if (requiredRole && user.role !== requiredRole) {
                    router.replace("/unauthorized"); // Redirect if role doesn't match
                }
            }
        }, [user, loading, router]); // 🔥 Re-evaluates when `user` updates

        if (loading) return <div>Loading...</div>;
        if (!user || (requiredRole && user.role !== requiredRole)) return null;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
