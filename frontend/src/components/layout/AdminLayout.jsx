import React, { useState } from "react";
// import Header from "../admin/Header";
import Header from "../admin/Header"
import Sidebar from "../admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Konten utama */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? "16rem" : "5rem" }}
      >
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
