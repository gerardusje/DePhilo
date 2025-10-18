import React, { useState } from "react";

export default function ItemDetail({ item }) {
  // Pastikan images array ada
  const images =
    item.images && item.images.length > 0
      ? item.images
      : item.imageUrl
      ? [item.imageUrl]
      : [];

  const [mainImage, setMainImage] = useState(images[0] || "");

  // Ambil nama kategori dan lokasi sebagai string
  const categoryName = item.category?.name || item.category || "-";
  const locationName = item.location?.name || item.location || "-";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
      {/* Thumbnail scrollable */}
      {images.length > 0 && (
        <div className="flex flex-row md:flex-col gap-2 md:w-24 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200">
          {images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`thumb-${index}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                mainImage === imgUrl ? "border-yellow-500" : "border-gray-200"
              }`}
              onClick={() => setMainImage(imgUrl)}
            />
          ))}
        </div>
      )}

      {/* Gambar utama */}
      <div className="flex-1">
        {mainImage ? (
          <img
            src={mainImage}
            alt={item.name}
            className="w-full h-96 md:h-[28rem] object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-96 md:h-[28rem] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
            Tidak ada gambar
          </div>
        )}
      </div>

      {/* Detail info */}
      <div className="flex-1 space-y-3">
        <h2 className="text-2xl font-bold text-yellow-800">{item.name}</h2>
        {item.year && <p className="text-gray-600">{item.year}</p>}
        <p className="text-gray-700">{categoryName}</p>
        <p className="text-gray-700">{locationName}</p>
        {item.price !== undefined && (
          <p className="text-lg font-semibold text-yellow-700">
            Rp{item.price.toLocaleString("id-ID")}
          </p>
        )}
        {item.description && (
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
}
