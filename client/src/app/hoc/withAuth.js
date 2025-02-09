import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent, requiredRole = null) => {
    // Return a new component that includes the authentication logic
    const Wrapper = (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (loading) return; // Wait for loading to finish
            
            if (!user) {
                // If not authenticated, redirect to login
                router.push("/login");
            } else if (requiredRole && user.role !== requiredRole) {
                // If authenticated but role doesn't match, redirect based on role
                router.push("/unauthorized");  // Or any page to show access denied
            }
        }, [user, loading, requiredRole, router]);

        // If loading or user isn't authenticated, show nothing or loading spinner
        if (loading || !user) {
            return <div>Loading...</div>;
        }

        // Render the wrapped component when the user is authenticated
        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
