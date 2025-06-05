import React, { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../stores/cart"; // Ensure this action exists in your cart slice
import { useNavigate } from "react-router-dom";  // <--- Added import

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  // <--- Added navigate hook

  // Fetch cart from Firestore and dispatch to Redux store
  const loadCartFromFirestore = async (userId) => {
    try {
      const cartRef = doc(db, "users", userId, "cart", "current");
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const data = cartSnap.data();
        dispatch(setCartItems(data.items || []));
      } else {
        dispatch(setCartItems([]));
      }
    } catch (err) {
      console.error("Failed to load cart from Firestore:", err);
      dispatch(setCartItems([]));
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await loadCartFromFirestore(user.uid);

      // 🔒 Check if user is admin
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.exists() ? userDocSnap.data() : null;

      alert("Login successful");

      if (userData?.role === "admin") {
        navigate("/admin"); // Redirect admin to /admin
      } else {
        navigate("/"); // Redirect normal user to homepage
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      await loadCartFromFirestore(user.uid);

      // 🔒 Check role for Google users too
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.exists() ? userDocSnap.data() : null;

      alert("Login with Google successful");

      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-300 via-rose-500 to-red-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-rose-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-rose-600 tracking-wide">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-rose-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-rose-300"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 mb-3"
        >
          Login
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-rose-400 text-rose-600 font-semibold py-2 px-4 rounded-xl hover:bg-rose-100 transition duration-200"
        >
          Sign in with Google
        </button>

        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
