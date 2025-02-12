// // client/src/app/orderPage/page.tsx
// "use client";

// import withAuth from "../hoc/withAuth";
// import withMenu from "../hoc/withMenu";
// import { useUser } from "../context/user";
// import { useMenu } from "../context/menu";
// import MenuComponent from "../components/menu";
// import AuthHeader from "../components/authHeader";

// function OrderPage() {
// const { user, loading: userLoading } = useUser();
// const { menu, loading: menuLoading } = useMenu();

// if (userLoading || menuLoading) return <div>Loading...</div>;

// if (!user || !user.role) {
//     return <p>Please log in to access the customer page.</p>;
// }

// return (
//     // change it to mapped array of menu items
//     <div>
//  <AuthHeader />
//         <p className="ml-auto mr-0 p-4 absolute right-0">Welcome <strong>{user.username}!</strong></p>
//         <MenuComponent menu={menu} user={user} />
//     </div>

//     // change it to mapped array of menu items
// );
// }

// export default withMenu(withAuth(OrderPage, "user"));



// client/src/app/orderPage/page.tsx
"use client";

import withAuth from "../hoc/withAuth";
import withMenu from "../hoc/withMenu";
import { useUser } from "../context/user";
import { useMenu } from "../context/menu";
import MenuComponent from "../components/menu";
import AuthHeader from "../components/authHeader";
import axios from "axios";

function OrderPage() {
  const { user, loading: userLoading } = useUser();
  const { menu, loading: menuLoading, inCart, setInCart } = useMenu();

  if (userLoading || menuLoading) return <div>Loading...</div>;

  if (!user || !user.role) {
    return <p>Please log in to access the customer page.</p>;
  }

  const addToCart = async (item) => {
    try {
      // Optionally, send the new cart item to the backend
      const response = await axios.post(
        "http://localhost:5000/menu",  // Adjust endpoint as needed
        { menu_item_id: item.id, quantity: 1 }, // Send item to the backend
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Update the context to reflect the cart items
      setInCart([...inCart, item]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <AuthHeader />
      <p className="ml-auto mr-0 p-4 absolute right-0">
        Welcome <strong>{user.username}!</strong>
      </p>
      <MenuComponent menu={menu} user={user} addToCart={addToCart} />
    </div>
  );
}

export default withMenu(withAuth(OrderPage, "user"));
