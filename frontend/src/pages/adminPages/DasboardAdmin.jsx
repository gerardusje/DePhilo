import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";
import api from "../../api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FFF"];

const DashboardAdmin = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryStats = async () => {
    try {
      const res = await api.get("/api/items");
      const items = res.data.items;

      // Hitung jumlah barang per kategori
      const stats = items.reduce((acc, item) => {
        const cat = item.category || "Lainnya";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      // Ubah ke format array untuk chart
      const data = Object.keys(stats).map((key) => ({
        name: key,
        value: stats[key],
      }));

      setCategoryStats(data);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-full">
        <h2 className="text-2xl font-bold mb-6">Statistik Kategori Barang</h2>

        {categoryStats.length === 0 ? (
          <p className="text-gray-500">Belum ada data barang.</p>
        ) : (
          <PieChart width={400} height={400}>
            <Pie
              data={categoryStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {categoryStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
