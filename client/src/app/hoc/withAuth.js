// client/src/app/hoc/withAuth.js
"use client";

import { useUser } from "../context/user";
import { useEffectsHandler } from "../context/useEffectsHandler";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent, requiredRole = null) => {
  return function AuthComponent(props) {
    const { user, loading: userLoading, fetchUser } = useUser();
    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffectsHandler({ user, userLoading, fetchUser });

    if (userLoading) return <div className="p-24 font-serif font-semibold">Loading...</div>;

    if (!token) {
      router.push("/login");
      return null;
    }

    if (!user || !user.role) return null;

    if (requiredRole && user.role !== requiredRole) {
router.push("/login");    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
