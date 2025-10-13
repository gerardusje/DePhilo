import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ModalBarang from "../../components/admin/modalBarang";

const BarangPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch semua barang dari backend
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data.items);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Hapus barang
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus barang.");
    }
  };

  // Tambah/Edit barang
  const handleAddEditItem = async (data) => {
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== null) formData.append(key, data[key]);
      }

      if (editItem) {
        // Edit
        await axios.put(`http://localhost:5000/api/items/${editItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Tambah
        await axios.post("http://localhost:5000/api/items", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowModal(false);
      setEditItem(null);
      fetchItems();
    } catch (err) {
      console.error("Gagal simpan barang:", err);
      alert("Gagal menyimpan barang.");
    }
  };

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Daftar Barang</h2>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => { setEditItem(null); setShowModal(true); }}
          >
            Tambah Barang
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tahun</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Deskripsi</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Harga</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kategori</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gambar</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.year || "-"}</td>
                  <td className="px-4 py-2">{item.description || "-"}</td>
                  <td className="px-4 py-2">{item.price.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-2">{item.category || "-"}</td>
                  <td className="px-4 py-2">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded" />}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                      onClick={() => { setEditItem(item); setShowModal(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    Tidak ada barang
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit Barang */}
        <ModalBarang
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEditItem}
          itemData={editItem}
        />
      </div>
    </DashboardLayout>
  );
};

export default BarangPage;
