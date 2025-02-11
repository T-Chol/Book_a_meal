
"use client";

import withAuth from "../hoc/withAuth";
import { useUser } from "../context/user";
import MealList from "../components/MealList";

function Caterer() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Caterer Page</h1>
      {user ? (<>
        <p>Welcome Chef <strong>{user.username}</strong></p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      <button className="bg-teal-600 hover:scale-110 transition-all active:-translate-x-10 shadow-lg absolute right-4 rounded-xl font-thin p-1 border-2  shadow-teal-600 "
 onClick={() => console.log("Add meal using this button")}>Add Meal</button>
      <MealList  />
    </div>
  );
}

// ✅ Ensure role is passed as a string, not an object
export default withAuth(Caterer, "caterer");
