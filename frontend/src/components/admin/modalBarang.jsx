import React, { useState, useEffect } from "react";
import api from "@/api";

const ModalBarang = ({ isOpen, onClose, onSubmit, itemData }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]); // file baru
  const [previewImages, setPreviewImages] = useState([]); // URL preview baru + lama
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil kategori & lokasi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Token admin tidak ditemukan");

        const catRes = await api.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const locRes = await api.get("/locations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(catRes.data.categories || []);
        setLocations(locRes.data.locations || []);
      } catch (err) {
        console.error(
          "Gagal fetch kategori/lokasi:",
          err.response?.data || err.message || err
        );
        alert(
          "Gagal mengambil kategori atau lokasi. Cek console untuk detail error."
        );
      }
    };
    fetchData();
  }, []);

  // Pre-fill form saat edit
  useEffect(() => {
    if (itemData) {
      setName(itemData.name || "");
      setYear(itemData.year || "");
      setDescription(itemData.description || "");
      setPrice(itemData.price || "");
      setCategory(itemData.category?._id || "");
      setLocation(itemData.location?._id || "");
      setImages([]);
      setPreviewImages(itemData.images || []);
    } else {
      setName("");
      setYear("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setImages([]);
      setPreviewImages([]);
    }
  }, [itemData, isOpen]);

  // Tambah gambar baru
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // Hapus preview gambar baru atau lama
  const handleRemoveImage = (index) => {
    // jika index termasuk gambar baru
    if (index >= previewImages.length - images.length) {
      const imgIndex = index - (previewImages.length - images.length);
      setImages((prev) => prev.filter((_, i) => i !== imgIndex));
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || (!itemData && images.length === 0)) {
      alert("Nama, harga, dan minimal 1 gambar wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("location", location);

      images.forEach((file) => formData.append("images", file));

      const token = localStorage.getItem("adminToken");

      if (itemData) {
        await api.put(`/items/${itemData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/items", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert(itemData ? "Item berhasil diupdate" : "Item berhasil ditambahkan");
      onSubmit();
      onClose();
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        "Terjadi kesalahan saat upload item. Cek console untuk detail error."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-white rounded shadow-lg w-full max-w-6xl p-6 relative">
        <h2 className="text-2xl font-bold mb-6">
          {itemData ? "Edit Barang" : "Tambah Barang"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Barang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Tahun Pembuatan"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih lokasi</option>
              {locations.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.name}
                </option>
              ))}
            </select>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Gambar</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {previewImages.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="h-24 w-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 md:col-span-2"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-700"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : itemData ? "Simpan" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBarang;
