// src/pages/AdminPage.jsx
import React from "react";
// import DashboardLayout from "../components/Layout/DashboardLayout";
import DashboardLayout from "../../components/layout/DashboardLayout";

const AdminPage = () => {
  return (
    <DashboardLayout>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Selamat Datang di Admin Dashboard
        </h2>
        <p className="text-gray-600">
          Gunakan sidebar untuk navigasi ke halaman Barang, Kategori, Laporan, atau Pengaturan.
        </p>
        {/* Konten tambahan halaman admin bisa ditambahkan di sini */}
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
