import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { LuHotel } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const toast = useToast();
  const { Logout } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Logout function
  const handleLogout = () => {
    Logout()
      .then(() => {
        setIsProfileOpen(false);
        toast.info("Logout successful!.");
      })
      .catch((error) => {
        toast.error("An error happened.");
      });
  };

  return (
    <div className="navbar shadow-md sticky top-0 z-50 transition-colors duration-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg lg:text-xl flex items-center gap-0"
        >
          <LuHotel className="text-blue-600" />
          <span className="font-bold text-blue-600">Hotel</span>
          <span className="font-light ml-1">Nest</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900 dark:text-white"
                  : "hover:bg-blue-50 hover:text-blue-600 rounded-lg dark:hover:bg-blue-900 dark:hover:text-white"
              }
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900 dark:text-white"
                  : "hover:bg-blue-50 hover:text-blue-600 rounded-lg dark:hover:bg-blue-900 dark:hover:white"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center">
        {/* User profile with dropdown*/}
        <div className="relative mr-4" ref={profileDropdownRef}>
          <div className="group tooltip-trigger relative">
            <div
              className="avatar cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img
                  className="rounded-full"
                  src="https://i.ibb.co/MDfpbH6T/profile.webp"
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transition-colors duration-200 bg-white dark:bg-gray-700">
              <div className="px-4 py-2 text-sm border-b text-gray-700 border-gray-200 dark:text-gray-200 dark:border-gray-600">
                <p className="font-semibold">Jhon Doe</p>
                <p className="text-xs">jhondoe@example.com</p>
              </div>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <ul className="hidden lg:flex gap-2 mr-4">
          <li>
            <Link
              to="/login"
              className="btn btn-outline btn-primary text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
            >
              Register
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <CiMenuFries className="text-xl" />
          </label>

          {/* dropdown menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 transition-colors duration-200 bg-base-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <li>
              <NavLink to="/rooms">Rooms</NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings">My Bookings</NavLink>
            </li>
            <>
              <li className="border-t mt-2 pt-2 border-gray-200 dark:border-gray-600">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};
