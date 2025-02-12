// client/src/app/myCart/page.jsx
import React, { use } from 'react'
const { inCart, setInCart } = useMenu();
useEffect(() => {
    fetchCartFromBackend();
}, []);

fetchCartFromBackend = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/cart", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const cartItems = response.data || [];

        setInCart(cartItems);
    } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart data");
    }
};
function Cart() {
  return (
    <div>
      
    </div>
  )
}

export default withMenu(WithAuth(Cart, "customer"));
