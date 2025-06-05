import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  const activeClass = "text-rose-700 font-bold border-b-2 border-rose-700";

  return (
    <nav className="bg-white border-b border-rose-300 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            {/* Logo or Admin Panel Title */}
            <div className="flex-shrink-0 flex items-center text-2xl font-extrabold text-rose-700">
              Admin Panel
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/admin/add-product"
                className={({ isActive }) =>
                  isActive ? activeClass : "text-rose-500 hover:text-rose-700"
                }
              >
                Add Product
              </NavLink>
              <NavLink
                to="/admin/product-table"
                className={({ isActive }) =>
                  isActive ? activeClass : "text-rose-500 hover:text-rose-700"
                }
              >
                Product Table
              </NavLink>
              <NavLink
                to="/admin/add-category"
                className={({ isActive }) =>
                  isActive ? activeClass : "text-rose-500 hover:text-rose-700"
                }
              >
                Add Category
              </NavLink>
              <NavLink
                to="/admin/category-table"
                className={({ isActive }) =>
                  isActive ? activeClass : "text-rose-500 hover:text-rose-700"
                }
              >
                Category Table
              </NavLink>
            </div>
          </div>

          {/* Optional: User profile or logout */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Placeholder for logout or user icon */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
