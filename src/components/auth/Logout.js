// src/components/auth/LogoutButton.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl transition duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
