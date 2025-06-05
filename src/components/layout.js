import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import CartTab from "./cartTab";
import { useSelector } from "react-redux";
import CartSync from "./CartSync";
import UserNavbar from "./navbar/UserNavbar"; // <-- Import the new navbar`

const Layout = () => {
  const statusTabCart = useSelector((store) => store.cart.statusTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-rose-500 to-red-600">
      <CartSync />

      {/* User Navbar at top */}
      <UserNavbar />

      <main
        className={`w-[1200px] max-w-full m-auto px-4 py-6 transition-transform duration-500 ${
          statusTabCart === false ? "" : "-translate-x-56"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Header />
          <Outlet />
        </div>
      </main>

      <CartTab />
    </div>
  );
};

export default Layout;
