import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen p-6 border-r border-gray-200 bg-white shadow-lg">
      <div className="flex justify-center mb-8">
        <img
          src={logo}
          alt="Admin Logo"
          className="w-48 hover:scale-105 transition-transform duration-200"
        />
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <Link
          to="/add-item"
          className="px-6 py-3 rounded-lg text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center space-x-3 font-medium"
        >
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
          <span>Add Item</span>
        </Link>

        <Link
          to="/list-item"
          className="px-6 py-3 rounded-lg text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center space-x-3 font-medium"
        >
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
          <span>List Items</span>
        </Link>

        <Link
          to="/orders"
          className="px-6 py-3 rounded-lg text-gray-700 hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center space-x-3 font-medium"
        >
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
          <span>Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
