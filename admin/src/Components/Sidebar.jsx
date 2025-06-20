import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useContext } from "react";
import { ContextStore } from "../store/ContextStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { atoken, setaToken } = useContext(ContextStore);
  const handleLogout = () => {
    localStorage.removeItem("atoken");
    setaToken("");
    navigate("/");
  };

  const navLinks = [
    {
      path: "/add-item",
      label: "Add Item",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      path: "/list-item",
      label: "List Items",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      path: "/get-orders",
      label: "Orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md border-r border-gray-200 md:h-screen w-full md:w-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center p-4 md:block md:justify-center">
          <img
            src={logo}
            alt="Admin Logo"
            className="w-36 md:mx-auto hover:scale-105 transition-transform duration-200"
          />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col gap-3 mt-4 md:mt-8">
            {navLinks.map(({ path, label, icon }) => (
              <Link
                key={label}
                to={path}
                className="px-6 py-3 rounded-lg text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center space-x-3 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
