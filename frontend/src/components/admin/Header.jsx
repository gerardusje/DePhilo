import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onHamburgerClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#D8C690]/30 shadow-md p-4 flex justify-between items-center z-50 sticky top-0">
      {/* Hamburger untuk mobile */}
      <button
        className="md:hidden text-[#D8C690] text-2xl font-bold mr-2"
        onClick={onHamburgerClick}
      >
        ☰
      </button>

      {/* Judul */}
      <div className="flex flex-col">
        <h1 className="text-lg sm:text-xl font-bold text-[#D8C690] tracking-wide">
          Admin Dashboard
        </h1>
        <span className="text-xs font-normal text-gray-300">De Philo</span>
      </div>

      {/* User info dan Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 font-medium hidden sm:block">Admin</span>
        <button
          onClick={handleLogout}
          className="bg-[#D8C690] text-black px-3 py-1 rounded-md font-medium hover:bg-yellow-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
