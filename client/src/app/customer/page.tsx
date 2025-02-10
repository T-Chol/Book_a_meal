"use client";

import withAuth from "../hoc/withAuth";
import { useUser } from "../context/context";

function Customer() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer Page</h1>
      {user ? (<>
        <p>Role: <strong>{user.role}</strong></p>
        <p>Welcome  <strong>{user.username}</strong></p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

// ✅ Ensure role is passed as a string, not an object
export default withAuth(Customer, "user");
