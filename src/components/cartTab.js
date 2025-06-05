import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/cart";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setCartItems } from "../stores/cart";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      // Clear cart in Firestore
      const cartRef = doc(db, "users", user.uid, "cart", "current");
      await setDoc(cartRef, { items: [] });

      // Clear Redux state
      dispatch(setCartItems([]));

      // Success message
      alert("Thank you for placing your order!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gradient-to-b from-rose-200 to-pink-100 shadow-2xl w-96 h-full grid grid-rows-[70px_1fr_80px]
      transform transition-transform duration-500 rounded-l-3xl z-50
      ${statusTab === false ? "translate-x-full" : ""}
      `}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-rose-300 bg-rose-400 rounded-tl-3xl">
        <h2 className="text-white text-xl font-bold tracking-wide">Your Cart</h2>
      </div>

      {/* Items */}
      <div className="px-6 py-4 overflow-y-auto space-y-4">
        {carts.length > 0 ? (
          carts.map((item, key) => <CartItem key={key} data={item} />)
        ) : (
          <p className="text-center text-rose-500 mt-8 font-semibold">Your cart is empty.</p>
        )}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 px-6 py-4 border-t border-rose-300 bg-white rounded-bl-3xl">
        <button
          onClick={handleCloseTabCart}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl font-semibold transition"
        >
          Close
        </button>
        <button onClick={handleCheckout}
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-xl font-semibold transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTab;
