// client/src/app/hoc/withAuth.js
"use client";

import { useUser } from "../context/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent, requiredRole = null) => {
return function AuthComponent(props) {
    const { user, loading: userLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!userLoading && (!user || !user.role)) {

            router.replace("/login");
        }
    }, [user, userLoading, router]);

    if (userLoading) return <div>Loading...</div>;

    if (!user || !user.role) {
        return <p>Please log in to access this page.</p>;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <p>You do not have permission to access this page.</p>;
    }

    return <WrappedComponent {...props} />;
};
};

export default withAuth;
