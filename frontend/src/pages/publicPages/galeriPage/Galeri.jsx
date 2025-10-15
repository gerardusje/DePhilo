import React, {useState, useEffect, useMemo } from "react";
import SidebarFilter from "./SidebarFilter";
import useFetchItems from "./hooks/useFetchItem";
import { formatRupiah } from "./utils/formatRupiah";
import { useNavigate } from "react-router-dom";

export default function Galeri() {
  const navigate = useNavigate();
  const { items: allItems, loading, error } = useFetchItems();
  const [filter, setFilter] = useState({
    priceRange: [0, 0],
    categories: [],
    location: [],
    sortOption: "",
  });

  // --- Ambil data unik kategori & lokasi
  const allCategories = useMemo(
    () => [...new Set((allItems || []).map((item) => item.category))],
    [allItems]
  );
  const allLocation = useMemo(
    () => [...new Set((allItems || []).map((item) => item.location))],
    [allItems]
  );

  // --- Hitung harga minimum & maksimum
  const minPriceAll = useMemo(() => {
    if (!allItems?.length) return 0;
    return Math.min(...allItems.map((item) => item.price));
  }, [allItems]);

  const maxPriceAll = useMemo(() => {
    if (!allItems?.length) return 100000;
    return Math.max(...allItems.map((item) => item.price));
  }, [allItems]);

  // --- Set default filter harga
  useEffect(() => {
    if (allItems?.length > 0) {
      setFilter((prev) => ({
        ...prev,
        priceRange: [minPriceAll, maxPriceAll],
      }));
    }
  }, [allItems, minPriceAll, maxPriceAll]);

  // --- Filter item sesuai kriteria
  const filteredItems = useMemo(() => {
    if (!allItems) return [];
    return allItems
      .filter((item) => {
        const inCategory =
          !filter.categories.length || filter.categories.includes(item.category);
        const inLocation =
          !filter.location.length || filter.location.includes(item.location);
        const inPrice =
          item.price >= (filter.priceRange?.[0] ?? 0) &&
          item.price <= (filter.priceRange?.[1] ?? Infinity);
        return inCategory && inLocation && inPrice;
      })
      .sort((a, b) => {
        if (filter.sortOption === "price_asc") return a.price - b.price;
        if (filter.sortOption === "price_desc") return b.price - a.price;
        if (filter.sortOption === "newest")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (filter.sortOption === "oldest")
          return new Date(a.createdAt) - new Date(b.createdAt);
        return 0;
      });
  }, [allItems, filter]);

  if (loading) return <p className="pt-20 text-center">Loading...</p>;
  if (error) return <p className="pt-20 text-center">{error}</p>;

  return (
    <div className="flex pt-20 min-h-screen bg-gray-50 gap-4">
      {/* Sidebar Sticky */}
      <aside className="w-64 sticky top-20 h-fit self-start">
        <SidebarFilter
          filter={filter}
          allCategories={allCategories}
          allLocation={allLocation}
          minPriceAll={minPriceAll}
          maxPriceAll={maxPriceAll}
          onFilterChange={setFilter}
        />
      </aside>

      {/* Konten Galeri */}
      <div className="flex-1 overflow-y-auto pl-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/galeri/${item._id}`, { state: { item } })} // <-- kirim data via state
              className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-yellow-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.year}</p>
                <p className="text-sm text-gray-700">{item.category}</p>
                <p className="font-bold text-yellow-700">
                  Rp{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
