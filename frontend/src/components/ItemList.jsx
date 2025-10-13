import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus barang ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Delete gagal");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Daftar Barang Antik</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item._id} className="border rounded shadow p-4">
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.year} - {item.origin}</p>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="font-bold mb-2">Rp {item.price}</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {item.images.map(img => (
                <img key={img.public_id} src={img.url} alt={item.name} className="w-full h-32 object-cover rounded" />
              ))}
            </div>
            <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
