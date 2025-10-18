import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ModalBarang from "../../components/admin/modalBarang";
import api from "@/api";

const BarangPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 20;
  const token = localStorage.getItem("adminToken");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/items", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
        },
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

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus barang ini?")) return;
    try {
      await api.delete(`/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal hapus");
    }
  };

  const handleAddEditItem = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined)
          formData.append(key, data[key]);
      }
      if (editItem) {
        await api.put(`/items/${editItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/items", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      setEditItem(null);
      setCurrentPage(1);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal simpan");
    }
  };

  // Pagination
  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(...[1, 2, 3, 4, 5, "...", totalPages]);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages.map((p, i) => (
      <button
        key={i}
        className={`px-3 py-1 rounded whitespace-nowrap ${
          currentPage === p ? "bg-yellow-700 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => typeof p === "number" && setCurrentPage(p)}
        disabled={p === "..."}
      >
        {p}
      </button>
    ));
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 flex-1 flex flex-col gap-4 bg-gray-100 min-h-screen">
        {/* Top bar */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <div className="flex flex-wrap gap-2 items-center flex-1 min-w-0">
            <input
              type="text"
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex gap-1 overflow-x-auto py-1 min-w-0">
              {generatePagination()}
            </div>
          </div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex-shrink-0"
            onClick={() => {
              setEditItem(null);
              setShowModal(true);
            }}
          >
            Tambah Barang
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block flex-1 w-full p-2 overflow-auto">
          <div className="w-full h-full border rounded shadow bg-white overflow-auto">
            <div className="inline-block min-w-max p-2">
              <table className="table-auto border-collapse divide-y divide-gray-200 min-w-max">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left">Nama</th>
                    <th className="px-4 py-2 text-left">Tahun</th>
                    <th className="px-4 py-2 text-left">Deskripsi</th>
                    <th className="px-4 py-2 text-left">Harga</th>
                    <th className="px-4 py-2 text-left">Kategori</th>
                    <th className="px-4 py-2 text-left">Lokasi</th>
                    <th className="px-4 py-2 text-center">Gambar</th>
                    <th className="px-4 py-2 text-center">Edit</th>
                    <th className="px-4 py-2 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i}>
                          {Array.from({ length: 9 }).map((_, j) => (
                            <td key={j} className="px-4 py-2 animate-pulse bg-gray-100">&nbsp;</td>
                          ))}
                        </tr>
                      ))
                    : items.length > 0
                    ? items.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.year || "-"}</td>
                          <td className="px-4 py-2 truncate max-w-[250px]" title={item.description}>{item.description}</td>
                          <td className="px-4 py-2">{item.price?.toLocaleString("id-ID") || "-"}</td>
                          <td className="px-4 py-2">{item.category?.name || "-"}</td>
                          <td className="px-4 py-2">{item.location?.name || "-"}</td>
                          <td className="px-4 py-2 text-center">
                            {item.imageUrl && <img src={item.imageUrl} className="h-12 w-12 object-cover rounded mx-auto" />}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                              onClick={() => { setEditItem(item); setShowModal(true); }}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    : (
                      <tr>
                        <td colSpan={9} className="px-4 py-4 text-center text-gray-500">Tidak ada barang</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 border rounded shadow animate-pulse bg-gray-100 h-40 w-full" />
              ))
            : items.length > 0
            ? items.map((item) => (
                <div key={item._id} className="p-4 border rounded shadow flex flex-col gap-2 bg-white w-full min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        onClick={() => { setEditItem(item); setShowModal(true); }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p><strong>Tahun:</strong> {item.year || "-"}</p>
                  <p className="truncate" title={item.description}><strong>Deskripsi:</strong> {item.description}</p>
                  <p><strong>Harga:</strong> {item.price?.toLocaleString("id-ID") || "-"}</p>
                  <p><strong>Kategori:</strong> {item.category?.name || "-"}</p>
                  <p><strong>Lokasi:</strong> {item.location?.name || "-"}</p>
                  {item.imageUrl && <img src={item.imageUrl} className="h-32 w-full object-cover rounded mt-2" />}
                </div>
              ))
            : <p className="text-center text-gray-500">Tidak ada barang</p>}
        </div>

        {/* Modal */}
        <ModalBarang
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEditItem}
          itemData={editItem}
        />
      </div>
    </AdminLayout>
  );
};

export default BarangPage;
