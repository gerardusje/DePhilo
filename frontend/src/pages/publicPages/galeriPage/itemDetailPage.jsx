import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "@/api";
import ItemDetail from "../../../components/galeri/itemDetail";
import Recommendations from "../../../components/galeri/recomendation";

export default function ItemDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Fetch item detail
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/items/${slug}`);
        const data = res.data;

        // 🔹 Pastikan category & location jadi string
        const categoryName = data.category?.name || "-";
        const locationName = data.location?.name || "-";

        setItem({ ...data, categoryName, locationName });
        setError("");
      } catch (err) {
        console.error(err);
        setError("Data tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  // --- Fetch recommendations
  // --- Fetch recommendations
  useEffect(() => {
    if (!item?.slug) return;

    const fetchRecommendations = async () => {
      try {
        const res = await api.get(`/items/${item.slug}/recommendations`);
        // Cek apakah res.data adalah array, kalau tidak gunakan fallback
        const recData = Array.isArray(res.data)
          ? res.data
          : res.data.items || [];

        const recs = recData.map((r) => ({
          ...r,
          categoryName: r.category?.name || r.category || "-",
          locationName: r.location?.name || r.location || "-",
        }));

        setRecommendations(recs);
      } catch (err) {
        console.error("Gagal ambil rekomendasi:", err);
      }
    };

    fetchRecommendations();
  }, [item]);

  // --- Kembali ke Galeri
  const goBack = () => {
    const sp = Object.fromEntries([...new URLSearchParams(location.search)]);

    const params = new URLSearchParams({
      ...(sp.category && { category: sp.category }),
      ...(sp.location && { location: sp.location }),
      priceMin: sp.priceMin || 0,
      priceMax: sp.priceMax || 1000000,
      ...(sp.sort && { sort: sp.sort }),
      ...(sp.search && { search: sp.search }),
      page: sp.page || 1,
    }).toString();

    navigate(`/galeri?${params}`);
  };

  if (loading) return <p className="pt-24 text-center">Loading...</p>;
  if (error)
    return (
      <div className="pt-24 text-center">
        <p>{error}</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Kembali
        </button>
      </div>
    );

  return (
    <div className="pt-24 px-6 pb-10 max-w-6xl mx-auto">
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Kembali
      </button>

      {/* ItemDetasil */}
      <ItemDetail item={item} />

      {/* Recommendations */}
      <Recommendations recommendations={recommendations} />
    </div>
  );
}
