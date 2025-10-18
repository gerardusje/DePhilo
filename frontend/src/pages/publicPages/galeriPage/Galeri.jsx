import React, { useEffect, useState } from "react";
import SidebarFilter from "./SidebarFilter";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setPage } from "@/store/filterSlice";
import api from "@/api";

export default function Galeri() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState({
    categories: [],
    locations: [],
    minPrice: 0,
    maxPrice: 1000000,
  });

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);

  const itemsPerPage = 30;

  /** 🔹 Build query string untuk URL */
  const buildQuery = (filter, page) => {
    const qs = {};
    if (filter.categories?.length) qs.category = filter.categories.join(",");
    if (filter.location?.length) qs.location = filter.location.join(",");
    if (filter.priceRange?.length) {
      qs.priceMin = filter.priceRange[0];
      qs.priceMax = filter.priceRange[1];
    }
    if (filter.sortOption) qs.sort = filter.sortOption;
    if (filter.search) qs.search = filter.search;
    qs.page = page;
    return new URLSearchParams(qs).toString();
  };

  /** 🧠 Ambil state dari sessionStorage atau URL */
  useEffect(() => {
    const saved = sessionStorage.getItem("galeri_state");
    const fromURL = Object.fromEntries([...searchParams]);
    const isDetail = /^\/galeri\/[^/]+$/.test(location.pathname);

    // 📦 Jika dari detail atau reload di detail, jangan reset filter
    if (isDetail) {
      setInitialized(true);
      return;
    }

    if (saved && Object.keys(fromURL).length === 0) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(setFilter({ ...parsed.filter, resetPage: false }));
        dispatch(setPage(parsed.page || 1));
      } catch (err) {
        console.warn("Gagal parse sessionStorage:", err);
      }
    } else {
      const categories = fromURL.category?.split(",") || [];
      const locations = fromURL.location?.split(",") || [];
      const priceRange = [
        Number(fromURL.priceMin) || 0,
        Number(fromURL.priceMax) || 1000000,
      ];
      const sortOption = fromURL.sort || "";
      const search = fromURL.search || "";
      const page = Number(fromURL.page) || 1;

      dispatch(
        setFilter({
          categories,
          location: locations,
          priceRange,
          sortOption,
          search,
          resetPage: false,
        })
      );
      dispatch(setPage(page));
    }

    setTimeout(() => setInitialized(true), 50);
  }, [dispatch, location.pathname]);

  /** 💾 Simpan state ke sessionStorage dan URL */
  useEffect(() => {
    if (!initialized) return;

    sessionStorage.setItem(
      "galeri_state",
      JSON.stringify({ filter, page: currentPage })
    );

    // 🔹 Update URL hanya jika di /galeri
    if (location.pathname === "/galeri") {
      setSearchParams(buildQuery(filter, currentPage), { replace: true });
    }
  }, [filter, currentPage, initialized, location.pathname]);

  /** 📦 Ambil metadata */
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await api.get("/items/meta");
        setMeta({
          categories: res.data.categories,
          locations: res.data.locations,
          minPrice: res.data.minPrice,
          maxPrice: res.data.maxPrice,
        });
      } catch (err) {
        console.error("Gagal fetch meta:", err);
      }
    };
    fetchMeta();
  }, []);

  /** 📡 Ambil data item */
  useEffect(() => {
    if (!initialized || location.pathname !== "/galeri") return;

    let isCancelled = false;

    const fetchItems = async () => {
      try {
        setError("");
        const currentFilter = JSON.stringify(filter); // simpan snapshot filter
        setLoading(true);

        const params = {
          page: currentPage,
          limit: itemsPerPage,
          ...(filter.categories.length && {
            category: filter.categories.join(","),
          }),
          ...(filter.location.length && {
            location: filter.location.join(","),
          }),
          priceMin: filter.priceRange[0],
          priceMax: filter.priceRange[1],
          ...(filter.sortOption && { sort: filter.sortOption }),
          ...(filter.search && { search: filter.search }),
        };

        const res = await api.get("/items", { params });

        // 🔹 Cegah update state jika filter sudah berubah
        if (isCancelled || JSON.stringify(filter) !== currentFilter) return;

        // 🔹 Transisi halus: tahan sejenak agar tidak flicker di slider cepat
        setTimeout(() => {
          setItems(res.data.items);
          setTotalPages(Math.ceil(res.data.totalItems / itemsPerPage));
          setLoading(false);
        }, 150);
      } catch (err) {
        if (isCancelled) return;
        console.error("❌ Fetch error:", err);
        setError("Gagal memuat data");
        setLoading(false);
      }
    };

    fetchItems();

    return () => {
      isCancelled = true; // hentikan update jika filter berubah di tengah jalan
    };
  }, [filter, currentPage, initialized, location.pathname]);

  /** 🎛️ Ganti filter */
  const handleFilterChange = (newFilter) => {
    dispatch(setFilter({ ...newFilter, resetPage: true }));
    dispatch(setPage(1));
  };

  /** 📄 Ganti halaman */
  const goToPage = (page) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** 🔍 Ke detail */
  const goToDetail = (slug) => {
    // Simpan filter + page sebelum pindah
    sessionStorage.setItem(
      "galeri_state",
      JSON.stringify({ filter, page: currentPage })
    );
    navigate(`/galeri/${slug}`); // tanpa query
  };

  /** 💎 Skeleton */
  const SkeletonItem = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse flex flex-col h-[320px]">
      <div className="h-40 bg-gray-200" />
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="h-5 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  );

  /** 🔢 Pagination */
  const generatePagination = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l > 2) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  /** 💥 UI */
  return (
    <div className="flex pt-16 min-h-screen bg-gray-50 gap-4 mx-3">
      {/* Sidebar kiri */}
      <aside className="hidden lg:block w-fit sticky top-20 h-fit self-start">
        <SidebarFilter
          filter={filter}
          allCategories={meta.categories}
          allLocation={meta.locations}
          minPriceAll={meta.minPrice}
          maxPriceAll={meta.maxPrice}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Konten kanan */}
      <div className="flex-1 relative">
        {totalPages > 1 && (
          <div className="sticky top-[64px] z-30 bg-gray-50/95 backdrop-blur-sm border-b rounded-b-3xl border-gray-200 py-3 flex justify-center flex-wrap gap-2">
            {generatePagination(currentPage, totalPages).map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-2 text-gray-400 select-none">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-yellow-700 text-white shadow-sm scale-105"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}

        {error && <p className="pt-20 text-center text-red-600">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10 pt-4">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <SkeletonItem key={i} />)
            : items.map((item) => {
                console.log("DEBUG ITEM:", item); // 🔹 debug item

                return (
                  <div
                    key={item._id}
                    onClick={() => goToDetail(item.slug)}
                    className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-[320px]"
                  >
                    <img
                      src={item.imageUrl || item.images?.[0]} // fallback jika imageUrl tidak ada
                      alt={item.name}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col justify-between flex-grow p-3">
                      <div>
                        <h3 className="font-semibold text-yellow-900 text-sm line-clamp-2 h-[38px]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {console.log("DEBUG CATEGORY:", item.category)}
                          {console.log("DEBUG LOCATION:", item.location)}
                          {item.category?.name || "-"} |{" "}
                          {item.location?.name || "-"}
                        </p>
                      </div>
                      <p className="font-bold text-yellow-700 mt-2 text-sm">
                        Rp{item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                );
              })}

          {!loading && items.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada item
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
