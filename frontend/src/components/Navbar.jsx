// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "/favicon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = (path) => {
    setIsOpen(false);
    // Scroll ke atas saat klik Home atau brand
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#D8C690]/30 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className="flex items-center"
            >
              <img
                src={icon}
                alt="Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_3px_rgba(216,198,144,0.6)]"
              />
              <span className="ml-2 text-lg sm:text-xl font-bold text-[#D8C690] tracking-wide">
                De Philo
                <span className="block text-xs font-normal text-gray-300 -mt-1">
                  Cafe Art & Antique
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Galeri", path: "/galeri" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[#D8C690]"
                    : "text-gray-300 hover:text-[#D8C690]"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#D8C690] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#D8C690] focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#1E1E1E]/95 backdrop-blur-sm border-t border-[#D8C690]/30 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 py-4 space-y-3">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Galeri", path: "/galeri" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-[#D8C690] text-black"
                  : "text-gray-300 hover:bg-[#D8C690]/10 hover:text-[#D8C690]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
