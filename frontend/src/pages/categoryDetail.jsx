import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Range, getTrackBackground } from "react-range";

export default function CategoryDetail() {
    const { categoryName } = useParams();

    const [fullItems, setFullItems] = useState([]); // semua item kategori
    const [displayedItems, setDisplayedItems] = useState([]); // item yang tampil
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter & Sort
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [sortOption, setSortOption] = useState("");
    const [minPriceAll, setMinPriceAll] = useState(0);
    const [maxPriceAll, setMaxPriceAll] = useState(100000);

    // 1️⃣ Fetch semua item kategori
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get("http://localhost:5000/api/items", {
                    params: { category: categoryName },
                });
                setFullItems(res.data);

                if (res.data.length > 0) {
                    const prices = res.data.map(item => Number(item.price));
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    setMinPriceAll(minPrice);
                    setMaxPriceAll(maxPrice);
                    setPriceRange([minPrice, maxPrice]);
                }
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
                setError("Gagal memuat data kategori.");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [categoryName]);

    // 2️⃣ Filter & sort saat priceRange atau sortOption berubah
    useEffect(() => {
        if (!fullItems || fullItems.length === 0) return;

        let filtered = fullItems.filter(item =>
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        if (sortOption) {
            switch (sortOption) {
                case "price_asc":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case "price_desc":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case "year_asc":
                    filtered.sort((a, b) => a.year - b.year);
                    break;
                case "year_desc":
                    filtered.sort((a, b) => b.year - a.year);
                    break;
                case "name_asc":
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name_desc":
                    filtered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "newest":
                    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case "oldest":
                    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
            }
        }

        setDisplayedItems(filtered);
    }, [fullItems, priceRange, sortOption]);

    return (
        <main className="min-h-screen bg-neutral-50 py-20">
            <div className="max-w-full mx-auto px-6 md:px-10">
                <Link
                    to="/galeri"
                    className="inline-block mb-4 text-yellow-800 hover:underline font-semibold"
                >
                    ← Kembali ke Galeri
                </Link>
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 md:gap-8">
                    {/* Kolom 1: Deskripsi */}
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-yellow-900 capitalize mb-3">
                            Koleksi {categoryName}
                        </h1>
                        <p className="text-gray-700">
                            {`Temukan koleksi ${categoryName} terbaik dengan sejarah dan karakter uniknya.`}
                        </p>
                    </div>

                    {/* Kolom 2: Filter & Sort Controls */}
                    <div className="flex flex-col md:flex-row md:items-center p-6 bg-white rounded-2xl shadow-lg gap-6">

                        {/* Price Slider */}
                        <div className="flex flex-col md:flex-1 space-y-2">
                            {/* Label harga satu baris */}
                            <label className="text-gray-700 font-semibold text-m whitespace-nowrap">
                                Harga: Rp{priceRange[0].toLocaleString()} - Rp{priceRange[1].toLocaleString()}
                            </label>

                            <Range
                                step={1000}
                                min={minPriceAll}
                                max={maxPriceAll}
                                values={priceRange}
                                onChange={(values) => setPriceRange(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="h-3 w-full rounded-full"
                                        style={{
                                            ...props.style,
                                            background: getTrackBackground({
                                                values: priceRange,
                                                colors: ['#facc15', '#fde68a', '#facc15'],
                                                min: minPriceAll,
                                                max: maxPriceAll
                                            })
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props, index }) => (
                                    <div
                                        {...props}
                                        className="h-6 w-6 bg-yellow-700 rounded-full shadow-lg flex items-center justify-center"
                                    >
                                        {/* Label kecil di atas thumb */}
                                        <span className="absolute top-6 text-xs text-gray-700 bg-white px-1 rounded whitespace-nowrap">
                                            Rp{priceRange[index].toLocaleString()}
                                        </span>
                                    </div>
                                )}
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

                {loading && <p className="text-gray-600">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && displayedItems.length === 0 && (
                    <p className="text-gray-600">Belum ada koleksi di kategori ini.</p>
                )}

                {!loading && !error && displayedItems.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
                        {displayedItems.map((item) => (
                            <div
                                key={item._id}
                                className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    loading="lazy"
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                                    <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                                    <p className="text-sm mt-1">{item.description}</p>
                                    <p className="text-sm mt-1">Tahun: {item.year}</p>
                                    <p className="text-sm">Harga: Rp{item.price}</p>
                                    <Link
                                        to={`/galeri/${categoryName}/${item._id}`}
                                        className="mt-2 inline-block text-yellow-300 hover:underline text-sm"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                                <div className="p-4 bg-white md:hidden">
                                    <h3 className="font-serif font-bold text-lg text-yellow-900">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
