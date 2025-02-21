
"use client";

import withAuth from "../hoc/withAuth";
import { useUser } from "../context/user";
import MealList from "../components/MealList";

function TodaySpecials() {
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
      <MealList  />
    </div>
  );
}

export default withAuth(TodaySpecials);
