// src/components/ItemDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ItemDetail() {
  const { categoryName, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch item detail
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${itemId}`);
        const data = res.data?.item || res.data;
        if (!data || !data._id) {
          setError("Item tidak ditemukan di server.");
          setItem(null);
          return;
        }
        setItem(data);
      } catch (err) {
        console.error("❌ Gagal memuat item:", err);
        setError("Gagal memuat detail item dari server.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  // 🔹 Fallback view
  if (loading) return <p className="text-gray-600 p-6 animate-pulse">⏳ Memuat detail item...</p>;
  if (error) return <p className="text-red-500 p-6 text-center font-semibold">{error}</p>;
  if (!item) return <p className="text-gray-600 p-6 text-center">Item tidak ditemukan.</p>;

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
            src={item.imageUrl || "/placeholder.jpg"}
            alt={item.name || "Item"}
            className="w-full h-96 object-cover"
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          <div className="p-6">
            <h1 className="text-3xl font-serif font-bold text-yellow-900 mb-2">
              {item.name || "Tanpa Nama"}
            </h1>
            <p className="text-gray-700 mb-2">{item.description || "Tidak ada deskripsi."}</p>
            <p className="text-gray-600 mb-1">Tahun: {item.year || "Tidak diketahui"}</p>
            <p className="text-gray-600 mb-4">
              Harga: Rp{item.price?.toLocaleString("id-ID") || "0"}
            </p>
            <p className="text-gray-500 text-sm">Kategori: {item.category || "Tidak ada"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
