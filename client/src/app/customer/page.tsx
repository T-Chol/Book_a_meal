// client/src/app/customer/page.tsx
"use client";

import withAuth from "../hoc/withAuth";
import withMenu from "../hoc/withMenu";
import { useUser } from "../context/user";
import { useMenu } from "../context/menu";
import MenuComponent from "../components/menu";
import AuthHeader from "../components/authHeader";

function Customer() {
const { user, loading: userLoading } = useUser();
const { menu, loading: menuLoading } = useMenu();

if (userLoading || menuLoading) return <div>Loading...</div>;

if (!user || !user.role) {
    return <p>Please log in to access the customer page.</p>;
}

return (
    // change it to mapped array of menu items
    <div>
 <AuthHeader />
        <p className="ml-auto mr-0 p-4 absolute right-0">Welcome <strong>{user.username}!</strong></p>
        <MenuComponent menu={menu} user={user} />
    </div>

    // change it to mapped array of menu items
);
}

export default withMenu(withAuth(Customer, "user"));


