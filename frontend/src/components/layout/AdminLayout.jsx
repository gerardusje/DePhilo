import React, { useState } from "react";
import Header from "../admin/Header";
import Sidebar from "../admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar desktop */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        className="hidden md:flex"
      />

      {/* Sidebar mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}
      <Sidebar
        isOpen={true}
        setIsOpen={() => setMobileSidebarOpen(false)}
        className={`fixed top-0 left-0 z-50 h-full transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      />

      {/* Konten utama */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          md:ml-${sidebarOpen ? "64" : "20"} 
          ml-0
        `}
      >
        <Header onHamburgerClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
