import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Menu, X, ShoppingCart } from "lucide-react";
import { ContextStore } from "../store/ContextStore";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, cartList } = useContext(ContextStore);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const cartItemCount = Object.values(cartList).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu}>
              <img
                src={assets.logo}
                className="w-48 h-24 object-contain hover:scale-110 transition-transform duration-200"
                alt="Brand Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <NavItem to="/" label="HOME" />
            <NavItem to="/collection" label="COLLECTION" />
            <NavItem to="/about" label="ABOUT" />
            <NavItem to="/contact" label="CONTACT" />
            {isLoggedIn && <NavItem to="/orders" label="MY ORDERS" />}

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-pink-500 transition" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <NavItem to="/" label="HOME" mobile closeMenu={closeMenu} />
            <NavItem
              to="/collection"
              label="COLLECTION"
              mobile
              closeMenu={closeMenu}
            />
            <NavItem to="/about" label="ABOUT" mobile closeMenu={closeMenu} />
            <NavItem
              to="/contact"
              label="CONTACT"
              mobile
              closeMenu={closeMenu}
            />
            {isLoggedIn && (
              <NavItem
                to="/orders"
                label="MY ORDERS"
                mobile
                closeMenu={closeMenu}
              />
            )}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2 px-2 text-sm font-semibold"
            >
              <ShoppingCart className="w-5 h-5" /> Cart ({cartItemCount})
            </Link>

            <Link
              to="/admin"
              onClick={closeMenu}
              className="text-sm font-semibold text-black px-2"
            >
              Admin Panel
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="px-4 py-2 text-sm text-center border rounded-full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm text-center border rounded-full"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm text-center bg-pink-500 text-white rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Nav Item
const NavItem = ({ to, label, mobile = false, closeMenu = () => {} }) => (
  <Link
    to={to}
    onClick={closeMenu}
    className={`${
      mobile ? "text-sm px-2" : "text-sm"
    } text-gray-800 hover:text-pink-500 font-semibold transition-colors`}
  >
    {label}
  </Link>
);

export default Navbar;
