// Sidebar.js
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, className }) => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Barang", path: "/admin/barang" },
    { name: "Kategori", path: "/admin/kategori" },
    { name: "Laporan", path: "/admin/laporan" },
    { name: "Pengaturan", path: "/admin/settings" },
  ];

  return (
    <div
      className={`bg-[#1E1E1E] text-white h-full flex flex-col transition-all duration-300 ${className} ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header Sidebar */}
      <div className="flex justify-between items-center p-4 border-b border-[#D8C690]/30">
        <span className={`font-bold text-lg transition-all duration-300`}>
          {isOpen ? "Admin" : "A"}
        </span>
        {/* Tombol collapse hanya untuk desktop */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:block hidden p-1 hover:bg-gray-700 rounded transition-colors"
          title={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? "⮜" : "⮞"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-4 flex-1 flex flex-col">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 rounded-md mb-1
                text-sm font-medium transition-all duration-200
                ${active ? "bg-yellow-700 text-white" : "hover:bg-gray-700"}
              `}
              title={item.name}
            >
              {/* Tampilkan huruf pertama saat collapsed */}
              <span className="flex-shrink-0 w-6 text-center">
                {isOpen ? "" : item.name[0]}
              </span>
              {isOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
