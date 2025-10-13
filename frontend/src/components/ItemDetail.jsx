// src/components/ItemDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ItemDetail() {
  const { categoryName, itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // state modal
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token;

  const categories = ["kain", "patung", "mebel", "lukisan", "pernak-pernik"];

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${itemId}`);
        setItem(res.data);
        setFormData({
          name: res.data.name,
          description: res.data.description,
          year: res.data.year,
          price: res.data.price,
          category: res.data.category,
        });
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail item.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/items/${itemId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItem(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate item.");
    }
  };

  // Hapus item
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      navigate(`/galeri/${categoryName}`);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus item");
    }
  };

  if (loading) return <p className="text-gray-600 p-6">Memuat detail item...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!item) return <p className="text-gray-600 p-6">Item tidak ditemukan.</p>;

  return (
    <main className="min-h-screen bg-neutral-50 py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Link
          to={`/galeri/${categoryName}`}
          className="inline-block mb-4 text-yellow-800 hover:underline font-semibold"
        >
          ← Kembali ke {categoryName}
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            {!editing ? (
              <>
                <h1 className="text-3xl font-serif font-bold text-yellow-900 mb-2">{item.name}</h1>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-gray-600 mb-1">Tahun: {item.year}</p>
                <p className="text-gray-600 mb-4">Harga: Rp{item.price}</p>
                <p className="text-gray-500 text-sm">Kategori: {item.category}</p>

                {isAdmin && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setEditing(true)}
                      className="bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                      Edit Item
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                    >
                      Hapus Item
                    </button>
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama item"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Deskripsi"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Tahun"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Harga"
                  className="w-full p-2 border rounded"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-yellow-800 text-white px-4 py-2 rounded hover:bg-yellow-700"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modal Hapus */}
      {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full pointer-events-auto">
      <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
      <p className="mb-4">Apakah kamu yakin ingin menghapus item ini?</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
