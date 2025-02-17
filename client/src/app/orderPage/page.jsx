
"use client";
import { useState, useEffect } from "react";
import withAuth from "../hoc/withAuth";
import { useMenu } from "../context/menu";
import Header from "../components/header";
import { useUser } from "../context/user";
import axios from "axios";

function OrderPage() {
  const { menu, error, loading, cart, setCart, myCart, setMyCart } = useMenu();
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [remainingMeals, setRemainingMeals] = useState({}); // ✅ Track stock dynamically

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenu = menu.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ✅ Fetch `myCart` when page loads (ensures correct values before checkout)
  useEffect(() => {
    const fetchMyCart = async () => {
      if (!user) return;
      try {
        const { data: updatedCart } = await axios.get("http://localhost:5000/myCart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMyCart(updatedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchMyCart();
  }, [user]); // ✅ Fetch `myCart` once when user is available

  // ✅ Calculate `remainingMeals` dynamically when `menu`, `cart`, or `myCart` changes
  const calculateRemainingMeals = () => {
    const updatedRemaining = {};
    menu.forEach((meal) => {
      const mealCountInCart = cart.filter((item) => item.id === meal.id).length;
      const mealCountInMyCart = myCart.reduce(
        (acc, item) => (item.meal_id === meal.id ? acc + item.quantity : acc), 
        0
      );
      updatedRemaining[meal.id] = Math.max(meal.quantity - (mealCountInCart + mealCountInMyCart), 0);
    });
    return updatedRemaining;
  };

  // ✅ Ensure `remainingMeals` is always up to date
  const updatedRemainingMeals = calculateRemainingMeals();

  // ✅ Handle Checkout
  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const mealCounts = cart.reduce((acc, meal) => {
      acc[meal.id] = (acc[meal.id] || 0) + 1;
      return acc;
    }, {});

    const myCartData = Object.keys(mealCounts).map((mealId) => ({
      user_id: user.id,
      meal_id: parseInt(mealId, 10),
      quantity: mealCounts[mealId],
    }));

    try {
      await axios.post("http://localhost:5000/myCart", myCartData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // ✅ Fetch updated cart after checkout
      const { data: updatedCart } = await axios.get("http://localhost:5000/myCart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMyCart(updatedCart);
      setCart([]); // ✅ Clear local cart after successful checkout
      alert("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to save cart items");
    }
  };

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <h2 className="text-3xl font-bold text-center pt-4 bg-slate-50 text-gray-800">
        🛒 Available Menu
      </h2>

      {/* ✅ Checkout Button Now Works! */}
      <button
        onClick={handleCheckout} // ✅ Working function
        className="bg-slate-50 text-grey-800 h-10 w-48 shadow-2xl hover:shadow-inner hover:shadow-amber-500 border-emerald-300 border absolute right-0 top-16 z-10 shadow-amber-500 px-2 py-1 rounded-lg ml-2">
        Checkout 🛒 {cart.length}
      </button>

      <div className="grid grid-cols-2 bg-slate-50 gap-2 h-screen p-8 pt-10">
        {currentMenu.map((meal) => {
          return (
            <div key={meal.id} className="bg-white shadow-2xl grid grid-cols-3 rounded-lg m-4 relative">
              <p className="font-serif col-start-1 font-thin text-gray-600 max-h-32 overflow-hidden w-1/3 hover:max-w-full hover:max-h-full hover:overflow-scroll hover:z-10 absolute px-2 bg-white shadow-lg">
                {meal.description}
              </p>
              <img
                src={meal.picture || "https://via.placeholder.com/150"}
                alt={meal.name}
                className="w-full h-full -py-2 p-1 rounded-xl hover:opacity-55 col-start-2"
              />
              <div className="col-start-3 grid grid-rows-2 pr-2">
                <h5 className="text-lg font-bold pt-2 text-black text-center">{meal.name}</h5>
                <p className="font-serif font-thin text-gray-600 flex">
                  In stock: 
                  <span className="text-center ml-4 -translate-y-1 font-semibold text-2xl">
                    {updatedRemainingMeals[meal.id] ?? meal.quantity}
                  </span>
                </p>
                <section className="flex justify-center items-center">
                  <button
                    onClick={() => setCart(cart.filter((item, index) => index !== cart.findIndex((item) => item.id === meal.id)))}
                    className="p-2 px-6 border border-slate-500 rounded-2xl hover:bg-amber-500"
                    disabled={updatedRemainingMeals[meal.id] === meal.quantity}
                  >-</button>
                  <p className="font-serif font-thin text-gray-900 -translate-y-2">
                    Ksh {meal.price}
                  </p>
                  <button
                    onClick={() => updatedRemainingMeals[meal.id] > 0 && setCart([...cart, meal])}
                    className="p-2 px-6 border border-slate-500 rounded-2xl hover:bg-green-500"
                    disabled={updatedRemainingMeals[meal.id] <= 0}
                  >+</button>
                </section>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default withAuth(OrderPage, ("caterer","user"));
