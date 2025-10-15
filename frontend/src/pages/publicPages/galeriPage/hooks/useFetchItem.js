import { useState, useEffect } from "react";
import api from "../../../../api";

export default function useFetchAllItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await api.get("/items"); // ambil semua tanpa filter
        if (!active) return;
        setItems(Array.isArray(res.data?.items) ? res.data.items : []);
      } catch (err) {
        if (!active) return;
        setError("Gagal memuat data.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchItems();
    return () => (active = false);
  }, []);

  return { items, loading, error };
}
