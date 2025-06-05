import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/Logout";

// Replace this with your actual user auth logic
const isLoggedIn = true; // hardcoded for now; replace with actual auth state

const UserNavbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side: Site title + navigation links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-xl font-bold text-rose-600">
          🎁 BASKETRIES
        </Link>

        <Link to="/" className="text-rose-500 hover:text-rose-700 font-medium">
          Home
        </Link>
        <Link to="/about" className="text-rose-500 hover:text-rose-700 font-medium">
          About
        </Link>
        <Link to="/services" className="text-rose-500 hover:text-rose-700 font-medium">
          Services
        </Link>
        <Link to="/contact" className="text-rose-500 hover:text-rose-700 font-medium">
          Contact
        </Link>
      </div>

      {/* Right side: Auth */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-rose-500 hover:text-rose-700 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-rose-500 hover:text-rose-700 font-semibold"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
