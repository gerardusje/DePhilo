import React, { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    description: "",
    price: "",
    category: "kain",
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await axios.post("http://localhost:5000/api/items", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage("Barang berhasil ditambahkan!");
      setForm({ name: "", year: "", description: "", price: "", category: "kain", image: null });
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat menambahkan barang.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-20 px-4 bg-neutral-50">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-yellow-900">Tambah Barang Baru</h2>

        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nama Barang" required className="w-full border p-2 rounded mb-4"/>
        <input type="text" name="year" value={form.year} onChange={handleChange} placeholder="Tahun" required className="w-full border p-2 rounded mb-4"/>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Keterangan" required className="w-full border p-2 rounded mb-4"/>
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Harga" required className="w-full border p-2 rounded mb-4"/>
        <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded mb-4">
          <option value="kain">Kain</option>
          <option value="patung">Patung</option>
          <option value="topeng">Topeng</option>
          <option value="lukisan">Lukisan</option>
          <option value="furniture">Furniture</option>
        </select>
        <input type="file" name="image" onChange={handleChange} accept="image/*" className="mb-4"/>
        <button type="submit" disabled={loading} className="w-full bg-yellow-900 text-white p-3 rounded hover:bg-yellow-800">
          {loading ? "Menyimpan..." : "Simpan Barang"}
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
