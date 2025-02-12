
"use client";

import withAuth from "../hoc/withAuth";
import { useUser } from "../context/user";
import MealList from "../components/MealList";
import { useEffect } from "react";
import AuthHeader from "../components/authHeader";

function Caterer() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  useEffect(() => {
    const timeout = setTimeout(() => {
        if (!loading && user) {
            alert(`Welcome Chef ${user.username}, what's on the menu today?`);
        }
    }, 500); 

    return () => clearTimeout(timeout);
}, [loading, user]);


  return (
    <>
<AuthHeader />

      <MealList  />
    </>
  );
}

// ✅ Ensure role is passed as a string, not an object
export default withAuth(Caterer, "caterer");
