import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { formatRupiah } from "./utils/formatRupiah";

export default function SidebarFilter({
  filter = { priceRange: [], categories: [], location: [], sortOption: "" },
  allCategories = [],
  allLocation = [],
  minPriceAll = 0,
  maxPriceAll = 100000,
  onFilterChange = () => { },
}) {
  // State lokal
  const [priceRange, setPriceRange] = useState([minPriceAll, maxPriceAll]);
  const [categories, setCategories] = useState(filter.categories);
  const [location, setLocation] = useState(filter.location);
  const [sortOption, setSortOption] = useState(filter.sortOption);

  // Reset harga jika min/max berubah
  useEffect(() => {
    setPriceRange([minPriceAll, maxPriceAll]);
  }, [minPriceAll, maxPriceAll]);

  // Kirim perubahan ke parent
  useEffect(() => {
    onFilterChange({
      priceRange,
      categories,
      location,
      sortOption,
    });
  }, [priceRange, categories, location, sortOption]);

  return (
    <aside className="sticky top-16 w-72 h-[calc(100vh-4rem)] bg-white shadow-2xl p-6 overflow-y-auto rounded-r-2xl">

      {/* Harga */}
      <div>
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Harga</h3>
        <p className="text-sm text-gray-700 mb-2">
          {formatRupiah(priceRange[0])} - {formatRupiah(priceRange[1])}
        </p>
        <Range
          step={1000}
          min={minPriceAll}
          max={maxPriceAll}
          values={priceRange}
          onChange={setPriceRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-3 w-full rounded-full"
              style={{
                background: getTrackBackground({
                  values: priceRange,
                  colors: ["#ddd", "#facc15", "#ddd"],
                  min: minPriceAll,
                  max: maxPriceAll,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={index}
              className="h-5 w-5 bg-yellow-700 rounded-full shadow-md"
            />
          )}
        />
      </div>

      {/* Urutkan */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Urutkan</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full bg-white shadow-sm"
        >
          <option value="">-- Pilih --</option>
          <option value="price_asc">Harga: Murah → Mahal</option>
          <option value="price_desc">Harga: Mahal → Murah</option>
          <option value="newest">Terbaru → Terlama</option>
          <option value="oldest">Terlama → Terbaru</option>
        </select>
      </div>

      {/* Kategori */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Kategori</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategories([])}
            className={`px-3 py-1 rounded-full text-sm font-medium ${categories.length === 0
                ? "bg-yellow-700 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
              }`}
          >
            Semua
          </button>
          {allCategories.map((cat) => {
            const active = categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() =>
                  setCategories((prev) =>
                    active ? prev.filter((c) => c !== cat) : [...prev, cat]
                  )
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${active ? "bg-yellow-700 text-white" : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lokasi */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Asal Daerah</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLocation([])}
            className={`px-3 py-1 rounded-full text-sm font-medium ${location.length === 0
                ? "bg-yellow-700 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
              }`}
          >
            Semua
          </button>
          {allLocation.map((loc) => {
            const active = location.includes(loc);
            return (
              <button
                key={loc}
                onClick={() =>
                  setLocation((prev) =>
                    active ? prev.filter((l) => l !== loc) : [...prev, loc]
                  )
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${active ? "bg-yellow-700 text-white" : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
                  }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
