import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import useFetchItems from "./hooks/useFetchItems";
import useFetchItems from "./hooks/useFetchItem";
import SidebarFilter from "./SidebarFilter";
import GaleriView from "./GaleriView";



export default function CategoryDetail() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { fullItems = [], loading, error } = useFetchItems(categoryName);

  // Filter & UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allLocation, setAllLocation] = useState([]);

  // Setup awal: categories, locations, min/max price
  useEffect(() => {
    if (!fullItems?.length) return;
    const prices = fullItems.map(i => i.price || 0);
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
    setAllCategories([...new Set(fullItems.map(i => i.category))]);
    setAllLocation([...new Set(fullItems.map(i => i.location))]);
  }, [fullItems]);

  // Filter & sort
  const displayedItems = useMemo(() => {
    if (!fullItems?.length) return [];
    let filtered = fullItems.filter(item => {
      const inPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const inCategory = !selectedCategories.length || selectedCategories.includes(item.category);
      const inLocation = !selectedLocation.length || selectedLocation.includes(item.location);
      return inPrice && inCategory && inLocation;
    });

    if (sortOption === "price_asc") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "price_desc") filtered.sort((a, b) => b.price - a.price);
    if (sortOption === "newest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortOption === "oldest") filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return filtered;
  }, [fullItems, priceRange, sortOption, selectedCategories, selectedLocation]);

  const photos = useMemo(() =>
    displayedItems.map(i => ({
      src: i.imageUrl || "/placeholder.jpg",
      width: (i.width || 400) / 40,
      height: (i.height || 300) / 40,
      title: i.name,
      id: i._id
    }))
  , [displayedItems]);

  return (
    <main className="min-h-screen bg-neutral-50 py-16 px-4 md:px-10 relative">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tombol filter mobile */}
        <div className="md:hidden sticky top-16 z-40 bg-neutral-50 py-3 flex justify-end">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-yellow-700 text-white px-3 py-1 rounded-lg shadow"
          >
            {sidebarOpen ? "Tutup" : "Filter"}
          </button>
        </div>

        {/* Sidebar */}
        <SidebarFilter
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          initialFilter={{ priceRange, categories: selectedCategories, location: selectedLocation, sortOption }}
          allCategories={allCategories}
          allLocation={allLocation}
          minPriceAll={priceRange[0]}
          maxPriceAll={priceRange[1]}
          onFilterChange={({ priceRange, selectedCategories, selectedLocation, sortOption }) => {
            setPriceRange(priceRange);
            setSelectedCategories(selectedCategories);
            setSelectedLocation(selectedLocation);
            setSortOption(sortOption);
          }}
        />

        {/* Gallery */}
        <section className="md:col-span-3">
          {loading && <p className="text-center mt-10 text-gray-600">Memuat data...</p>}
          {error && <p className="text-center mt-10 text-red-500">{error}</p>}
          {!loading && !error && !displayedItems.length && (
            <p className="text-center mt-10 text-gray-500">Tidak ada item ditemukan</p>
          )}
          {displayedItems.length > 0 && <GaleriView photos={photos} navigate={navigate} />}
        </section>
      </div>
    </main>
  );
}