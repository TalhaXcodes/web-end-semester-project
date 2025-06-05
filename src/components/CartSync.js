import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { setCartItems } from "../stores/cart";

function CartSync() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // On login, load cart from Firestore and update Redux store
        try {
          const cartRef = doc(db, "users", user.uid, "cart", "current");
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const data = cartSnap.data();
            if (data?.items) {
              dispatch(setCartItems(data.items)); // populate redux cart
              console.log("Cart loaded from Firestore");
            }
          }
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      } else {
        // User logged out: optionally clear cart in redux or keep it (your choice)
        // dispatch(setCartItems([])); // uncomment if you want to clear cart on logout
        console.log("User logged out, cart sync stopped");
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  // Save cart to Firestore on every cart change (if user logged in)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const saveCart = async () => {
      try {
        const cartRef = doc(db, "users", user.uid, "cart", "current");
        await setDoc(cartRef, { items: cart });
        console.log("Cart synced to Firestore");
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    };

    saveCart();
  }, [cart]);

  return null;
}

export default CartSync;
