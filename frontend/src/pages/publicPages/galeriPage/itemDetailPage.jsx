import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api"

export default function ItemDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const [mainImage, setMainImage] = useState(item?.imageUrl);
  const [recommendations, setRecommendations] = useState([]);

  if (!item) {
    return (
      <div className="pt-24 text-center">
        <p>Data tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Kembali
        </button>
      </div>
    );
  }

  const images = item.images || [item.imageUrl]; // array foto

  // === Ambil rekomendasi dari API ===
  // Ganti useEffect rekomendasi:
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get(`/items/${item._id}/recommendations`);
        setRecommendations(res.data);
      } catch (err) {
        console.error("Gagal ambil rekomendasi:", err);
      }
    };

    fetchRecommendations();
  }, [item]);


  return (
    <div className="pt-24 px-6 pb-10 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Kembali
      </button>

      {/* ======= Detail utama ======= */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Thumbnail scrollable */}
        <div className="flex flex-row md:flex-col gap-2 md:w-24 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200">
          {images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`thumb-${index}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer border ${mainImage === imgUrl ? "border-yellow-500" : "border-gray-200"
                }`}
              onClick={() => setMainImage(imgUrl)}
            />
          ))}
        </div>

        {/* Gambar utama */}
        <div className="flex-1">
          <img
            src={mainImage}
            alt={item.name}
            className="w-full h-96 md:h-[28rem] object-cover rounded-xl"
          />
        </div>

        {/* Detail info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold text-yellow-800">{item.name}</h2>
          <p className="text-gray-600">{item.year}</p>
          <p className="text-gray-700">{item.category}</p>
          <p className="text-lg font-semibold text-yellow-700">
            Rp{item.price.toLocaleString()}
          </p>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* ======= Rekomendasi ======= */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">
            Rekomendasi Lainnya
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec._id}
                onClick={() =>
                  navigate(`/item/${rec._id}`, { state: { item: rec } })
                }
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={rec.imageUrl}
                  alt={rec.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <h4 className="font-semibold text-yellow-900 text-sm truncate">
                    {rec.name}
                  </h4>
                  <p className="text-xs text-gray-600">{rec.location}</p>
                  <p className="text-sm font-bold text-yellow-700">
                    Rp{rec.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
