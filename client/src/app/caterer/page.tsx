
"use client";

import withAuth from "../hoc/withAuth";
import { useUser } from "../context/context";

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
    </div>
  );
}

// ✅ Ensure role is passed as a string, not an object
export default withAuth(Caterer, "caterer");
