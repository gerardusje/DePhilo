import React, { useState, useEffect } from "react";

const ModalBarang = ({ isOpen, onClose, onSubmit, itemData }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  // Pre-fill form saat edit
  useEffect(() => {
    if (itemData) {
      setName(itemData.name || "");
      setYear(itemData.year || "");
      setDescription(itemData.description || "");
      setPrice(itemData.price || "");
      setCategory(itemData.category || "");
      setImage(null); // user bisa pilih gambar baru jika mau
    } else {
      setName("");
      setYear("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
    }
  }, [itemData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation sederhana
    if (!name || !price || (!itemData && !image)) {
      alert("Nama, harga, dan gambar wajib diisi!");
      return;
    }

    // Kirim data ke parent
    onSubmit({ name, year, description, price, category, image });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">{itemData ? "Edit Barang" : "Tambah Barang"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tahun</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-2 py-1"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Harga</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
            {itemData?.imageUrl && !image && (
              <img src={itemData.imageUrl} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
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
            >
              {itemData ? "Simpan" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBarang;
