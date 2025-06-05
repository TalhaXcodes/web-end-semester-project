import React, { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);  // <-- added
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: isAdmin ? "admin" : "user",  // <-- role saved based on checkbox
      });
      alert("Signup successful");
      setEmail("");
      setPassword("");
      setIsAdmin(false);  // reset checkbox
      // Redirect based on role
      if (isAdmin) {
        navigate("/admin");  // admin panel home route
      } else {
        navigate("/");  // regular user home route
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // default role for Google signups
      });
      alert("Signup with Google successful");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-rose-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-rose-600 tracking-wide">
          Create an Account
        </h2>

        {/* FORM CONTENT */}
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-rose-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-rose-300"
          />

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            Register as Admin
          </label>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-white border border-rose-400 text-rose-600 font-semibold py-2 px-4 rounded-xl hover:bg-rose-100 transition duration-200"
          >
            Sign up with Google
          </button>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* LOGIN LINK BELOW FORM */}
        <div className="mt-6 text-center text-sm text-rose-500">
          Already have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer hover:text-rose-700"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>


  );
}

export default Signup;
