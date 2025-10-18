// src/pages/AdminPage.jsx
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center w-full h-full py-8 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
            Selamat Datang di Admin Dashboard
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Gunakan sidebar untuk navigasi ke halaman <strong>Barang</strong>, <strong>Kategori</strong>, <strong>Laporan</strong>, atau <strong>Pengaturan</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card contoh cepat untuk fitur */}
            <div className="bg-yellow-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer text-center">
              <h3 className="font-semibold text-lg">Barang</h3>
              <p className="text-gray-500 text-sm mt-1">Kelola data barang</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer text-center">
              <h3 className="font-semibold text-lg">Kategori</h3>
              <p className="text-gray-500 text-sm mt-1">Kelola kategori barang</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer text-center">
              <h3 className="font-semibold text-lg">Laporan</h3>
              <p className="text-gray-500 text-sm mt-1">Lihat laporan penjualan</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer text-center">
              <h3 className="font-semibold text-lg">Pengaturan</h3>
              <p className="text-gray-500 text-sm mt-1">Atur preferensi admin</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
