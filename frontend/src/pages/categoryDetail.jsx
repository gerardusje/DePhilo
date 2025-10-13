import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Range, getTrackBackground } from "react-range";

export default function CategoryDetail() {
  const { categoryName } = useParams();

  const [fullItems, setFullItems] = useState([]); // array of items
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Sort
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOption, setSortOption] = useState("");
  const [minPriceAll, setMinPriceAll] = useState(0);
  const [maxPriceAll, setMaxPriceAll] = useState(100000);

  // Fetch semua item kategori (mematuhi format backend { total, items })
  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5000/api/items", {
          params: { category: categoryName },
        });

        // Pastikan kita ambil array items dari response
        const items = Array.isArray(res.data?.items)
          ? res.data.items
          : Array.isArray(res.data)
          ? res.data
          : [];

        if (!isMounted) return;

        setFullItems(items);

        // compute price bounds defensif
        if (items.length > 0) {
          const prices = items
            .map((it) => {
              const p = Number(it?.price);
              return Number.isFinite(p) ? p : null;
            })
            .filter((p) => p !== null);

          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : minPrice || 100000;

          setMinPriceAll(minPrice);
          setMaxPriceAll(maxPrice);
          setPriceRange([minPrice, maxPrice]);
        } else {
          setMinPriceAll(0);
          setMaxPriceAll(100000);
          setPriceRange([0, 100000]);
        }
      } catch (err) {
        console.error("Fetch items error:", err);
        if (isMounted) {
          setError("Gagal memuat data kategori.");
          setFullItems([]); // fallback
          setDisplayedItems([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();
    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  // Filter & Sort (gunakan fullItems sebagai array)
  useEffect(() => {
    if (!Array.isArray(fullItems)) {
      setDisplayedItems([]);
      return;
    }

    // jika priceRange bermasalah, pakai bounds
    const [low, high] = [
      Number.isFinite(priceRange[0]) ? priceRange[0] : minPriceAll,
      Number.isFinite(priceRange[1]) ? priceRange[1] : maxPriceAll,
    ];

    let filtered = fullItems.filter((item) => {
      const p = Number(item?.price);
      if (!Number.isFinite(p)) return false;
      return p >= low && p <= high;
    });

    // sorting
    switch (sortOption) {
      case "price_asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "year_asc":
        filtered.sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case "year_desc":
        filtered.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "name_asc":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name_desc":
        filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setDisplayedItems(filtered);
  }, [fullItems, priceRange, sortOption, minPriceAll, maxPriceAll]);

  // Utility: format harga
  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value) || 0);

  return (
    <main className="min-h-screen bg-neutral-50 py-20">
      <div className="max-w-full mx-auto px-6 md:px-10">
        <Link
          to="/galeri"
          className="inline-block mb-4 text-yellow-800 hover:underline font-semibold"
        >
          ← Kembali ke Galeri
        </Link>

        {/* Header + Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-yellow-900 capitalize mb-3">
              Koleksi {categoryName}
            </h1>
            <p className="text-gray-700">
              Temukan koleksi {categoryName} terbaik dengan sejarah dan karakter uniknya.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center p-6 bg-white rounded-2xl shadow-lg gap-6">
            {/* Price Slider */}
            <div className="flex flex-col md:flex-1 space-y-2">
              <label className="text-gray-700 font-semibold text-sm">
                Harga: {formatRupiah(priceRange[0])} - {formatRupiah(priceRange[1])}
              </label>

              <Range
                step={1000}
                min={minPriceAll}
                max={maxPriceAll}
                values={priceRange}
                onChange={(vals) => {
                  // ensure array of numbers
                  setPriceRange([Number(vals[0]), Number(vals[1])]);
                }}
                renderTrack={({ props, children }) => {
                  // props mungkin mengandung key dari library, hindari spread key
                  const { key, ...restProps } = props;
                  return (
                    <div
                      {...restProps}
                      className="h-3 w-full rounded-full"
                      style={{
                        ...restProps.style,
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
                  );
                }}
                renderThumb={({ props, index }) => {
                  // destructure key out to avoid React dev warning about spreading key
                  const { key, ...restProps } = props;
                  return (
                    <div
                      {...restProps}
                      className="h-5 w-5 bg-yellow-700 rounded-full shadow-md relative"
                    >
                      <span className="absolute top-6 text-xs bg-white px-1 rounded text-gray-700">
                        {formatRupiah(priceRange[index])}
                      </span>
                    </div>
                  );
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex flex-col md:w-64">
              <label className="text-gray-700 font-semibold mb-1">Urutkan</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              >
                <option value="">-- Pilih --</option>
                <option value="price_asc">Harga: Murah → Mahal</option>
                <option value="price_desc">Harga: Mahal → Murah</option>
                <option value="year_asc">Tahun: Tua → Muda</option>
                <option value="year_desc">Tahun: Muda → Tua</option>
                <option value="name_asc">Nama: A → Z</option>
                <option value="name_desc">Nama: Z → A</option>
                <option value="newest">Terbaru → Terlama</option>
                <option value="oldest">Terlama → Terbaru</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading && <p className="text-gray-600">Memuat data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && displayedItems.length === 0 && (
          <p className="text-gray-600">Belum ada koleksi di kategori ini.</p>
        )}

        {!loading && !error && displayedItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
            {displayedItems.map((item) => (
              <div
                key={item._id || item.id}
                className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={item.imageUrl || "/placeholder.jpg"}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                  <p className="text-sm mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-sm mt-1">Tahun: {item.year}</p>
                  <p className="text-sm">Harga: {formatRupiah(item.price)}</p>
                  <Link
                    to={`/galeri/${categoryName}/${item._id || item.id}`}
                    className="mt-2 inline-block text-yellow-300 hover:underline text-sm"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
