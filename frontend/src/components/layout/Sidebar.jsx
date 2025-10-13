import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
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
      className={`bg-[#1E1E1E] text-white h-screen fixed top-0 left-0 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#D8C690]/30">
        <span className="font-bold text-lg">{isOpen ? "Admin" : "A"}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "⮜" : "⮞"}
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 hover:bg-gray-700 ${
              location.pathname === item.path ? "bg-gray-900" : ""
            }`}
          >
            {isOpen ? item.name : item.name[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
