"use client";

import React from "react";
import { useUser } from "../context/user";
import { useEffectsHandler } from "../context/useEffectsHandler";
import { useRouter } from "next/navigation";

/**
 * Higher-Order Component for role-based authorization.
 *
 * @template P
 * @param {React.ComponentType<P>} WrappedComponent - The component to wrap.
 * @param {string | null} [requiredRole=null] - The role required to access the wrapped component.
 * @returns {React.FC<P>} A component that enforces role-based auth.
 */
function withAuth(WrappedComponent, requiredRole = null) {
  return function AuthComponent(props) {
    const { user, loading: userLoading, fetchUser } = useUser();
    const router = useRouter();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffectsHandler({ user, userLoading, fetchUser });

    if (userLoading) {
      return <div className="p-24 font-serif font-semibold">Loading...</div>;
    }

    if (!token) {
      router.push("/login");
      return null;
    }

    if (!user || !user.role) {
      return null;
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
