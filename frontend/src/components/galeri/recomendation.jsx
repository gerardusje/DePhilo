import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Recommendations({ recommendations }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-yellow-800 mb-4">
        Rekomendasi Lainnya
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map((rec) => {
          // Ambil category & location sebagai string
          const categoryName = rec.category?.name || rec.category || "-";
          const locationName = rec.location?.name || rec.location || "-";
          const image = rec.images && rec.images.length > 0 ? rec.images[0] : rec.imageUrl || "";

          return (
            <div
              key={rec.slug || rec._id}
              onClick={() =>
                navigate(`/galeri/${rec.slug}`, {
                  state: {
                    filter: location.state?.filter || {},
                    currentPage: location.state?.currentPage || 1,
                  },
                })
              }
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              {image ? (
                <img
                  src={image}
                  alt={rec.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  Tidak ada gambar
                </div>
              )}

              <div className="p-2">
                <h4 className="font-semibold text-yellow-900 text-sm truncate">
                  {rec.name}
                </h4>
                <p className="text-xs text-gray-600">{locationName}</p>
                {rec.price !== undefined && (
                  <p className="text-sm font-bold text-yellow-700">
                    Rp{rec.price.toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
