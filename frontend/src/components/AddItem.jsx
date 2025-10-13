import React, { useState } from "react";
import axios from "axios";

const AddItem = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return alert("Pilih minimal 1 gambar!");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("year", year);
    formData.append("origin", origin);
    formData.append("description", description);
    formData.append("price", price);

    for (const file of files) {
      formData.append("images", file);
    }

    try {
      await axios.post("http://localhost:5000/items", formData);
      setName(""); setYear(""); setOrigin(""); setDescription(""); setPrice(""); setFiles([]);
      onAdded(); // refresh list
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
        <input type="text" placeholder="Nama Barang" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Tahun Pembuatan" value={year} onChange={e => setYear(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Asal Barang" value={origin} onChange={e => setOrigin(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Keterangan" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Harga" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files))} className="w-full" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {loading ? "Uploading..." : "Tambah Barang"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
