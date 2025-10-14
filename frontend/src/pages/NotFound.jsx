// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import CornerOrnament from "../components/ornament/CornerOrnament"; // opsional dekorasi

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      
      {/* Ornamen dekoratif */}
      <CornerOrnament size={150} className="absolute top-0 left-0 opacity-20" />
      <CornerOrnament size={120} className="absolute bottom-0 right-0 opacity-20" />

      <h1 className="text-7xl sm:text-8xl font-serif font-bold text-accent mb-4">
        404
      </h1>

      <p className="text-xl sm:text-2xl text-muted mb-8 max-w-xl text-center">
        Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau tidak ada.
      </p>

      <Link
        to="/"
        className="inline-block px-8 py-4 bg-primary text-light font-semibold rounded-md shadow-md 
                   hover:bg-accent hover:text-dark transition-all duration-300 transform hover:scale-[1.03]
                   hover:ring-2 hover:ring-accent/40 hover:ring-offset-2"
      >
        Kembali ke Beranda
      </Link>

      {/* Soft glow belakang */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </div>
  );
}
