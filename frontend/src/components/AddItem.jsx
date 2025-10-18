import React, { useState, useEffect } from "react";
import api from "../api";

const AddItem = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [customId, setCustomId] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil meta info dari backend
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await api.get("/items/meta");
        setCategories(res.data.categories);
        setLocations(res.data.locations);
      } catch (err) {
        console.error("Gagal load meta:", err);
      }
    };
    fetchMeta();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar!");
    if (!category || !location) return alert("Pilih kategori dan lokasi!");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("customId", customId);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("image", file);

    try {
      await api.post("/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setName("");
      setCustomId("");
      setYear("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setFile(null);
      onAdded();
      alert("Barang berhasil ditambahkan");
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mb-10">
      <h2 className="text-2xl font-bold mb-4">Tambah Barang Antik</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Barang"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Custom ID (unik)"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Tahun Pembuatan"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Keterangan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Kategori</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Lokasi</option>
          {locations.map((l) => (
            <option key={l._id} value={l._id}>{l.name}</option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Tambah Barang"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
