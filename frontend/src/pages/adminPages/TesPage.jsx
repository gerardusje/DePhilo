import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ModalBarang from "../../components/admin/modalBarang";
import api from "@/api";

const TesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;
  const token = localStorage.getItem("adminToken");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/items", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: itemsPerPage, search: debouncedSearch },
      });
      setItems(res.data.items);
      setTotalPages(Math.ceil(res.data.totalItems / itemsPerPage));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, token]);

  useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);
  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus barang ini?")) return;
    try {
      await api.delete(`/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchItems();
    } catch (err) { console.error(err); alert(err.response?.data?.message || "Gagal hapus"); }
  };

  const handleAddEditItem = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) formData.append(key, data[key]);
      }
      if (editItem) {
        await api.put(`/items/${editItem._id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.post("/items", formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowModal(false); setEditItem(null); setCurrentPage(1); fetchItems();
    } catch (err) { console.error(err); alert(err.response?.data?.message || "Gagal simpan"); }
  };

  const SkeletonRow = () => (
    <tr>{Array.from({ length: 12 }).map((_, i) => <td key={i} className="px-4 py-2 animate-pulse bg-gray-100">&nbsp;</td>)}</tr>
  );

  const generatePagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 rounded ${currentPage === i ? "bg-yellow-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setCurrentPage(i)}
        >{i}</button>
      );
    }
    return pages;
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-4">

        {/* Top bar: tidak ikut scroll */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <input
              type="text"
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 border rounded flex-1 min-w-[200px]"
            />
            {totalPages > 1 && <div className="flex gap-1 flex-wrap">{generatePagination()}</div>}
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => { setEditItem(null); setShowModal(true); }}>Tambah Barang</button>
        </div>

        {/* Table wrapper: scroll horizontal */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-max table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Tahun</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2">Lokasi</th>
                <th className="px-4 py-2">Gambar</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                <th className="px-4 py-2">Delete</th>
                {/* Tambahkan kolom tambahan jika perlu */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : items.length > 0 ? items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.year || "-"}</td>
                    <td className="px-4 py-2 truncate max-w-[250px]" title={item.description}>{item.description}</td>
                    <td className="px-4 py-2">{item.price?.toLocaleString("id-ID") || "-"}</td>
                    <td className="px-4 py-2">{item.category?.name || "-"}</td>
                    <td className="px-4 py-2">{item.location?.name || "-"}</td>
                    <td className="px-4 py-2">{item.imageUrl && <img src={item.imageUrl} className="h-12 w-12 object-cover rounded" />}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={() => { setEditItem(item); setShowModal(true); }}>Edit</button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={9} className="px-4 py-4 text-center text-gray-500">Tidak ada barang</td></tr>
                )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <ModalBarang isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddEditItem} itemData={editItem} />
      </div>
    </AdminLayout>
  );
};

export default TesPage;
