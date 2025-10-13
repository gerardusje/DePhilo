import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token
    localStorage.removeItem("adminToken");
    // Redirect ke login
    navigate("/login");
  };

  return (
    <header className="bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#D8C690]/30 shadow-md p-4 flex justify-between items-center z-50 sticky top-0">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#D8C690] tracking-wide">
          Admin Dashboard
          <span className="block text-xs font-normal text-gray-300 -mt-1">
            De Philo
          </span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 font-medium">Admin</span>
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
