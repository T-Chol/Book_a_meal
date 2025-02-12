import { useMenu } from "../context/menu";

// export default MenuComponent;
const MenuComponent = ({ menu, user }) => {
    if (!user || !user.role) {
        return <p>Please log in to view the menu.</p>;
    }


    const fetchMenuFromBackend = async () => {
        try {
            const response = await axios.get("http://localhost:5000/menu", {
                headers: { Authorization: `Bearer ${token}` }, // Include JWT token
            });

            const menuItems = response.data || [];

            // Update mealCounts & activeMeals based on backend data
            const mealCountsObj = {};
            const activeMealsObj = {};

            menuItems.forEach((menuItem) => {
                mealCountsObj[menuItem.id] = menuItem.quantity; // Store quantity
                activeMealsObj[menuItem.id] = true; // Mark as active
            });

            setMealCounts(mealCountsObj);
            setActiveMeals(activeMealsObj);
        } catch (error) {
            console.error("Error fetching menu:", error);
            setError("Failed to fetch menu data");
        }
    };
  const { inCart, setInCart } = useMenu();

  const addToCart = (item) => {
    setInCart([...inCart, item]);
  };
const cart = useMenu();
    return (
        <div>
            <h2>Today's Menu</h2>
            <ul className="p-4 border-b grid bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 grid-cols-4 gap-4 border-gray-200">
                {menu.map((item) => (<>
                    <div >
                    <li key={item.id} className="p-2 " >
                        <img src={item.picture} alt={item.name} className=" w-11/12 rounded-lg shadow-sm" />
                        <p><strong>{item.name}</strong></p>
                        <div className=" grid grid-cols-2 ">
                        <p className="row-start-2 col-start-1 w-1/3 ">Price: ${item.price}</p>
                        <p className="row-start-1 col-start-1">Available: {item.quantity}</p>
                        <input placeholder="qnty" type={Number}  className="row-start-1 col-start-2 text-center font-semibold rounded-lg  "></input>
                        <span className="row-start-2 col-start-2 w-2/3 bg-amber-500  text-white font-bold rounded-lg mt-3 transition duration-200" onClick={() => addToCart({ id: 1, name: 'Pizza', price: 10 })}>Add to Cart</span>
                        </div>

<p className="relative w-[250px] max-w-[250px] bg-white shadow-sm p-2 rounded-2xl shadow-amber-300
   text-black font-semibold hover:shadow-2xl hover:text-blue-900 group">

   {/* Default text (visible when NOT hovered) */}
   <div className=" hover:rounded-2xl p-2"> 
   <span className="block text-black text-center group-hover:hidden">
      Description
   </span>

   {/* Detailed description (visible ON hover) */}
   <span className="hidden group-hover:block absolute top-0 left-0 w-full h-52 overflow-scroll bg-white p-2 shadow-2xl ">
      {item.description}
   </span> </div>

</p>




                    </li>
                    </div>
</>
                ))}
            </ul>
        </div>
    );
};

export default MenuComponent;
